// src/core/types/postComponents.ts

export type AddPostComponentPayload<TData, TType extends string> = {
  data: TData
  type: TType
  order?: number
}

export type EditPostComponentPayload<TData, TType extends string> = {
  newData: TData
  type: TType
  order?: number
}

export type EditablePostComponentProps<TData, TType extends string> = {
  useToAddComponent: boolean
  hideAddPostComponentModal?: () => void
  hideEditPostComponentModal?: () => void
  addNewPostComponent?: (
    payload: AddPostComponentPayload<TData, TType>
  ) => void
  editPostComponent?: (
    payload: EditPostComponentPayload<TData, TType>
  ) => void
  order?: number
}