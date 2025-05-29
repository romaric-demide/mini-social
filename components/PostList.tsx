"use client";

import { getPosts } from "@/app/_actions/posts";
import { useInView } from "motion/react";
import { useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";
import PostCard from "./PostCard";

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
  const { data, size, setSize, isLoading, mutate } = useSWRInfinite(
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
  }, [isInView, hasMore, loadingMore, setSize]);

  return (
    <div>
      {!posts.length && !loadingMore && <div>No posts found.</div>}

      <div className="divide-y">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} mutate={mutate} />
        ))}
      </div>

      {loadingMore && <div>Loading...</div>}

      {!hasMore && !loadingMore && posts.length > 0 && (
        <div>No more posts.</div>
      )}

      <div ref={loaderRef} />
    </div>
  );
}
