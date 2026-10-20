// src/lib/apolloClient.ts
'use client'

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { GRAPHQL_ENDPOINT } from '../constants/endpoints/api'

let client: ApolloClient | null = null

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
  })
}

export function getApolloClient() {
  if (!client) {
    client = createApolloClient()
  }

  return client
}