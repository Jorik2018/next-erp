// app/login/page.tsx

import type { Metadata } from 'next'

import LoginForm from '@/components/LoginPage/LoginForm'
import Container from '@/components/Container'
import Wallpaper from '@/components/Wallpaper'
import UnAuthenticatedLayout from '@/components/layout/UnAuthenticatedLayout'

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