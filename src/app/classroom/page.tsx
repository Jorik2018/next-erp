import ClassroomPageClient from "../dashboard/pages/classroom"

interface ClassroomPageProps {
  searchParams: Promise<{
    id?: string
  }>
}

export default async function ClassroomPage({
  searchParams
}: ClassroomPageProps) {
  const { id } = await searchParams

  return <ClassroomPageClient id={id ?? ''} />
}