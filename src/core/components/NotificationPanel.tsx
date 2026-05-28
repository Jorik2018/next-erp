'use client'

import styled from 'styled-components'

import Card, { Header, Body } from './Card'

const NotificationPanelCard = styled(Card)`
  margin: 0;
  height: 700px;
  padding-bottom: 2em;
`

const NotificationOriginPic = styled.img`
  display: inline-block;
  float: left;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 1.5em;
`

const NotificationInfo = styled.div`
  h4 {
    color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
    font-weight: 500;
    font-size: 1.1em;
    margin-bottom: 0;
  }

  p {
    margin: 0;
    color: #777;
  }
`

const NotificationCard = styled(Card)`
  box-shadow: none;
  padding: 1em 1em 1.8em 1em;
`

type NotificationItemProps = {
  origin: string
  content: string
}

export const NotificationItem = ({
  origin,
  content,
}: NotificationItemProps) => (
  <NotificationCard>
    <NotificationOriginPic alt="" />
    <NotificationInfo>
      <h4>{origin}</h4>
      <p>{content}</p>
    </NotificationInfo>
  </NotificationCard>
)

export default function NotificationPanel() {
  return (
    <NotificationPanelCard>
      <Header>การแจ้งเตือน</Header>

      <Body $overflowY="auto" $height="600px">
        <NotificationItem
          origin="Introduction to Computer Science"
          content="ไสดมวไำดยสเนาฟบไำานดำฟสาดร่เพเาๆขนายำสกยบากนฟกานฟหากจๆไำาดชๆสยไำนด่ำไจาเ"
        />
        <NotificationItem
          origin="Computer Vision and Image Processing"
          content="ไสดมวไำดยสเนาฟบไำานดำฟสาดร่เพเาๆขนายำสกยบากนฟกานฟหากจๆไำาดชๆสยไำนด่ำไจาเ"
        />
        <NotificationItem
          origin="Chris Evans"
          content="ไสดมวไำดยสเนาฟบไำานดำฟสาดร่เพเาๆขนายำสกยบากนฟกานฟหากจๆไำาดชๆสยไำนด่ำไจาเ"
        />
      </Body>
    </NotificationPanelCard>
  )
}