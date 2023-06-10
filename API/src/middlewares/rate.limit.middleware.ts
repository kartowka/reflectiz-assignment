import rateLimit from 'express-rate-limit'
import { StatusCodes } from 'http-status-codes'

export const rateLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 15,
	standardHeaders: true,
	legacyHeaders: false,
	message: JSON.stringify({ statusCode: StatusCodes.TOO_MANY_REQUESTS, message: 'to many request.' }),
})
