'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'

import Card, { Body } from '../../Card'

const UserResultCard = styled(Card)`
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
  height: 200px;

  background-color: #ccc;

  border-top-right-radius: 5px;
  border-top-left-radius: 5px;

  object-fit: cover;
`

type UserResultProps = {
  children: ReactNode
  profilePic?: string
}

export default function UserResult({
  children,
  profilePic,
}: UserResultProps) {
  return (
    <UserResultCard>
      <UserProfilePic src={profilePic} alt="User profile picture" />

      <Body>{children}</Body>
    </UserResultCard>
  )
}