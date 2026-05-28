'use client'

import type { ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import UnAuthenticatedNav from '../NavigationBar/UnAuthenticatedNav'
import AuthenticatedNav from '../NavigationBar/AuthenticatedNav'
import ChatroomModal from '../ChatroomModal/ChatroomModal'
import { validateToken } from '../../helpers/security'
import LoadingScreenModal from '../LoadingScreenModal'
import NotificationModal from '../NotificationModal'
import { ErrorAlert } from '../Alert'
import Container from '../Container'
import Card from '../Card'
import { showChatroomModal } from '@/core/slices/chatroom-modal'
import { showNotificationModal } from '@/core/slices/notification-modal'

type RootState = any

type AuthenticatedLayoutProps = {
  children: ReactNode
}

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  const dispatch = useDispatch()

  const isMutating = useSelector((state: RootState) => state.mutationStatus)
  const errorAlert = useSelector((state: RootState) => state.errorAlert)
  const activeUser = useSelector((state: RootState) => state.user)

  const isAuthenticated = validateToken()

  if (!isAuthenticated) {
    return (
      <Container>
        <UnAuthenticatedNav />

        <Card
          $textCenter
          $padding="2em"
          $marginLeft="auto"
          $marginRight="auto"
          $marginTop="4em"
        >
          <h2>กรุณาเข้าล็อกอินเพื่อเข้าใช้งาน</h2>
        </Card>
      </Container>
    )
  }

  return (
    <Container>
      <AuthenticatedNav
        activeUser={activeUser}
        showChatroomModal={() => dispatch(showChatroomModal())}
        showNotificationModal={() => dispatch(showNotificationModal())}
      />

      <NotificationModal />
      <LoadingScreenModal isLoading={isMutating} />
      <ChatroomModal />

      <ErrorAlert $show={errorAlert.show}>
        {errorAlert.message}
      </ErrorAlert>

      {children}
    </Container>
  )
}