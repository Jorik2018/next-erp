import AuthenticatedLayout from "@/lib/components/layout/AuthenticatedLayout";
import EditPostEditor from "@/lib/components/EditPostPage/EditPostEditor";
import Container from "@/lib/components/Container";

export default function EditPostPage() {
  return (
    <AuthenticatedLayout>
      <Container>
        <EditPostEditor />
      </Container>
    </AuthenticatedLayout>
  );
}