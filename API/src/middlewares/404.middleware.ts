import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const redirect404 = (req: Request, res: Response) => {
	res.status(StatusCodes.NOT_FOUND).json({ status: StatusCodes.NOT_FOUND, message: 'page not found.' })
}
