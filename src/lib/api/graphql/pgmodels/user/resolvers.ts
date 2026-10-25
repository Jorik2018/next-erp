import { sql } from '../../db/postgres'
import { requireUser, type GraphQLContext } from '../../core/context'

type EditArgs = { name?: string; username?: string; career?: string; address?: string; profilePicture?: string }

const fields = sql`id, name, email, username, career, address, profile_picture AS "profilePicture"`

export const userResolvers = {
  Query: {
    myProfile: async (_: unknown, __: unknown, context: GraphQLContext) => {
      const currentUser = requireUser(context)
      const rows = await sql`SELECT ${fields} FROM users WHERE id = ${currentUser.id} LIMIT 1`
      return rows[0] ?? null
    },
    userProfile: async (_: unknown, { id }: { id: string }, context: GraphQLContext) => {
      requireUser(context)
      const rows = await sql`SELECT ${fields} FROM users WHERE id = ${id} LIMIT 1`
      return rows[0] ? { user: rows[0], err: null } : { user: null, err: { name: 'user', message: 'User not found' } }
    },
  },
  Mutation: {
    editMyProfile: async (_: unknown, args: EditArgs, context: GraphQLContext) => {
      const currentUser = requireUser(context)
      const rows = await sql`
        UPDATE users SET
          name = COALESCE(${args.name ?? null}, name),
          username = COALESCE(${args.username ?? null}, username),
          career = COALESCE(${args.career ?? null}, career),
          address = COALESCE(${args.address ?? null}, address),
          profile_picture = COALESCE(${args.profilePicture ?? null}, profile_picture)
        WHERE id = ${currentUser.id}
        RETURNING ${fields}
      `
      return rows[0] ? { user: rows[0], err: null } : { user: null, err: { name: 'user', message: 'User not found' } }
    },
  },
}
