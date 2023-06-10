import { Client } from 'pg'
import { CREATE_TABLES_IF_NOT_EXIST } from './query'

const connectDB = async () => {
	try {
		const client = new Client({ connectionString: process.env.DATABASE_URL })
		await client.connect()
		const res = await client.query(`SELECT $1::text as connected`, ['Connection to postgres successful!'])
		console.info(res.rows[0].connected)
		await client.end()
	} catch (err) {
		console.error(err)
	}
}
export default connectDB
