'use client'

import AddPostComponentDetailForm from './AddPostComponentDetailForm'
import { ModalBackground, ModalPanel } from '../../Modal'

type AddPostComponentModalState = {
  isShowing: boolean
  type: string
}

type AddPostComponentModalProps = {
  hideAddPostComponentModal: () => void
  addPostComponentModal: AddPostComponentModalState
  addNewPostComponent: (component: unknown) => void
  receipe: unknown[]
}

export default function AddPostComponentModal({
  hideAddPostComponentModal,
  addPostComponentModal,
  addNewPostComponent,
  receipe,
}: AddPostComponentModalProps) {
  return (
    <ModalBackground
      $show={addPostComponentModal.isShowing}
      style={{ zIndex: 100 }}
    >
      <ModalPanel style={{ maxWidth: '1200px' }}>
        <AddPostComponentDetailForm
          order={receipe.length}
          type={addPostComponentModal.type}
          addNewPostComponent={addNewPostComponent}
          hideAddPostComponentModal={hideAddPostComponentModal}
        />
      </ModalPanel>
    </ModalBackground>
  )
}