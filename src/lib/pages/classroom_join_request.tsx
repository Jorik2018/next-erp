"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ClassroomActivityPanel from "@/lib/components/ClassroomPage/ClassroomActivityPanel";
import JoinRequestPanel from "@/lib/components/ClassroomJoinRequestPage/JoinRequestPanel";
import ClassroomHeaderPanel from "@/lib/components/ClassroomPage/ClassroomHeaderPanel";
import AuthenticatedLayout from "@/lib/components/layout/AuthenticatedLayout";
import { CLASSROOM_PAGE } from "@/lib/constants/endpoints/ui";
import Container from "@/lib/components/Container";

interface ClassroomJoinRequestPageProp {
  classroomID: string;
}

export default function ClassroomJoinRequestPage({ classroomID }: ClassroomJoinRequestPageProp) {
  const router = useRouter();
  // Temporary mocked data from the original getInitialProps.
  const isMember = true;
  const classroomName = "Introduction to Computer Science";

  useEffect(() => {
    if (!isMember) {
      router.replace(
        classroomID
          ? `${CLASSROOM_PAGE}?id=${classroomID}`
          : CLASSROOM_PAGE
      );
    }
  }, [isMember, classroomID, router]);

  if (!isMember) {
    return null;
  }

  if (!classroomID) {
    return (
      <AuthenticatedLayout>
        <p>Classroom ID was not specified.</p>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <ClassroomHeaderPanel
        classroomID={classroomID}
        classroomName={classroomName}
      />

      <Container $marginTop="7em">
        <JoinRequestPanel />

        <ClassroomActivityPanel
          classroomID={classroomID}
        />
      </Container>
    </AuthenticatedLayout>
  );
}