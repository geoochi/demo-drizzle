import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const kvTable = sqliteTable('kv_table', {
  key: text().notNull().primaryKey(),
  value: text().notNull(),
})
