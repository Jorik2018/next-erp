'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { useAppDispatch } from '@/lib/store/hooks'

import {
  initializeAuthenticatedUser,
  deinitializeUser
} from '@/lib/slices/user'

export default function AuthSync() {
  const { data: session, status } =
    useSession()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (status === 'loading') {
      return
    }

    if (session?.user?.id) {
      dispatch(
        initializeAuthenticatedUser({
          id: session.user.id,
          _id: session.user._id
        })
      )

      return
    }

    dispatch(deinitializeUser())
  }, [session, status, dispatch])

  return null
}