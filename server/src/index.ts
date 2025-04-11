import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import express from 'express'
import { eq } from 'drizzle-orm'
import { kvTable } from './db/schema'

const db = drizzle(process.env.DB_FILE_NAME!)

const app = express()

app.get('/api/count', async (req, res) => {
  const row = await db.select().from(kvTable).where(eq(kvTable.key, 'count'))
  res.json({ message: 'ok', count: row[0].value })
})

app.get('/api/count-plus', async (req, res) => {
  const row = await db.select().from(kvTable).where(eq(kvTable.key, 'count'))
  const count = parseInt(row[0].value)
  await db
    .update(kvTable)
    .set({ value: (count + 1).toString() })
    .where(eq(kvTable.key, 'count'))
  res.json({ message: 'ok', count: count + 1 })
})

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
