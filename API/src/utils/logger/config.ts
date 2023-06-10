import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
}
const level = () => {
	const env = process.env.NODE_ENV || 'development'
	const isDevelopment = env === 'development'
	return isDevelopment ? 'debug' : 'warn'
}
const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'white',
}
winston.addColors(colors)
const format = winston.format.combine(
	// Add the message timestamp with the preferred format
	winston.format.timestamp(),

	// Tell Winston that the logs must be colored
	winston.format.colorize({ all: true }),
	// Define the format of the message showing the timestamp, the level and the message
	winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
)
const transports = [
	new DailyRotateFile({
		filename: `log-%DATE%.log`,
		dirname: 'logs',
		// handleExceptions: true,
		zippedArchive: true,
		json: true,
		maxFiles: '14d',
		maxSize: '20m',
	}),
	// Allow the use the console to print the messages
	new winston.transports.Console(),
	// Allow to print all the error level messages inside the error.log file
	new winston.transports.File({
		filename: 'logs/error.log',
		level: 'error',
	}),
	// Allow to print all the error message inside the all.log file
	// (also the error log that are also printed inside the error.log(
	// new winston.transports.File({ filename: 'logs/all.log' }),
]
export const logger = winston.createLogger({
	level: level(),
	levels,
	format,
	transports,
	exitOnError: false,
})
