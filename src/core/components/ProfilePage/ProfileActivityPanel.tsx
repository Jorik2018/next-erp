'use client'

import Link from 'next/link'

import {
  CREATE_CLASSROOM_PAGE,
  EDIT_PROFILE_PAGE,
} from '../../constants/endpoints/ui'

import ActivityPanel from '../ActivityPanel'

export default function ProfileActivityPanel() {
  return (
    <ActivityPanel>
      <Link href={CREATE_CLASSROOM_PAGE}>
        สร้างห้องเรียนใหม่
      </Link>

      <Link href={EDIT_PROFILE_PAGE}>
        แก้ไขข้อมูลผู้ใช้งาน
      </Link>
    </ActivityPanel>
  )
}