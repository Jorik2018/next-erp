import CreateClassroomForm from "@/lib/components/CreateClassroomPage/CreateClassroomForm";
import AuthenticatedLayout from "@/lib/components/layout/AuthenticatedLayout";
import Container from "@/lib/components/Container";

export default function CreateClassroomPage() {
  return (
    <AuthenticatedLayout>
      <Container $transparent>
        <CreateClassroomForm />
      </Container>
    </AuthenticatedLayout>
  );
}