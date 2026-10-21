'use client'

import type { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import type { RootState } from '@/lib/store'

import UnAuthenticatedNav from '../NavigationBar/UnAuthenticatedNav'
import LoadingScreenModal from '../LoadingScreenModal'
import { ErrorAlert } from '../Alert'
import defaultTheme from '@/themes/default'

interface UnAuthenticatedLayoutProps {
  children: ReactNode
}

/**
 * Layout used when the user is not authenticated.
 */
export default function UnAuthenticatedLayout({
  children
}: UnAuthenticatedLayoutProps) {
  const isMutating = useSelector(
    (state: RootState) => state.mutationStatus
  )

  const errorAlert = useSelector(
    (state: RootState) => state.errorAlert
  )

  return (
    <ThemeProvider theme={defaultTheme}>
      <div>
        <LoadingScreenModal isLoading={isMutating} />

        <UnAuthenticatedNav />

        <ErrorAlert $show={errorAlert.show}>
          {errorAlert.message}
        </ErrorAlert>

        {children}
      </div>
    </ThemeProvider>
  )
}