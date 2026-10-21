import { ModalBackground, ModalPanel } from '@/lib/components/Modal'
import EditPostComponentDetailForm from './EditPostComponentDetailForm'
//import { ModalBackground, ModalPanel } from '../../../Modal'

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

interface EditPostComponentModalState {
  isShowing: boolean
  order: number
  type?: PostComponentType
}

interface EditPostComponentData {
  newData: unknown
  type: PostComponentType
  order: number
}

interface EditPostComponentModalProps {
  hideEditPostComponentModal: () => void
  editPostComponentModal: EditPostComponentModalState
  editPostComponent: (
    component: EditPostComponentData
  ) => void
}

const EditPostComponentModal = ({
  hideEditPostComponentModal,
  editPostComponentModal,
  editPostComponent
}: EditPostComponentModalProps) => (
  <ModalBackground
    $show={editPostComponentModal.isShowing}
    style={{ zIndex: 100 }}
  >
    <ModalPanel style={{ maxWidth: '1200px' }}>
      <EditPostComponentDetailForm
        order={editPostComponentModal.order}
        type={editPostComponentModal.type}
        editPostComponent={editPostComponent}
        hideEditPostComponentModal={
          hideEditPostComponentModal
        }
      />
    </ModalPanel>
  </ModalBackground>
)

export default EditPostComponentModal