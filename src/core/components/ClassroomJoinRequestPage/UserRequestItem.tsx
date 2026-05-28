'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'

import Card, { Body } from '../Card'
import { CircleButton } from '../Button'

const UserRequestItemCard = styled(Card)`
  position: relative;

  display: inline-block;

  max-width: 350px;

  margin-top: 0;
  margin-right: 1.5em;
  margin-bottom: 1.5em;
  margin-left: 1.5em;

  cursor: pointer;

  box-shadow: none;

  transition: all 100ms ease-in;

  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-7px);
  }
`

const UserProfilePic = styled.img`
  width: 100%;
  height: 250px;

  background-color: #ccc;

  border-top-right-radius: 5px;
  border-top-left-radius: 5px;

  object-fit: cover;
`

type UserRequestItemProps = {
  children: ReactNode
  profilePic?: string
}

export default function UserRequestItem({
  children,
  profilePic,
}: UserRequestItemProps) {
  return (
    <UserRequestItemCard>
      <UserProfilePic src={profilePic} alt="User profile" />

      <CircleButton
        $danger
        $position="absolute"
        $right="1em"
        $top="1em"
      >
        -
      </CircleButton>

      <CircleButton
        $success
        $position="absolute"
        $right="4em"
        $top="1em"
      >
        +
      </CircleButton>

      <Body>{children}</Body>
    </UserRequestItemCard>
  )
}