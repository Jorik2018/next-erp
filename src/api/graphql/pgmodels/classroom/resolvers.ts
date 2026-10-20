import { sql } from '../../db/postgres'
import {
  requireUser,
  type GraphQLContext
} from '../../core/context'

const classroomFields = sql`
  c.id,
  c.name,
  c.description,
  c.subject,
  c.thumbnail,
  c.creator_id AS "creatorId"
`

export const classroomResolvers = {
  Query: {
    myClassrooms: async (
      _: unknown,
      __: unknown,
      context: GraphQLContext
    ) => {
      const currentUser = requireUser(context)

      return sql`
        SELECT ${classroomFields}
        FROM classroom_members cm
        JOIN classrooms c
          ON c.id = cm.classroom_id
        WHERE cm.user_id = ${currentUser.id}
        ORDER BY c.created_at DESC
      `
    },

    userClassrooms: async (
      _: unknown,
      { id }: { id: string },
      context: GraphQLContext
    ) => {
      requireUser(context)

      const classrooms = await sql`
        SELECT ${classroomFields}
        FROM classroom_members cm
        JOIN classrooms c
          ON c.id = cm.classroom_id
        WHERE cm.user_id = ${id}
        ORDER BY c.created_at DESC
      `

      return {
        classrooms,
        err: null
      }
    },

    classroom: async (
      _: unknown,
      { id }: { id: string },
      context: GraphQLContext
    ) => {
      requireUser(context)

      const rows = await sql`
        SELECT ${classroomFields}
        FROM classrooms c
        WHERE c.id = ${id}
        LIMIT 1
      `

      return rows[0] ?? null
    },

    myClassroomInvitations: async (
      _: unknown,
      __: unknown,
      context: GraphQLContext
    ) => {
      const currentUser = requireUser(context)

      const invitations = await sql`
        SELECT
          c.name AS "classroomName",
          c.id AS "classroomID",
          c.thumbnail,
          ci.created_at::text AS "issueDate"
        FROM classroom_invitations ci
        JOIN classrooms c
          ON c.id = ci.classroom_id
        WHERE ci.user_id = ${currentUser.id}
          AND ci.status = 'pending'
        ORDER BY ci.created_at DESC
      `

      return {
        invitations,
        err: null
      }
    }
  },

  Mutation: {
    createClassroom: async (
      _: unknown,
      args: {
        name: string
        description: string
        subject: string
      },
      context: GraphQLContext
    ) => {
      const currentUser = requireUser(context)
      

      return sql.begin(async tx => {
        const rows = await tx`
          INSERT INTO classrooms (
            name,
            description,
            subject,
            creator_id
          )
          VALUES (
            ${args.name},
            ${args.description},
            ${args.subject},
            ${currentUser.id}
          )
          RETURNING id
        `

        const id = rows[0]?.id as string | undefined

        if (!id) {
          return {
            success: false,
            classroomID: null,
            err: {
              name: 'classroom',
              message: 'Unable to create classroom'
            }
          }
        }

        await tx`
          INSERT INTO classroom_members (
            classroom_id,
            user_id,
            role
          )
          VALUES (
            ${id},
            ${currentUser.id},
            'admin'
          )
        `

        return {
          success: true,
          classroomID: id,
          err: null
        }
      })
    }
  }
}