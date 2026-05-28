'use client'

import { useDispatch, useSelector } from 'react-redux'

import { NotificationItem } from './NotificationPanel'
import { ModalBackground, ModalPanel } from './Modal'
import { Header, Body, Footer } from './Card'
import { Button } from './Button'

import { hideNotificationModal } from '../reducers/notification-modal'

const notifications = [
  'Introduction to Computer Science',
  'Computer Vision and Image Processing',
  'Chris Evans',
  'Introduction to Computer Science',
  'Programming with Python',
  'Introduction to Computer Science',
]

export default function NotificationModal() {
  const dispatch = useDispatch()
  const isModalShowing = useSelector((state: any) => state.notificationModal)

  return (
    <ModalBackground $show={isModalShowing}>
      <ModalPanel $large>
        <Header>การแจ้งเตือน</Header>

        <Body $overflowY="scroll" $height="600px">
          {notifications.map((origin, index) => (
            <NotificationItem
              key={`${origin}-${index}`}
              origin={origin}
              content="ไสดมวไำดยสเนาฟบไำานดำฟสาดร่เพเาๆขนายำสกยบากนฟกานฟหากจๆไำาดชๆสยไำนด่ำไจาเ"
            />
          ))}
        </Body>

        <Footer>
          <Button $light onClick={() => dispatch(hideNotificationModal())}>
            ปิด
          </Button>
        </Footer>
      </ModalPanel>
    </ModalBackground>
  )
}