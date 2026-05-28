'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

import ActivityPanel from '../ActivityPanel'

import {
  CREATE_POST_PAGE,
  EDIT_CLASSROOM_PAGE,
  CLASSROOM_MEMBER_PAGE,
  CLASSROOM_CHATROOM_PAGE,
  CLASSROOM_JOIN_REQUEST_PAGE,
} from '../../constants/endpoints/ui'

type AdminOnlyProps = {
  classroomCreatorID: string
  currentUserID: string
  children: ReactNode
}

function AdminOnly({
  classroomCreatorID,
  currentUserID,
  children,
}: AdminOnlyProps) {
  return classroomCreatorID === currentUserID ? <>{children}</> : null
}

type ClassroomActivityPanelProps = {
  showClassroomInvitationModal?: () => void
  classroomCreatorID: string
  currentUserID: string
  classroomID: string
}

export default function ClassroomActivityPanel({
  classroomCreatorID,
  currentUserID,
  classroomID,
}: ClassroomActivityPanelProps) {
  return (
    <ActivityPanel>
      <Link href={CLASSROOM_CHATROOM_PAGE}>
        ห้องแชท
      </Link>

      <AdminOnly
        classroomCreatorID={classroomCreatorID}
        currentUserID={currentUserID}
      >
        <Link
          href={{
            pathname: CREATE_POST_PAGE,
            query: { classroomID },
          }}
        >
          สร้างโพสใหม่
        </Link>
      </AdminOnly>

      <AdminOnly
        classroomCreatorID={classroomCreatorID}
        currentUserID={currentUserID}
      >
        <Link href={EDIT_CLASSROOM_PAGE}>
          แก้ไขข้อมูลห้องเรียน
        </Link>
      </AdminOnly>

      <Link
        href={{
          pathname: CLASSROOM_MEMBER_PAGE,
          query: { id: classroomID },
        }}
      >
        สมาชิก
      </Link>

      <AdminOnly
        classroomCreatorID={classroomCreatorID}
        currentUserID={currentUserID}
      >
        <Link href={CLASSROOM_JOIN_REQUEST_PAGE}>
          คำขอเข้าร่วม
        </Link>
      </AdminOnly>
    </ActivityPanel>
  )
}