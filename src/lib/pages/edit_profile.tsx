import EditProfileForm from "@/components/EditProfilePage/EditProfileForm";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import Container from "@/components/Container";

export default function EditProfilePage() {
  return (
    <AuthenticatedLayout>
      <Container $transparent>
        <EditProfileForm />
      </Container>
    </AuthenticatedLayout>
  );
}