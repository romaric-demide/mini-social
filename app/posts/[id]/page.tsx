import { getPost } from "@/app/_actions/posts";
import PostCard from "@/components/PostCard";
import { notFound } from "next/navigation";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const post = await getPost((await params).id);
  if (!post) notFound();

  return (
    <div>
      page <PostCard post={post} />
    </div>
  );
}
