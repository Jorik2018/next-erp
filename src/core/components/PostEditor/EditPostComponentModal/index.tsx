'use client'

import EditPostComponentDetailForm from './EditPostComponentDetailForm'
import { ModalBackground, ModalPanel } from '../../Modal'
import { EditPostComponentModalState } from '@/core/slices/edit-post-component-modal'

type EditPostComponentModalProps = {
  hideEditPostComponentModal: () => void
  editPostComponentModal: EditPostComponentModalState
  editPostComponent: (payload: unknown) => void
}


export default function EditPostComponentModal({
  hideEditPostComponentModal,
  editPostComponentModal,
  editPostComponent,
}: EditPostComponentModalProps) {
  return (
    <ModalBackground
      $show={editPostComponentModal.isShowing}
      style={{ zIndex: 100 }}
    >
      <ModalPanel style={{ maxWidth: '1200px' }}>
        <EditPostComponentDetailForm
          order={editPostComponentModal.order}
          type={editPostComponentModal.type}
          editPostComponent={editPostComponent}
          hideEditPostComponentModal={hideEditPostComponentModal}
        />
      </ModalPanel>
    </ModalBackground>
  )
}