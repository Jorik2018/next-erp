'use client'

import { PostComponent, renderPostComponent } from '../../helpers/post'
import { ModalBackground, ModalPanel } from '../Modal'
import { Header, Body, Footer } from '../Card'
import { Button } from '../Button'

type PostPreviewModalProps = {
  receipe: PostComponent[]
  isShowing: boolean
  hidePostPreviewModal: () => void
}

export default function PostPreviewModal({
  receipe,
  isShowing,
  hidePostPreviewModal,
}: PostPreviewModalProps) {
  return (
    <ModalBackground $show={isShowing}>
      <ModalPanel style={{ maxWidth: '1400px' }}>
        <Header>พรีวิว</Header>

        <Body style={{ paddingTop: '5em', paddingBottom: '5em' }}>
          {renderPostComponent(receipe)}
        </Body>

        <Footer>
          <Button $primary onClick={() => alert('Saving')}>
            บันทึก
          </Button>

          <Button $light onClick={hidePostPreviewModal}>
            ปิด
          </Button>
        </Footer>
      </ModalPanel>
    </ModalBackground>
  )
}