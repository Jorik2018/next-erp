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

type AddPostComponentDetailFormProps = {
  hideAddPostComponentModal: () => void
  addNewPostComponent: (component: unknown) => void
  order?: number
  type?: string
}

const componentMap = {
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
} as const

export default function AddPostComponentDetailForm({
  hideAddPostComponentModal,
  addNewPostComponent,
  type,
  order,
}: AddPostComponentDetailFormProps) {
  if (!type) {
    return null
  }

  const ComponentToRender:any = componentMap[type as keyof typeof componentMap]

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