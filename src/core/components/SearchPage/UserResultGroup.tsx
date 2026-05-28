'use client'

import UserResult from './SearchResultTypes/UserResult'
import SearchResultGroup from './SearchResultGroup'
import ResultTitle from './ResultTitle'

const users = [
  'Tony Stark',
  'Steve Rogers',
  'Bruce Banner',
  'Natasha Romanoff',
  'Thor Odinson',
  'Peter Parker',
  'Stephen Strange',
]

export default function UserResultGroup() {
  return (
    <SearchResultGroup header="ผู้ใช้งาน">
      {users.map(user => (
        <UserResult key={user}>
          <ResultTitle>{user}</ResultTitle>
        </UserResult>
      ))}
    </SearchResultGroup>
  )
}