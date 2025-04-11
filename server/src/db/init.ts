import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { kvTable } from './schema'

const db = drizzle(process.env.DB_FILE_NAME!)

async function main() {
  const user: typeof kvTable.$inferInsert = { key: 'count', value: '0' }
  await db.insert(kvTable).values(user)
  console.log('kv table created!')
}

main()
