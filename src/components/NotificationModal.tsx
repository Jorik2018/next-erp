'use client'

import { useDispatch, useSelector } from 'react-redux'

import { NotificationItem } from './NotificationPanel'
import { ModalBackground, ModalPanel } from './Modal'
import { Header, Body, Footer } from './Card'
import { Button } from './Button'
import { hideNotificationModal } from '@/lib/slices/notification-modal'

interface RootState {
  notificationModal: boolean
}

const NotificationModal = () => {
  const dispatch = useDispatch()

  const isModalShowing = useSelector(
    (state: RootState) => state.notificationModal
  )

  const hideModal = () => {
    dispatch(hideNotificationModal())
  }

  return (
    <ModalBackground $show={isModalShowing}>
      <ModalPanel $large>
        <Header>การแจ้งเตือน</Header>

        <Body $overflowY="scroll" $height="600px">
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

          <NotificationItem
            origin="Introduction to Computer Science"
            content="ไสดมวไำดยสเนาฟบไำานดำฟสาดร่เพเาๆขนายำสกยบากนฟกานฟหากจๆไำาดชๆสยไำนด่ำไจาเ"
          />

          <NotificationItem
            origin="Programming with Python"
            content="ไสดมวไำดยสเนาฟบไำานดำฟสาดร่เพเาๆขนายำสกยบากนฟกานฟหากจๆไำาดชๆสยไำนด่ำไจาเ"
          />

          <NotificationItem
            origin="Introduction to Computer Science"
            content="ไสดมวไำดยสเนาฟบไำานดำฟสาดร่เพเาๆขนายำสกยบากนฟกานฟหากจๆไำาดชๆสยไำนด่ำไจาเ"
          />
        </Body>

        <Footer>
          <Button
            $light
            type="button"
            onClick={hideModal}
          >
            ปิด
          </Button>
        </Footer>
      </ModalPanel>
    </ModalBackground>
  )
}

export default NotificationModal