// src/app/patients/[userId]/register/page.tsx

import RegisterPage from "@/lib/components/forms/RegisterPage";
interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function Page({
  params,
}: PageProps) {
  
  return <RegisterPage {...(await params)} />;
}