import postgres from 'postgres'

const globalForSql = globalThis as unknown as { learnspaceSql?: ReturnType<typeof postgres> }

export const sql = globalForSql.learnspaceSql ?? postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

if (process.env.NODE_ENV !== 'production') globalForSql.learnspaceSql = sql
