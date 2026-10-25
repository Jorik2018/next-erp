import ClassroomPage from "@/lib/pages/classroom";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({
  params,
}: PageProps) {
  const { id } = await params;
  return (
    <ClassroomPage classroomID={id}
    />
  )
}

