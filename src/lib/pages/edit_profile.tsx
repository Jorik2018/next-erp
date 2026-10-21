import EditProfileForm from "@/lib/components/EditProfilePage/EditProfileForm";
import AuthenticatedLayout from "@/lib/components/layout/AuthenticatedLayout";
import Container from "@/lib/components/Container";

export default function EditProfilePage() {
  return (
    <AuthenticatedLayout>
      <Container $transparent>
        <EditProfileForm />
      </Container>
    </AuthenticatedLayout>
  );
}