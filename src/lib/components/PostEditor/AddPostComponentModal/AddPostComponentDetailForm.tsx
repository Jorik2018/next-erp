import Attachment from '../PostComponents/EditableComponents/Attachment'
import SubHeading from '../PostComponents/EditableComponents/SubHeading'
import Paragraph from '../PostComponents/EditableComponents/Paragraph'
import Slideshow from '../PostComponents/EditableComponents/Slideshow'
import Heading from '../PostComponents/EditableComponents/Heading'
import Image from '../PostComponents/EditableComponents/Image'
import Table from '../PostComponents/EditableComponents/Table'
import Video from '../PostComponents/EditableComponents/Video'
import List from '../PostComponents/EditableComponents/List'
import Map from '../PostComponents/EditableComponents/Map'

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

interface NewPostComponent {
  type: PostComponentType
  order: number
  data: unknown
}

interface AddPostComponentDetailFormProps {
  hideAddPostComponentModal: () => void
  addNewPostComponent: (component: NewPostComponent) => void
  order: number
  type?: PostComponentType
}

const components = {
  [HEADING]: Heading,
  [SUB_HEADING]: SubHeading,
  [PARAGRAPH]: Paragraph,
  [IMAGE]: Image,
  [LIST]: List,
  [VIDEO]: Video,
  [MAP]: Map,
  [TABLE]: Table,
  [SLIDE_SHOW]: Slideshow,
  [ATTACHMENT]: Attachment
}

/**
 * @name AddPostComponentDetailForm
 * @desc Displays the appropriate form for the selected post component type.
 */
const AddPostComponentDetailForm = ({
  hideAddPostComponentModal,
  addNewPostComponent,
  type,
  order
}: AddPostComponentDetailFormProps) => {
  if (!type) {
    return null
  }

  const ComponentToRender = components[type]

  if (!ComponentToRender) {
    return null
  }

  return (
    <ComponentToRender
      hideAddPostComponentModal={hideAddPostComponentModal}
      addNewPostComponent={addNewPostComponent}
      useToAddComponent
      order={order}
    />
  )
}

export default AddPostComponentDetailForm