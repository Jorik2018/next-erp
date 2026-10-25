// src/types/post-component-editor.ts

import type {
  PostComponentType,
} from "@/lib/helpers/post";

interface BasePostComponentEditorProps {
  order: number;
}

/* -------------------------------------------------------------------------- */
/*                                    Add                                     */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                    Edit                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                            Component editor props                           */
/* -------------------------------------------------------------------------- */

export type PostComponentEditorProps<
  TData,
  TType extends PostComponentType,
> =
  | AddPostComponentEditorProps<TData, TType>
  | EditPostComponentEditorProps<TData, TType>;

/* -------------------------------------------------------------------------- */
/*                         Dynamic registry contracts                          */
/* -------------------------------------------------------------------------- */

export interface AddPostComponentPayload {
  data: unknown;
  type: PostComponentType;
  order: number;
}

export interface EditPostComponentPayload {
  newData: unknown;
  type: PostComponentType;
  order: number;
}

export interface CommonAddPostComponentProps
  extends BasePostComponentEditorProps {
  useToAddComponent: true;

  hideAddPostComponentModal: () => void;

  addNewPostComponent: (
    component: AddPostComponentPayload
  ) => void;
}

export interface CommonEditPostComponentProps
  extends BasePostComponentEditorProps {
  useToAddComponent: false;

  hideEditPostComponentModal: () => void;

  editPostComponent: (
    component: EditPostComponentPayload
  ) => void;
}