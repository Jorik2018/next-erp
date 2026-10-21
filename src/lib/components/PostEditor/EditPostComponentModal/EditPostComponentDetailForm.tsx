import type { ComponentType } from "react";

import Attachment from "../PostComponents/EditableComponents/Attachment";
import SubHeading from "../PostComponents/EditableComponents/SubHeading";
import Paragraph from "../PostComponents/EditableComponents/Paragraph";
import Slideshow from "../PostComponents/EditableComponents/Slideshow";
import Heading from "../PostComponents/EditableComponents/Heading";
import Image from "../PostComponents/EditableComponents/Image";
import Table from "../PostComponents/EditableComponents/Table";
import Video from "../PostComponents/EditableComponents/Video";
import List from "../PostComponents/EditableComponents/List";
import Map from "../PostComponents/EditableComponents/Map";

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
} from "@/lib/constants/post-content/components";

import type { PostComponentType } from "@/helpers/post";
import type {
  CommonEditPostComponentProps,
  EditPostComponentPayload,
} from "@/types/post-component-editor";

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
  [ATTACHMENT]: Attachment,
} satisfies Partial<
  Record<PostComponentType, EditableComponent>
>;

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
    | undefined = components[type];

  if (!ComponentToRender) {
    return null;
  }

  return (
    <ComponentToRender
      hideEditPostComponentModal={
        hideEditPostComponentModal
      }
      editPostComponent={editPostComponent}
      useToAddComponent={false}
      order={order}
    />
  );
};

export default EditPostComponentDetailForm;