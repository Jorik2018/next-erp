// src/lib/components/PostEditor/EditPostComponentModal/EditPostComponentDetailForm.tsx

import type { ComponentType } from "react";

import type {
  PostComponentType,
} from "@/lib/helpers/post";

import type {
  CommonEditPostComponentProps,
  EditPostComponentPayload,
} from "@/types/post-component-editor";

import {
  editableComponents,
} from "../PostComponents/editable-component-registry";

interface EditPostComponentDetailFormProps {
  hideEditPostComponentModal: () => void;

  editPostComponent: (
    component: EditPostComponentPayload
  ) => void;

  order: number;
  type?: PostComponentType;
}

type EditableComponent =
  ComponentType<CommonEditPostComponentProps>;

const EditPostComponentDetailForm = ({
  hideEditPostComponentModal,
  editPostComponent,
  type,
  order,
}: EditPostComponentDetailFormProps) => {
  if (!type) {
    return null;
  }

  const ComponentToRender:
    | EditableComponent
    | undefined =
      editableComponents[type];

  if (!ComponentToRender) {
    return null;
  }

  return (
    <ComponentToRender
      useToAddComponent={false}
      order={order}
      hideEditPostComponentModal={
        hideEditPostComponentModal
      }
      editPostComponent={
        editPostComponent
      }
    />
  );
};

export default EditPostComponentDetailForm;