import { getPost } from "@/app/_actions/posts";
import { notFound } from "next/navigation";

export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const post = await getPost((await params).id);
  if (!post) notFound();

  return <div>page {post.id}</div>;
}
