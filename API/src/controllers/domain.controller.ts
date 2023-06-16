/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Prisma, PrismaClient } from '@prisma/client'
import sendMessageToQueue from '../utils/queue/config'
import { logger } from '../utils/logger/config'
import { Status } from '../consts'
const prisma = new PrismaClient()
export const getDomainNameByHostname = async (req: Request, res: Response) => {
	try {
		const { hostname } = req.params
		const data = await prisma.domain_info.findFirst({
			where: {
				domain_name: hostname,
			},
		})
		if (data?.status === Status.PENDING) {
			return res.status(StatusCodes.OK).json({ StatusCodes: StatusCodes.OK, message: `${hostname} currently being scanned,please check back later.` })
		}
		if (!data) {
			await createOrUpdateRecord(hostname)
			addDomainToQueue(hostname)
			return res.status(StatusCodes.ACCEPTED).json({ StatusCodes: StatusCodes.ACCEPTED, message: `${hostname} added to analysis queue,please check back later.` })
		}
		return res.status(StatusCodes.OK).json({ StatusCodes: StatusCodes.OK, data })
	} catch (e) {
		logger.error(JSON.stringify(e))
		return res.status(StatusCodes.BAD_REQUEST).json(JSON.stringify(e))
	}
}
export const addHostnameToQueue = async (req: Request, res: Response) => {
	try {
		const { hostname } = req.body
		await createOrUpdateRecord(hostname)
		await createHistoryRecord(hostname)
		addDomainToQueue(hostname)
		return res.status(StatusCodes.ACCEPTED).json({ StatusCodes: StatusCodes.ACCEPTED, message: `${hostname} added to analysis queue,please check back later.` })
	} catch (e) {
		logger.error(JSON.stringify(e))
		return res.status(StatusCodes.BAD_REQUEST).json(JSON.stringify(e))
	}
}
export const addDomainToQueue = async (hostname: string) => {
	sendMessageToQueue(hostname)
}
export const createOrUpdateRecord = async (hostname: string) => {
	const test = await prisma.domain_info.upsert({
		where: {
			domain_name: hostname,
		},
		create: { status: Status.PENDING, domain_name: hostname },
		update: { status: Status.PENDING, updated_at: new Date() },
	})
	console.log(test)
}
interface currentRecord {
	id: number
	whois_data: Prisma.JsonValue
	virustotal_data: Prisma.JsonValue
}
export const createHistoryRecord = async (hostname: string) => {
	const currentRecord: currentRecord | null = await prisma.domain_info.findUnique({
		where: {
			domain_name: hostname,
		},
		select: {
			id: true,
			whois_data: true,
			virustotal_data: true,
		},
	})
	if (!currentRecord) {
		throw new Error('record not found.')
	}
	if (currentRecord.virustotal_data != null && currentRecord.virustotal_data != null) {
		await prisma.domain_info_history.create({
			data: {
				whois_data: currentRecord.whois_data!,
				virustotal_data: currentRecord.virustotal_data!,
				domain_id: currentRecord.id!,
			},
		})
	}
}
export const getAllCurrentRecord = async () => {
	const records = await prisma.domain_info.findMany({
		select: {
			domain_name: true,
		},
	})
	if (!records) {
		return []
	}
	const domains = records.map((hostname) => hostname.domain_name)
	return domains
}
