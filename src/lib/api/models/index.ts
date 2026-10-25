import { UserModel } from "./user";
import { ClassroomModel } from "./classroom";
import { ClassroomMemberModel } from "./classroom-member";
import { ClassroomInvitationModel } from "./classroom-invitation";
import { ClassroomJoinRequestModel } from "./classroom-join-request";
import { CourseOutlineModel } from "./course-outline";
import { PostModel } from "./post";
import { CommentModel } from "./comment";
import { SubCommentModel } from "./sub-comment";
import { NotificationModel } from "./notification";
import { ChatroomModel } from "./chatroom";
import { ChatMessageModel } from "./chat-message";

export {
  UserModel,
  ClassroomModel,
  ClassroomMemberModel,
  ClassroomInvitationModel,
  ClassroomJoinRequestModel,
  CourseOutlineModel,
  PostModel,
  CommentModel,
  SubCommentModel,
  NotificationModel,
  ChatroomModel,
  ChatMessageModel,
};

export type { UserDocument } from "./user";
export type { ClassroomDocument } from "./classroom";
export type { ClassroomMemberDocument } from "./classroom-member";
export type { ClassroomInvitationDocument } from "./classroom-invitation";
export type { ClassroomJoinRequestDocument } from "./classroom-join-request";
export type { CourseOutlineDocument } from "./course-outline";
export type { PostDocument } from "./post";
export type { CommentDocument } from "./comment";
export type { SubCommentDocument } from "./sub-comment";
export type { NotificationDocument } from "./notification";
export type { ChatroomDocument } from "./chatroom";
export type { ChatMessageDocument } from "./chat-message";

const models = {
  User: UserModel,
  Classroom: ClassroomModel,
  ClassroomMember: ClassroomMemberModel,
  ClassroomInvitation: ClassroomInvitationModel,
  ClassroomJoinRequest: ClassroomJoinRequestModel,
  CourseOutline: CourseOutlineModel,
  Post: PostModel,
  Comment: CommentModel,
  SubComment: SubCommentModel,
  Notification: NotificationModel,
  Chatroom: ChatroomModel,
  ChatMessage: ChatMessageModel,
};

export default models;