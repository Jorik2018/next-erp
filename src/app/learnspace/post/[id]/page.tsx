// src/app/learnspace/post/page.tsx
import PostPage from "@/lib/pages/post";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({
  params,
}: PageProps) {
  const { id } = await params;

  return <PostPage postID={id} />;
}