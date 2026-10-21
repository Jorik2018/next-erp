"use client";

import { useSearchParams } from "next/navigation";

import ClassroomActivityPanel from "@/lib/components/ClassroomPage/ClassroomActivityPanel";
import AuthenticatedLayout from "@/lib/components/layout/AuthenticatedLayout";
import PostEditor from "@/lib/components/PostEditor/PostEditor";
import Container from "@/lib/components/Container";

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