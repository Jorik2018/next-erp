// src/app/register/page.tsx

import RegisterAccountForm from "@/lib/components/forms/RegisterAccountForm";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <RegisterAccountForm />
    </main>
  );
}