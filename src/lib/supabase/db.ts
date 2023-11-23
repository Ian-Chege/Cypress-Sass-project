import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as dotenv from 'dotenv'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

import * as schema from '../../../migrations/schema'

dotenv.config({ path: '.env' })

if (!process.env.DATABASE_URL) {
  console.log('no DB URL')
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 })
const db = drizzle(client, { schema })

const migrateDb = async () => {
  try {
    console.log('🟠 Migrating client')
    await migrate(db, { migrationsFolder: 'migrations' })
    console.log('🟢 Migration complete')
  } catch (error) {
    console.log('🔴 Migration error', error)
  }
}

migrateDb()
export default db
