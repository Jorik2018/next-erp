// app/login/page.tsx

import type { Metadata } from 'next'

import LoginForm from '@/lib/components/LoginPage/LoginForm'
import Container from '@/lib/components/Container'
import Wallpaper from '@/lib/components/Wallpaper'
import UnAuthenticatedLayout from '@/lib/components/layout/UnAuthenticatedLayout'

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