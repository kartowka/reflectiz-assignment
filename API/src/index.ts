import express, { Express } from 'express'
// import connectDB from './utils/db/config'
import { logger } from './utils/logger/config'
import domainRouter from './routes/domain.route'
import dotenv from 'dotenv'
import { redirect404, disallowBodyOnGet, requestResponseLogger, rateLimiter, validateAPIKeyMiddleware } from './middlewares'
import { updateDBRecordOnceAMonth } from './controllers/scheduler.controller'
dotenv.config()
const app: Express = express()
const PORT = Number(process.env.PORT || 3000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(validateAPIKeyMiddleware)
app.use(rateLimiter)
app.use(requestResponseLogger)
app.use(disallowBodyOnGet)
app.use('/api/v1/domain', domainRouter)
app.use(redirect404)
app.listen(PORT, async () => {
	logger.info(`server running on http://localhost:${PORT}`)
	updateDBRecordOnceAMonth
	// await connectDB()
})
