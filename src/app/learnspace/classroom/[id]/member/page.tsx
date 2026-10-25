import ClassroomMemberPage from "@/lib/pages/classroom_member";

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
        <ClassroomMemberPage classroomID={id} />
    );
}