import fetch from 'node-fetch'
import { Channel, ConsumeMessage } from 'amqplib'

//Get a domain analysis report

export const getVirusTotalDomainReport = async (content: string) => {
	const url = `https://www.virustotal.com/api/v3/domains/${content}`
	const headers = {
		'x-apikey': process.env.VIRUS_TOTAL_API_KEY as string,
	}
	const response = await fetch(url, { headers })
	const domainInfo = await response.json()
	return domainInfo
}
//Get a URL analysis report
export const getVirusTotalUrlReport = async (content: string) => {
	const url = `https://www.virustotal.com/api/v3/urls/${content}`
	const headers = {
		'x-apikey': process.env.VIRUS_TOTAL_API_KEY as string,
	}
	const response = await fetch(url, { headers })
	const domainInfo = await response.json()
	return domainInfo
}
