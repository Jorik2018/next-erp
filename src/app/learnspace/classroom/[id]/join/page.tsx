import ClassroomJoinRequestPage from "@/lib/pages/classroom_join_request";

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
        <ClassroomJoinRequestPage classroomID={id} />
    );
}