'use client'

import styled from 'styled-components'

import Card, { Header, Body } from '../Card'
import MemberItem from './MemberItem'

const UserStatusPanelCard = styled(Card)`
  height: 700px;
  padding-bottom: 2em;
`

export default function UserConnectionStatusPanel() {
  return (
    <UserStatusPanelCard>
      <Header>สมาชิกที่ออนใลน์อยู่</Header>

      <Body $overflowY="scroll" $height="600px">
        <MemberItem username="Tony Stark" isOnline />
        <MemberItem username="Chris Evans" isOnline={false} />
        <MemberItem username="Scarlett Johanson" isOnline />
        <MemberItem username="Tom Holland" isOnline={false} />
        <MemberItem username="Chris Patt" isOnline />
        <MemberItem username="Samuel Jackson" isOnline />
        <MemberItem username="Scarlett Johanson" isOnline />
        <MemberItem username="Tom Holland" isOnline={false} />
        <MemberItem username="Chris Patt" isOnline />
        <MemberItem username="Samuel Jackson" isOnline />
      </Body>
    </UserStatusPanelCard>
  )
}