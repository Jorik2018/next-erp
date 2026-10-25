'use client'

import { REFRESH_TOKEN } from '@/lib/constants/security'
import { jwtDecode } from 'jwt-decode'

type JwtPayload = {
  exp?: number
}

export function validateToken(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  const refreshToken = localStorage.getItem(REFRESH_TOKEN)

  if (!refreshToken) {
    return false
  }

  try {
    const decoded = jwtDecode<JwtPayload>(refreshToken)

    if (!decoded.exp) {
      return false
    }

    const currentTime = Date.now() / 1000

    return decoded.exp > currentTime
  } catch {
    return false
  }
}