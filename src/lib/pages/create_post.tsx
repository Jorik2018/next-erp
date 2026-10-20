"use client";

import { useSearchParams } from "next/navigation";

import ClassroomActivityPanel from "@/components/ClassroomPage/ClassroomActivityPanel";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import PostEditor from "@/components/PostEditor/PostEditor";
import Container from "@/components/Container";

export default function CreatePostPage() {
  const searchParams = useSearchParams();
  const classroomID = searchParams.get("classroomID");

  if (!classroomID) {
    return (
      <AuthenticatedLayout>
        <p>Classroom ID was not specified.</p>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <Container $transparent>
        <PostEditor classroomID={classroomID} />
      </Container>

      <ClassroomActivityPanel classroomID={classroomID} />
    </AuthenticatedLayout>
  );
}