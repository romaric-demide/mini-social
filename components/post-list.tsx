"use client";

import { useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";
import { useInView } from "motion/react";
import { getPosts } from "@/app/_actions/posts";
import PostCard from "./post-card";

type PostListProps = {
  type: PostType;
  userId?: string;
  pageSize?: number;
};

export default function PostList({
  type,
  userId,
  pageSize = 2,
}: PostListProps) {
  const { data, mutate, size, setSize, isLoading } = useSWRInfinite(
    (index) => ["posts", type, index + 1, userId],
    ([, , page]) => getPosts(type, page, pageSize, userId),
  );

  const posts = data?.flat() || [];
  const hasMore = data?.[data.length - 1]?.length === pageSize;
  const loadingMore = isLoading || !data?.[size - 1];

  const loaderRef = useRef(null);
  const isInView = useInView(loaderRef);

  useEffect(() => {
    if (isInView && hasMore && !loadingMore) {
      setSize((prev) => prev + 1);
    }
  }, [isInView, hasMore, loadingMore]);

  return (
    <div>
      {!posts.length && !loadingMore && (
        <p className="text-center text-gray-500">Aucun post à afficher.</p>
      )}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} mutate={mutate} />
      ))}

      {loadingMore && (
        <p className="text-center text-sm text-gray-400">Chargement...</p>
      )}

      {!hasMore && !loadingMore && posts.length > 0 && (
        <p className="text-center text-gray-500">Plus de posts à afficher.</p>
      )}

      <div ref={loaderRef} className="h-10" />
    </div>
  );
}
