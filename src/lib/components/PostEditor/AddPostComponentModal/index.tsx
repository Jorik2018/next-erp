import { ModalBackground, ModalPanel } from '@/lib/components/Modal'
import AddPostComponentDetailForm from './AddPostComponentDetailForm'
import { AddPostComponentModalState, PostComponent } from '@/lib/helpers/post'

interface AddPostComponentModalProps {
  hideAddPostComponentModal: () => void
  addPostComponentModal: AddPostComponentModalState
  addNewPostComponent: (component: PostComponent) => void
  receipe: PostComponent[]
}

/**
 * @name AddPostComponentModal
 * @desc Displays a modal used to add a new post component.
 */
const AddPostComponentModal = ({
  hideAddPostComponentModal,
  addPostComponentModal,
  addNewPostComponent,
  receipe
}: AddPostComponentModalProps) => (
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

export default AddPostComponentModal       