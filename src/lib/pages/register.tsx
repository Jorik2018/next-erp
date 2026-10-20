import UnAuthenticatedLayout from "@/components/layout/UnAuthenticatedLayout";
import RegisterForm from "@/components/RegisterPage/RegisterForm";
import Container from "@/components/Container";
import Wallpaper from "@/components/Wallpaper";

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