import CreateClassroomForm from "@/components/CreateClassroomPage/CreateClassroomForm";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import Container from "@/components/Container";

export default function CreateClassroomPage() {
  return (
    <AuthenticatedLayout>
      <Container $transparent>
        <CreateClassroomForm />
      </Container>
    </AuthenticatedLayout>
  );
}