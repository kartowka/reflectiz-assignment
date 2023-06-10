// import { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import { logger } from '../utils/logger/config'
const stream = {
	// Use the http severity
	write: (message: string) => logger.http(message),
}
const skip = () => {
	const env = process.env.NODE_ENV || 'development'
	return env !== 'development'
}
export const requestResponseLogger = morgan(
	// Define message format string (this is the default one).
	// The message format is made from tokens, and each token is
	// defined inside the Morgan library.
	// You can create your custom token to show what do you want from a request.
	':remote-addr :method :url :status :res[content-length] - :response-time ms',
	// Options: in this case, I overwrote the stream and the skip logic.
	// See the methods above.
	{ stream, skip }
)
// const getActualRequestDurationInMilliseconds = (start: [number, number]) => {
// 	const NS_PER_SEC = 1e9 //  convert to nanoseconds
// 	const NS_TO_MS = 1e6 // convert to milliseconds
// 	const diff = process.hrtime(start)
// 	return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
// }
// export const requestResponseLogger = async (req: Request, res: Response, next: NextFunction) => {
// 	const method = req.method
// 	const url = req.url
// 	const status = res.statusCode
// 	const start = process.hrtime()
// 	const durationInMilliseconds = getActualRequestDurationInMilliseconds(start)
// 	const log = `${method}:${url} ${status} ${durationInMilliseconds.toLocaleString()} ms`
// 	logger.info(log)
// 	next()
// }
