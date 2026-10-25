'use client'

import type { ReactNode } from 'react'

import LoadingScreenModal from '@/lib/components/LoadingScreenModal'
import NotificationModal from '@/lib/components/NotificationModal'
import ChatroomModal from '@/lib/components/ChatroomModal/ChatroomModal'
import AuthenticatedNav from '@/lib/components/NavigationBar/AuthenticatedNav'
import Container from '@/lib/components/Container'
import { ErrorAlert } from '@/lib/components/Alert'

import {
  useAppDispatch,
  useAppSelector
} from '@/lib/store/hooks'

import {
  showNotificationModal
} from '@/lib/slices/notification-modal'

import {
  showChatroomModal
} from '@/lib/slices/chatroom-modal'

interface AuthenticatedLayoutProps {
  children: ReactNode
}

export default function AuthenticatedLayout({
  children
}: AuthenticatedLayoutProps) {
  const dispatch = useAppDispatch()

  const isMutating = useAppSelector(
    state => state.mutationStatus
  )

  const errorAlert = useAppSelector(
    state => state.errorAlert
  )

  const activeUser = useAppSelector(
    state => state.user
  )

  return (
    <Container>
      <AuthenticatedNav
        activeUser={activeUser}
        showChatroomModal={() =>
          dispatch(showChatroomModal())
        }
        showNotificationModal={() =>
          dispatch(showNotificationModal())
        }
      />

      <NotificationModal />

      <LoadingScreenModal
        isLoading={isMutating}
      />

      <ChatroomModal />

      <ErrorAlert $show={errorAlert.show}>
        {errorAlert.message}
      </ErrorAlert>

      {children}
    </Container>
  )
}