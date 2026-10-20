// src/types/post-component-editor.ts

import type { PostComponentType } from "@/helpers/post";

interface BasePostComponentEditorProps {
  order: number;
}

export interface AddPostComponentEditorProps<
  TData,
  TType extends PostComponentType,
> extends BasePostComponentEditorProps {
  useToAddComponent: true;

  hideAddPostComponentModal: () => void;

  addNewPostComponent: (component: {
    data: TData;
    type: TType;
    order: number;
  }) => void;
}

export interface EditPostComponentEditorProps<
  TData,
  TType extends PostComponentType,
> extends BasePostComponentEditorProps {
  useToAddComponent: false;

  hideEditPostComponentModal: () => void;

  editPostComponent: (component: {
    newData: TData;
    type: TType;
    order: number;
  }) => void;
}

export type PostComponentEditorProps<
  TData,
  TType extends PostComponentType,
> =
  | AddPostComponentEditorProps<TData, TType>
  | EditPostComponentEditorProps<TData, TType>;




export interface EditPostComponentPayload {
  newData: unknown;
  type: PostComponentType;
  order: number;
}

export interface CommonEditPostComponentProps {
  useToAddComponent: false;
  order: number;
  hideEditPostComponentModal: () => void;
  editPostComponent: (
    component: EditPostComponentPayload
  ) => void;
}