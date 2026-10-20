"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import ClassroomActivityPanel from "@/components/ClassroomPage/ClassroomActivityPanel";
import ClassroomHeaderPanel from "@/components/ClassroomPage/ClassroomHeaderPanel";
import EditClassroomForm from "@/components/EditClassroomPage/EditClassroomForm";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import Container from "@/components/Container";

import { CLASSROOM_PAGE } from "@/constants/endpoints/ui";

export default function EditClassroomPage() {
  const router = useRouter();

  // Temporary mocked data from the original getInitialProps.
  const isMember = true;
  const classroomID = "1";
  const classroomName = "Introduction to Computer Science";

  useEffect(() => {
    if (!isMember) {
      router.replace(CLASSROOM_PAGE);
    }
  }, [isMember, router]);

  if (!isMember) {
    return null;
  }

  return (
    <AuthenticatedLayout>
      <ClassroomHeaderPanel
        classroomID={classroomID}
        classroomName={classroomName}
      />

      <Container $transparent $marginTop="10em">
        <EditClassroomForm />
      </Container>

      <ClassroomActivityPanel classroomID={classroomID}/>
    </AuthenticatedLayout>
  );
}