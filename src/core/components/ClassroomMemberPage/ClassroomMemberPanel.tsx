'use client'

import FullContainerCard from '../FullContainerCard'
import MemberItem from './MemberItem'
import UserTitle from './UserTitle'

type ClassroomMember = {
  _id: string
  fname: string
  profilePicture?: string
}

type ClassroomMemberPanelProps = {
  classroomMembers: ClassroomMember[]
}

export default function ClassroomMemberPanel({
  classroomMembers,
}: ClassroomMemberPanelProps) {
  return (
    <FullContainerCard
      header="สมาชิก"
    >
      {classroomMembers.map(member => (
        <MemberItem
          key={member._id}
          memberID={member._id}
          profilePicture={member.profilePicture}
        >
          <UserTitle>{member.fname}</UserTitle>
        </MemberItem>
      ))}
    </FullContainerCard>
  )
}