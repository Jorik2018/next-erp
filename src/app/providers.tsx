// app/providers.tsx
'use client'

import { ApolloProvider } from '@apollo/client/react'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import StyledComponentsRegistry from './styled-components-registry'
import { getApolloClient } from '@/core/apolloClient'
import { theme } from '@/styles/theme'
import { store } from '@/core/store'

export function Providers({ children }: { children: React.ReactNode }) {
  const client = getApolloClient()

  return (
    <StyledComponentsRegistry>
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ReduxProvider>
    </ApolloProvider>
    </StyledComponentsRegistry>
  )
}