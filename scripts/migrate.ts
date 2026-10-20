import fs from 'node:fs/promises'
import path from 'node:path'
import postgres from 'postgres'

const connectionString = process.env.POSTGRES_URL

if (!connectionString) {
  throw new Error('POSTGRES_URL is not defined')
}

const sql = postgres(connectionString, {
  ssl: 'require'
})

async function migrate() {
  try {
    const filePath = path.join(
      process.cwd(),
      'sql',
      '001_learnspace.sql'
    )

    const migration = await fs.readFile(
      filePath,
      'utf8'
    )

    console.log('Running Learnspace migration...')

    await sql.unsafe(migration)

    console.log('Migration completed successfully.')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exitCode = 1
  } finally {
    await sql.end()
  }
}

migrate()