import ClassroomMemberPageClient from "../dashboard/pages/classroom_member"

interface ClassroomMemberPageProps {
  searchParams: Promise<{
    id?: string
  }>
}

export default async function ClassroomMemberPage({
  searchParams
}: ClassroomMemberPageProps) {
  const { id } = await searchParams

  return (
    <ClassroomMemberPageClient
      classroomID={id ?? ''}
    />
  )
}