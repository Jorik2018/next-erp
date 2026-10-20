import { sql } from '../../db/postgres'
import { requireUser, type GraphQLContext } from '../../core/context'

export const postResolvers = {
  Query: {
    classroomPosts: async (_: unknown, { classroomId }: { classroomId: string }, context: GraphQLContext) => {
      requireUser(context)
      return sql`SELECT id, classroom_id AS "classroomId", author_id AS "authorId", title, content, created_at::text AS "createdAt" FROM posts WHERE classroom_id = ${classroomId} ORDER BY created_at DESC`
    },
    post: async (_: unknown, { id }: { id: string }, context: GraphQLContext) => {
      requireUser(context)
      const rows = await sql`SELECT id, classroom_id AS "classroomId", author_id AS "authorId", title, content, created_at::text AS "createdAt" FROM posts WHERE id = ${id} LIMIT 1`
      return rows[0] ?? null
    },
  },
  Mutation: {
    createPost: async (_: unknown, args: { classroomId: string; title?: string; content?: string }, context: GraphQLContext) => {
      const currentUser = requireUser(context)
      const rows = await sql`INSERT INTO posts (classroom_id, author_id, title, content) VALUES (${args.classroomId}, ${currentUser.id}, ${args.title ?? null}, ${args.content ?? null}) RETURNING id, classroom_id AS "classroomId", author_id AS "authorId", title, content, created_at::text AS "createdAt"`
      return rows[0]
    },
    removePost: async (_: unknown, { id }: { id: string }, context: GraphQLContext) => {
      const currentUser = requireUser(context)
      const rows = await sql`DELETE FROM posts WHERE id = ${id} AND author_id = ${currentUser.id} RETURNING id`
      return rows.length > 0
    },
  },
}
