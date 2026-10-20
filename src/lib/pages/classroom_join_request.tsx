"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ClassroomActivityPanel from "@/components/ClassroomPage/ClassroomActivityPanel";
import JoinRequestPanel from "@/components/ClassroomJoinRequestPage/JoinRequestPanel";
import ClassroomHeaderPanel from "@/components/ClassroomPage/ClassroomHeaderPanel";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import { CLASSROOM_PAGE } from "@/constants/endpoints/ui";
import Container from "@/components/Container";

export default function ClassroomJoinRequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const classroomID = searchParams.get("id");

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