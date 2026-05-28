// app/login/page.tsx

import type { Metadata } from 'next'

import LoginForm from '@/core/components/LoginPage/LoginForm'
import Container from '@/core/components/Container'
import Wallpaper from '@/core/components/Wallpaper'
import UnAuthenticatedLayout from '@/core/components/Layout/UnAuthenticatedLayout'

export const metadata: Metadata = {
  title: 'ยืนยันตัวตนเพื่อเข้าใช้งาน | LEARNSPACE',
}

export default function LoginPage() {
  return (
    <UnAuthenticatedLayout>
      <Wallpaper $pageName="login">
        <Container $transparent>
          <LoginForm />
        </Container>
      </Wallpaper>
    </UnAuthenticatedLayout>
  )
}