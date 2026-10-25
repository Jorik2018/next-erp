import CreatePostPage from "@/lib/pages/create_post";

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
    <CreatePostPage  />
  );
}