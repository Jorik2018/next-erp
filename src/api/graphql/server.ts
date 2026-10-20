import { ApolloServer } from '@apollo/server'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import type { GraphQLContext } from './core/context'

export const graphqlServer = new ApolloServer<GraphQLContext>({ typeDefs, resolvers })
