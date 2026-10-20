// app/providers.tsx
'use client'

import type { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@apollo/client/react'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import StyledComponentsRegistry from './styled-components-registry'

import AuthSync from '@/components/AuthSync'
import { getApolloClient } from '@/lib/apolloClient'
import { store } from '@/lib/store'
import { theme } from '@/styles/theme'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({
  children
}: ProvidersProps) {
  const client = getApolloClient()

  return (
    <StyledComponentsRegistry>
      <SessionProvider>
        <ApolloProvider client={client}>
          <ReduxProvider store={store}>
            <AuthSync />

            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
          </ReduxProvider>
        </ApolloProvider>
      </SessionProvider>
    </StyledComponentsRegistry>
  )
}