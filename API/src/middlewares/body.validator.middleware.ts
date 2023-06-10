import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

export const disallowBodyOnGet = (req: Request, res: Response, next: NextFunction) => {
	if (req.method === 'GET' && Object.keys(req.body).length !== 0) {
		return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, error: 'Request body not allowed on GET requests' })
	}
	next()
}
export const validateHostname = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await body('hostname').notEmpty().isFQDN().run(req)
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
