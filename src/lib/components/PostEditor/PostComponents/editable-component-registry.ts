import Attachment from "./EditableComponents/Attachment";
import Heading from "./EditableComponents/Heading";
import Image from "./EditableComponents/Image";
import List from "./EditableComponents/List";
import Map from "./EditableComponents/Map";
import Paragraph from "./EditableComponents/Paragraph";
import Slideshow from "./EditableComponents/Slideshow";
import SubHeading from "./EditableComponents/SubHeading";
import Table from "./EditableComponents/Table";
import Video from "./EditableComponents/Video";

import {
  ATTACHMENT,
  HEADING,
  IMAGE,
  LIST,
  MAP,
  PARAGRAPH,
  SLIDE_SHOW,
  SUB_HEADING,
  TABLE,
  VIDEO,
} from "@/lib/constants/post-content/components";

import type {
  PostComponentType,
} from "@/lib/helpers/post";

export const editableComponents = {
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
} satisfies Record<
  PostComponentType,
  React.ComponentType<any>
>;