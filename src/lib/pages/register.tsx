import UnAuthenticatedLayout from "@/lib/components/layout/UnAuthenticatedLayout";
import RegisterForm from "@/lib/components/RegisterPage/RegisterForm";
import Container from "@/lib/components/Container";
import Wallpaper from "@/lib/components/Wallpaper";

export default function RegisterPage() {
  return (
    <UnAuthenticatedLayout>
      <Wallpaper $pageName="register">
        <Container $transparent>
          <RegisterForm />
        </Container>
      </Wallpaper>
    </UnAuthenticatedLayout>
  );
}