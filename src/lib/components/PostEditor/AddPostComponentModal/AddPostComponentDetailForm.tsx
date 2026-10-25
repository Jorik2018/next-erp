import { PostComponent, PostComponentType } from '@/lib/helpers/post'
import { editableComponents } from '../PostComponents/editable-component-registry'
interface AddPostComponentDetailFormProps {
  hideAddPostComponentModal: () => void
  addNewPostComponent: (component: PostComponent) => void
  order: number
  type?: PostComponentType
}

const AddPostComponentDetailForm = ({
  hideAddPostComponentModal,
  addNewPostComponent,
  type,
  order
}: AddPostComponentDetailFormProps) => {
  if (!type) {
    return null
  }

  const ComponentToRender = editableComponents[type]

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