import { createPool } from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

export const pool = createPool({
   host: process.env.MYSQL_HOST,
   port: process.env.MYSQL_PORT,
   database: process.env.MYSQL_DATABASE,
   user: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
})

export async function checkMysqlConnection() {
   console.log(`Checking MySQL connection...`)
   try {
      const [row] = await pool.query(
         `SELECT DATABASE() as db;`,
      )
      console.log(
         `MySQL connection OK, default database is <${row[0].db}>`,
      )
   } catch (error) {
      throw error
   }
   return true
}