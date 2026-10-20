import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import EditPostEditor from "@/components/EditPostPage/EditPostEditor";
import Container from "@/components/Container";

export default function EditPostPage() {
  return (
    <AuthenticatedLayout>
      <Container>
        <EditPostEditor />
      </Container>
    </AuthenticatedLayout>
  );
}