import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { param, validationResult } from 'express-validator'

export const requestParamValidator = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await param('hostname').notEmpty().isFQDN().run(req)
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(StatusCodes.BAD_REQUEST).json({ statusCode: StatusCodes.BAD_REQUEST, errors: errors.array() })
		}
		next()
	} catch (error) {
		console.error('Error retrieving domain information:', error)
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
	}
}
