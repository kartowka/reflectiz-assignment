import fetch from 'node-fetch'

export const getWHOISReport = async (content: string) => {
	const url =
		'https://www.whoisxmlapi.com/whoisserver/WhoisService?' +
		new URLSearchParams({
			apiKey: process.env.WHOIS_XML_API_KEY as string,
			domainName: content,
			outputFormat: 'JSON',
		})
	const response = await fetch(url)
	const domainInfo = response.json()
	return domainInfo
}
