"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import ClassroomActivityPanel from "@/lib/components/ClassroomPage/ClassroomActivityPanel";
import ClassroomHeaderPanel from "@/lib/components/ClassroomPage/ClassroomHeaderPanel";
import EditClassroomForm from "@/lib/components/EditClassroomPage/EditClassroomForm";
import AuthenticatedLayout from "@/lib/components/layout/AuthenticatedLayout";
import Container from "@/lib/components/Container";

import { CLASSROOM_PAGE } from "@/lib/constants/endpoints/ui";

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