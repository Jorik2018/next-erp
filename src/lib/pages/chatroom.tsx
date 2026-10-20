"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import UserConnectionStatusPanel from "@/components/ChatroomPage/UserConnectionStatusPanel";
import ClassroomActivityPanel from "@/components/ClassroomPage/ClassroomActivityPanel";
import ClassroomHeaderPanel from "@/components/ClassroomPage/ClassroomHeaderPanel";
import ChatMessagesPanel from "@/components/ChatroomPage/ChatMessagesPanel";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import Container from "@/components/Container";
import Panel from "@/components/Panel";

import { CLASSROOM_PAGE } from "@/constants/endpoints/ui";

interface ChatroomPageProps {
  isMember?: boolean;
  classroomID?: string;
  classroomName?: string;
  currentUserID?: string;
  classroomCreatorID?: string;
}

const ChatroomPage = ({
  isMember = true,
  classroomID = "1",
  classroomName = "Introduction to Computer Science",
  currentUserID,
  classroomCreatorID,
}: ChatroomPageProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!isMember) {
      router.replace(
        `${CLASSROOM_PAGE}?id=${classroomID}`
      );
    }
  }, [isMember, classroomID, router]);

  if (!isMember) {
    return null;
  }

  return (
    <AuthenticatedLayout>
      <ClassroomHeaderPanel
        classroomID={classroomID}
        classroomName={classroomName}
      />

      <Container $marginTop="8em">
        <Panel
          $left
          $width={40}
          $paddingBottom="6em"
        >
          <UserConnectionStatusPanel />
        </Panel>

        <Panel
          $right
          $width={60}
          $paddingBottom="6em"
        >
          <ChatMessagesPanel />
        </Panel>
      </Container>

      <ClassroomActivityPanel
        classroomID={classroomID}
        currentUserID={currentUserID}
        classroomCreatorID={classroomCreatorID}
      />
    </AuthenticatedLayout>
  );
};

export default ChatroomPage;