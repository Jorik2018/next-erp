// src/app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'

const typeDefs = `#graphql
  type User {
    _id: ID!
    fname: String!
    lname: String!
    email: String!
  }

  type LoginError {
    message: String
  }

  type LoginResponse {
    success: Boolean!
    refreshToken: String
    accessToken: String
    user: User
    err: LoginError
  }

  type Query {
    hello: String!
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse!
  }
`

const resolvers = {
  Query: {
    hello: () => 'world',
  },

  Mutation: {
    login: async (
      _: unknown,
      args: { email: string; password: string },
    ) => {
      const { email, password } = args

      // aquí llamas DB / servicio / lógica real
      if (email === 'test@test.com' && password === '123456') {
        return {
          success: true,
          refreshToken: 'fake-refresh-token',
          accessToken: 'fake-access-token',
          user: {
            _id: '1',
            fname: 'Test',
            lname: 'User',
            email,
          },
          err: null,
        }
      }

      return {
        success: false,
        refreshToken: null,
        accessToken: null,
        user: null,
        err: {
          message: 'Invalid credentials',
        },
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler(server)

export { handler as GET, handler as POST }