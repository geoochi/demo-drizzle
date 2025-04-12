import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { eq } from 'drizzle-orm'
import { kvTable } from './schema'

const db = drizzle(process.env.DB_FILE_NAME!)

async function main() {
  const rows = await db.select().from(kvTable).where(eq(kvTable.key, 'count'))
  if (rows.length > 0) {
    await db.update(kvTable).set({ value: '0' }).where(eq(kvTable.key, 'count'))
    console.log('count reset!')
  } else {
    const row = { key: 'count', value: '0' }
    await db.insert(kvTable).values(row)
    console.log('count initialized!')
  }
}

main()
