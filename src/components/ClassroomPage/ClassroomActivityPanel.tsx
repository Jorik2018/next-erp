import type { ReactNode } from "react";
import Link from "next/link";

import ActivityPanel from "../ActivityPanel";
import {
  CREATE_POST_PAGE,
  EDIT_CLASSROOM_PAGE,
  CLASSROOM_MEMBER_PAGE,
  CLASSROOM_CHATROOM_PAGE,
  CLASSROOM_JOIN_REQUEST_PAGE,
} from "@/constants/endpoints/ui";

interface AdminOnlyProps {
  classroomCreatorID?: string;
  currentUserID?: string;
  children: ReactNode;
}

const AdminOnly = ({
  classroomCreatorID,
  currentUserID,
  children,
}: AdminOnlyProps) =>
  classroomCreatorID === currentUserID ? children : null;

interface ClassroomActivityPanelProps {
  classroomCreatorID?: string;
  currentUserID?: string;
  classroomID: string;
}

const ClassroomActivityPanel = ({
  classroomID,
  classroomCreatorID,
  currentUserID,
}: ClassroomActivityPanelProps) => {
  const adminProps = {
    classroomCreatorID,
    currentUserID,
  };

  return (
    <ActivityPanel>
      <Link href={CLASSROOM_CHATROOM_PAGE}>
        Chat Room
      </Link>

      <AdminOnly {...adminProps}>
        <Link
          href={{
            pathname: CREATE_POST_PAGE,
            query: { classroomID },
          }}
        >
          Create New Post
        </Link>
      </AdminOnly>

      <AdminOnly {...adminProps}>
        <Link
          href={{
            pathname: EDIT_CLASSROOM_PAGE,
            query: { id: classroomID },
          }}
        >
          Edit Classroom
        </Link>
      </AdminOnly>

      <Link
        href={{
          pathname: CLASSROOM_MEMBER_PAGE,
          query: { id: classroomID },
        }}
      >
        Members
      </Link>

      <AdminOnly {...adminProps}>
        <Link
          href={{
            pathname: CLASSROOM_JOIN_REQUEST_PAGE,
            query: { id: classroomID },
          }}
        >
          Join Requests
        </Link>
      </AdminOnly>
    </ActivityPanel>
  );
};

export default ClassroomActivityPanel;