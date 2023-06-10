import { getVirusTotalDomainReport, getVirusTotalUrlReport } from './virustotal.controller'
import { getWHOISReport } from './whois.controller'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const gatherDomainInfo = async (domain: string) => {
	const whoisDomainReport = await getWHOISReport(domain)
	const virusTotalDomainReport = await getVirusTotalDomainReport(domain)
	const virusTotalUrlReport = await getVirusTotalUrlReport(domain)
	const virusTotal = { ...virusTotalDomainReport, ...virusTotalUrlReport }
	await prisma.domain_info.update({
		where: {
			domain_name: domain,
		},
		data: {
			whois_data: whoisDomainReport,
			virustotal_data: virusTotal,
			status: 'SUCCESS',
		},
	})
}
