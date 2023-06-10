import scheduler from 'node-schedule'
import { addDomainToQueue, addHostnameToQueue, createHistoryRecord, createOrUpdateRecord, getAllCurrentRecord } from './domain.controller'
import { logger } from '../utils/logger/config'

//0 0 1 * *
export const updateDBRecordOnceAMonth = scheduler.scheduleJob('0 0 1 * *', async () => {
	const domains = await getAllCurrentRecord()
	if (domains.length == 0) {
		logger.info('no records found.')
	}
	for (let i = 0; i < domains.length; i++) {
		const hostname = domains[i]
		await createOrUpdateRecord(hostname)
		await createHistoryRecord(hostname)
		addDomainToQueue(hostname)
		logger.info(`updating ${hostname}`)
	}
})
