'use client'

import Link from 'next/link'

import ActivityPanel from '../ActivityPanel'
import { EDIT_POST_PAGE } from '@/core/constants/endpoints/ui'

type PostActivityPanelProps = {
  showPostRMModal: () => void
}

export default function PostActivityPanel({
  showPostRMModal,
}: PostActivityPanelProps) {
  return (
    <ActivityPanel>
      <Link
        href={{
          pathname: EDIT_POST_PAGE,
          query: { id: '1525651231' },
        }}
      >
        แก้ไขเนื้อหาโพส
      </Link>

      <button
        type="button"
        onClick={showPostRMModal}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        ลบโพส
      </button>
    </ActivityPanel>
  )
}