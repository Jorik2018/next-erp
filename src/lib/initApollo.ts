import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split
} from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

import {
  GRAPHQL_ENDPOINT,
  GRAPHQL_SUBSCRIPTION_ENDPOINT
} from './constants/endpoints/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants/security'



const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: 'same-origin'
})

/**
 * Adds authentication tokens to every GraphQL HTTP request.
 */
const authLink = new SetContextLink(prevContext => {
  if (typeof window === 'undefined') {
    return prevContext
  }

  const accessToken =
    localStorage.getItem(ACCESS_TOKEN) ?? ''

  const refreshToken =
    localStorage.getItem(REFRESH_TOKEN) ?? ''

  return {
    ...prevContext,
    headers: {
      ...prevContext.headers,
      'x-access-token': accessToken,
      'x-refresh-token': refreshToken
    }
  }
})

const httpConnectionLink = authLink.concat(httpLink)

/**
 * Create the complete GraphQL transport.
 *
 * HTTP is always available.
 * WebSocket subscriptions are only created in the browser.
 */
const createLink = (): ApolloLink => {
  if (typeof window === 'undefined') {
    return httpConnectionLink
  }

  const wsLink = new GraphQLWsLink(
    createClient({
      url: GRAPHQL_SUBSCRIPTION_ENDPOINT,

      connectionParams: () => ({
        'x-access-token':
          localStorage.getItem(ACCESS_TOKEN) ?? '',

        'x-refresh-token':
          localStorage.getItem(REFRESH_TOKEN) ?? ''
      }),

      retryAttempts: Infinity
    })
  )

  return split(
    ({ query }) => {
      const definition = getMainDefinition(query)

      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpConnectionLink
  )
}

export const createApolloClient = () =>
  new ApolloClient({
    link: createLink(),
    cache: new InMemoryCache()
  })

let apolloClient: ApolloClient | null = null

export default function initApollo(): ApolloClient {
  if (typeof window === 'undefined') {
    return createApolloClient()
  }

  if (!apolloClient) {
    apolloClient = createApolloClient()
  }

  return apolloClient
}