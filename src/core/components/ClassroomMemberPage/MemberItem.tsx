'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'

import Card, { Body } from '../Card'
import { CircleButton } from '../Button'

const MemberItemCard = styled(Card)`
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
  width: 200px;
  height: 200px;
  margin: 1em auto;
  display: block;
  border-radius: 50%;
  object-fit: cover;
`

type MemberItemProps = {
  children: ReactNode
  profilePicture?: string
  memberID?: string
}

export default function MemberItem({
  children,
  profilePicture,
}: MemberItemProps) {
  return (
    <MemberItemCard>
      <UserProfilePic src={profilePicture} alt="User profile" />

      <CircleButton $danger $position="absolute" $top="1em" $right="1em">
        -
      </CircleButton>

      <Body>{children}</Body>
    </MemberItemCard>
  )
}