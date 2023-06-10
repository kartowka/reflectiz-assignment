import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

const SERVER_API_KEY = process.env.SERVER_API_KEY

export const validateAPIKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const api_key = req.headers['reflectiz-api-key']
	if (!api_key) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ statusCode: StatusCodes.UNAUTHORIZED, message: 'API key is required.' })
	}
	if (api_key !== SERVER_API_KEY) {
		return res.status(StatusCodes.FORBIDDEN).json({ statusCode: StatusCodes.FORBIDDEN, message: 'Invalid API key.' })
	}
	next()
}
