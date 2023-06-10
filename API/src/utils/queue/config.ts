import amqp from 'amqplib'
import { logger } from '../logger/config'
const queueName = 'domain_analysis'

const sendMessageToQueue = async (message: string) => {
	try {
		const connection = await amqp.connect(process.env.AMQP_URL as string)
		const channel = await connection.createChannel()
		await channel.assertQueue(queueName)
		channel.sendToQueue(queueName, Buffer.from(message))
		logger.info(`domain ${message} added to analysis queue.`)
		// channel.close()
		// connection.close()
	} catch (err) {
		console.error(err)
	}
}
export default sendMessageToQueue
