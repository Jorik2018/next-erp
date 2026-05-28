'use client'

import FullContainerCard from '../FullContainerCard'
import UserRequestItem from './UserRequestItem'
import UserTitle from './UserTitle'

const mockRequests = Array.from({ length: 8 })

export default function JoinRequestPanel() {
  return (
    <FullContainerCard
      header="คำขอเข้าร่วม"
    >
      {mockRequests.map((_, index) => (
        <UserRequestItem key={index}>
          <UserTitle>Tony Stark</UserTitle>
        </UserRequestItem>
      ))}
    </FullContainerCard>
  )
}