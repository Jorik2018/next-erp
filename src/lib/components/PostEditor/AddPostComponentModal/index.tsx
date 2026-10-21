import { ModalBackground, ModalPanel } from '@/lib/components/Modal'
import AddPostComponentDetailForm from './AddPostComponentDetailForm'


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
  MAP
} from '@/lib/constants/post-content/components'

type PostComponentType =
  | typeof HEADING
  | typeof SUB_HEADING
  | typeof PARAGRAPH
  | typeof IMAGE
  | typeof LIST
  | typeof VIDEO
  | typeof MAP
  | typeof TABLE
  | typeof SLIDE_SHOW
  | typeof ATTACHMENT

interface PostComponent {
  type: PostComponentType
  order: number
  data: unknown
}

interface AddPostComponentModalState {
  isShowing: boolean
  type?: PostComponentType
}

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