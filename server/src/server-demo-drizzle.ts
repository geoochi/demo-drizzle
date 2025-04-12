import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { kvTable } from './db/schema'
import { serve } from '@hono/node-server'

const db = drizzle(process.env.DB_FILE_NAME!)
const app = new Hono()

app.get('/api/count', async c => {
  const row = await db.select().from(kvTable).where(eq(kvTable.key, 'count'))
  return c.json({ message: 'ok', count: row[0].value })
})

app.get('/api/count-plus', async c => {
  const row = await db.select().from(kvTable).where(eq(kvTable.key, 'count'))
  const count = parseInt(row[0].value)
  await db
    .update(kvTable)
    .set({ value: (count + 1).toString() })
    .where(eq(kvTable.key, 'count'))
  return c.json({ message: 'ok', count: count + 1 })
})

serve({ port: 3000, fetch: app.fetch }, () => {
  console.log(`Server is running on http://localhost:3000`)
})
