import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import DashboardPage from '@/lib/pages/dashboard'

export default async function Page() {
  const session = await auth()

  console.log('SESSION ON DASHBOARD:', session)

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <DashboardPage
    />
  )
}