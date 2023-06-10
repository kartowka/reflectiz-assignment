import amqp from 'amqplib'
import { gatherDomainInfo } from '../../controllers/gathering.controller'
import { exit } from 'process'

const queueName = 'domain_analysis'
export const connectQueue = async () => {
	const maxRetries = 5
	const retryDelay = 5000 // Delay in milliseconds between retries

	let retryCount = 0
	let connection
	while (retryCount < maxRetries) {
		try {
			connection = await amqp.connect(process.env.AMQP_URL as string)
			break
		} catch (error) {
			// Connection failed, increment the retry count and wait before retrying
			retryCount++
			console.log(`Connection attempt ${retryCount} failed. Retrying in ${retryDelay}ms...`)
			await new Promise((resolve) => setTimeout(resolve, retryDelay))
		}
	}
	if (connection) {
		console.log(`amqp connected.`)
		const channel = await connection.createChannel()
		await channel.assertQueue(queueName)
		channel.consume(queueName, (message: amqp.ConsumeMessage | null) => {
			if (message) {
				const content = message.content.toString()
				console.log(`running analysis on: ${content}`)
				gatherDomainInfo(content)
				channel.ack(message)
			}
		})
	} else {
		console.log('Connection failed after maximum retries.')
		exit(1)
	}
}
