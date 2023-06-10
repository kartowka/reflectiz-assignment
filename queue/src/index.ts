import express, { Express } from 'express'
import dotenv from 'dotenv'
import { connectQueue } from './utils/queue/config'
dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 3001
app.use(express.json())

app.listen(PORT, () => {
	console.log(`server running on ${PORT}!`)
	connectQueue()
})
