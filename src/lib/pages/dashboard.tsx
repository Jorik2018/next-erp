'use client'

import { useSelector } from 'react-redux'

import type { RootState } from '@/lib/store'

import DashboardPageHeadingPanel from '@/components/DashboardPage/DashboardPageHeadingPanel'
import ClassroomInvitationsPanel from '@/components/DashboardPage/ClassroomInvitationsPanel'
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout'
import NotificationPanel from '@/components/NotificationPanel'
import ClassroomsList from '@/components/ClassroomsList'
import Container from '@/components/Container'
import Panel from '@/components/Panel'
import Card from '@/components/Card'

export default function DashboardPage() {
  const activeUser = useSelector(
    (state: RootState) => state.user
  )
  return (
    <AuthenticatedLayout>
      <Container>
        <div
          style={{
            height: '400px',
            paddingTop: '8em',
            marginBottom: '30px',
            backgroundColor: '#dfdfdf'
          }}
        >
          <Card $padding="2em" $textCenter>
            <h3>Student Analysis is coming soon</h3>
          </Card>
        </div>

        <div
          style={{
            paddingTop: '0',
            paddingBottom: '30px',
            marginBottom: '700px',
            backgroundColor: 'transparent'
          }}
        >
          <Panel $left $width={40}>
            <NotificationPanel />
          </Panel>

          <Panel $right $width={60}>
            <DashboardPageHeadingPanel />
{JSON.stringify(activeUser)}
            {activeUser?._id && (
              <ClassroomsList
                _id={activeUser._id}
                height="600px"
              />
            )}
          </Panel>
        </div>

        <div
          style={{
            paddingTop: '0',
            paddingBottom: '60px',
            backgroundColor: 'transparent'
          }}
        >
          {activeUser?.id && (
            <ClassroomInvitationsPanel
              userID={activeUser._id!}
            />
          )}
        </div>
      </Container>
    </AuthenticatedLayout>
  )
}