// app/providers.tsx
'use client'

import type { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@apollo/client/react'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import StyledComponentsRegistry from './styled-components-registry'

import AuthSync from '@/lib/components/AuthSync'
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
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  return (
    <StyledComponentsRegistry>
      <SessionProvider basePath={`${basePath}/api/auth`}>
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