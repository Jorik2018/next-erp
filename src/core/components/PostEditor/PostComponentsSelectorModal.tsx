'use client'

import { ModalBackground, ModalPanel } from '../Modal'
import PostComponentItem from './PostComponentItem'
import { Header, Body, Footer } from '../Card'
import { Button } from '../Button'

import {
  SUB_HEADING,
  SLIDE_SHOW,
  ATTACHMENT,
  PARAGRAPH,
  HEADING,
  TABLE,
  IMAGE,
  VIDEO,
  LIST,
  MAP,
} from '../../constants/post-content/components'

type PostComponentsSelectorModalProps = {
  isComponentsSelectorModalShowing: boolean
  hideComponentsSelectorModal: () => void
  showAddPostComponentModal: (type: string) => void
}

const components = [
  { type: HEADING, name: 'หัวข้อเรื่อง' },
  { type: SUB_HEADING, name: 'หัวข้อย่อย' },
  { type: PARAGRAPH, name: 'ย่อหน้า' },
  { type: IMAGE, name: 'รุปภาพ' },
  { type: LIST, name: 'รายการ' },
  { type: VIDEO, name: 'วิดีโอ' },
  { type: MAP, name: 'แผนที่' },
  { type: TABLE, name: 'ตาราง' },
  { type: SLIDE_SHOW, name: 'สไลด์รูปภาพ' },
  { type: ATTACHMENT, name: 'ไฟล์แนบ' },
]

export default function PostComponentsSelectorModal({
  isComponentsSelectorModalShowing,
  hideComponentsSelectorModal,
  showAddPostComponentModal,
}: PostComponentsSelectorModalProps) {
  return (
    <ModalBackground $show={isComponentsSelectorModalShowing}>
      <ModalPanel $large>
        <Header>เลือกส่วนประกอบที่ต้องการ</Header>

        <Body $height="470px" style={{ textAlign: 'center' }}>
          {components.map(component => (
            <PostComponentItem
              key={component.type}
              onClick={() => showAddPostComponentModal(component.type)}
              name={component.name}
            />
          ))}
        </Body>

        <Footer>
          <Button
            $light
            $textCenter
            onClick={hideComponentsSelectorModal}
          >
            ยกเลิก
          </Button>
        </Footer>
      </ModalPanel>
    </ModalBackground>
  )
}