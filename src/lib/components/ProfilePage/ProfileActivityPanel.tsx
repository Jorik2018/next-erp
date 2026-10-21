import Link from 'next/link'

import {
  CREATE_CLASSROOM_PAGE,
  EDIT_PROFILE_PAGE
} from '@/lib/constants/endpoints/ui'

import ActivityPanel from '@/lib/components/ActivityPanel'

/**
 * Navigation menu associated with the profile page.
 */
const ProfileActivityPanel = () => (
  <ActivityPanel>
    <Link href={CREATE_CLASSROOM_PAGE} prefetch>
      Create New Classroom
    </Link>

    <Link href={EDIT_PROFILE_PAGE} prefetch>
      Edit Profile
    </Link>
  </ActivityPanel>
)

export default ProfileActivityPanel