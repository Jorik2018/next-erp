import MyAppointmentsPage from "@/lib/components/pages/MyAppointmentsPage";

export default async function Page({
  params,
}: {
  params: Promise<{
    userId: string;
  }>;
}) {
  return <MyAppointmentsPage {...(await params)} />
}