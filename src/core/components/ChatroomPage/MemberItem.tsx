'use client'

import styled from 'styled-components'

import Card from '../Card'

type UserConnectionStatusPicProps = {
  $status?: boolean
}

type MemberItemProps = {
  username: string
  isOnline: boolean
}

const UserConnectionStatusCard = styled(Card)`
  box-shadow: none;
  padding: 1em 1em 1.8em 1em;
`

const UserConnectionStatusPic = styled.img<UserConnectionStatusPicProps>`
  display: inline-block;
  float: left;

  width: 60px;
  height: 60px;

  border: ${p =>
    p.$status ? '2px solid #4db6ac' : 'none'};

  border-radius: 50%;

  background-color: #ccc;

  margin-right: 1.5em;
`

const Username = styled.h4`
  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
  font-weight: 500;
  font-size: 1.1em;
  margin-bottom: 0;
`

const OfflineText = styled.p`
  margin: 0;
  color: #777;
`

const OnlineText = styled.p`
  margin: 0;
  color: #4db6ac;
`

export default function MemberItem({
  username,
  isOnline,
}: MemberItemProps) {
  return (
    <UserConnectionStatusCard>
      <UserConnectionStatusPic $status={isOnline} />

      <div>
        <Username>{username}</Username>

        {isOnline ? (
          <OnlineText>กำลังใช้งานอยู่</OnlineText>
        ) : (
          <OfflineText>ออฟไลน์</OfflineText>
        )}
      </div>
    </UserConnectionStatusCard>
  )
}