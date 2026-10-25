'use client'

import type { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

import UnAuthenticatedNav from '../NavigationBar/UnAuthenticatedNav'
import LoadingScreenModal from '../LoadingScreenModal'
import { ErrorAlert } from '../Alert'

import { useAppSelector } from '@/lib/store/hooks'
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
  const isMutating = useAppSelector(
    state => state.mutationStatus
  )

  const errorAlert = useAppSelector(
    state => state.errorAlert
  )

  return (
    <ThemeProvider theme={defaultTheme}>
      <div>
        <LoadingScreenModal
          isLoading={isMutating}
        />

        <UnAuthenticatedNav />

        <ErrorAlert $show={errorAlert.show}>
          {errorAlert.message}
        </ErrorAlert>

        {children}
      </div>
    </ThemeProvider>
  )
}