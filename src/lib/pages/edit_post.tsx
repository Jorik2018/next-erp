import AuthenticatedLayout from "@/lib/components/layout/AuthenticatedLayout";
import EditPostEditor from "@/lib/components/EditPostPage/EditPostEditor";
import Container from "@/lib/components/Container";

interface EditPostPageProps {
  postID: string;
}

export default function EditPostPage({
  postID,
}: EditPostPageProps) {
  return (
    <AuthenticatedLayout>
      <Container>
        <EditPostEditor postID={postID} />
      </Container>
    </AuthenticatedLayout>
  );
}