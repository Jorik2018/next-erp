import type { ReactNode } from 'react'
import styled from 'styled-components'

import Card, { Body } from '../Card'
import { CircleButton } from '../Button'

const UserRequestItemCard = styled(Card)`
  margin-left: 1.5em;
  margin-right: 1.5em;
  margin-bottom: 1.5em;
  margin-top: 0;
  display: inline-block;
  max-width: 350px;
  box-shadow: none;
  cursor: pointer;
  transition: all 100ms ease-in;
  position: relative;

  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-7px);
  }
`

const UserProfilePic = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  background-color: #ccc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`

interface UserRequestItemProps {
  children: ReactNode
  profilePic: string
}

/**
 * @name UserRequestItem
 * @desc Display a single user who sent a join request to a particular classroom
 */
const UserRequestItem = ({
  children,
  profilePic
}: UserRequestItemProps) => (
  <UserRequestItemCard>
    <UserProfilePic
      src={profilePic}
      alt="User profile"
    />

    <CircleButton
      $danger
      $position="absolute"
      $right="1em"
      $top="1em"
      type="button"
    >
      -
    </CircleButton>

    <CircleButton
      $success
      $position="absolute"
      $right="4em"
      $top="1em"
      type="button"
    >
      +
    </CircleButton>

    <Body>{children}</Body>
  </UserRequestItemCard>
)

export default UserRequestItem