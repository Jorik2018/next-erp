'use client'

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
  MAP,
} from '../../../constants/post-content/components'

type EditPostComponentDetailFormProps = {
  hideEditPostComponentModal: () => void
  editPostComponent: (...args: any[]) => void
  order: number
  type?: string
}

type EditableComponentProps = {
  hideEditPostComponentModal: () => void
  editPostComponent: (...args: any[]) => void
  useToAddComponent: boolean
  order?: number
}

const componentMap: Record<
  string,
  React.ComponentType<EditableComponentProps>
> = {
  [HEADING]: Heading,
  [SUB_HEADING]: SubHeading,
  [PARAGRAPH]: Paragraph,
  [IMAGE]: Image,
  [LIST]: List,
  [VIDEO]: Video,
  [MAP]: Map,
  [TABLE]: Table,
  [SLIDE_SHOW]: Slideshow,
  [ATTACHMENT]: Attachment,
}

export default function EditPostComponentDetailForm({
  hideEditPostComponentModal,
  editPostComponent,
  type,
  order,
}: EditPostComponentDetailFormProps) {
  if (!type) {
    return null
  }

  const ComponentToRender = componentMap[type]

  if (!ComponentToRender) {
    return null
  }

  return (
    <ComponentToRender
      hideEditPostComponentModal={hideEditPostComponentModal}
      editPostComponent={editPostComponent}
      useToAddComponent={false}
      order={order}
    />
  )
}