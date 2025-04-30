"use client";

import { useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";
import { useSWRConfig } from "swr";
import { getPosts } from "@/lib/actions/posts";
import { useInView } from "motion/react";

const PAGE_SIZE = 7;

export default function PostList({ type }: { type: string }) {
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index) => ["posts", type, index + 1],
    ([, type, index]) => getPosts(type, index),
  );

  const ref = useRef(null);
  const isInView = useInView(ref);

  const posts = data?.flat() || [];
  const isReachingEnd = !data?.[0]?.length || data[data.length - 1]?.length < PAGE_SIZE;
  const isLoadingMore = isLoading || typeof data?.[size - 1] === "undefined";

  const { cache } = useSWRConfig();
  console.log("cache", cache);

  useEffect(() => {
    if (isInView && !isLoadingMore && !isReachingEnd) {
      setSize((prev) => prev + 1);
    }
  }, [isInView]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="my-2 h-50 rounded border bg-red-600 p-2">
          <div>{post.text}</div>
        </div>
      ))}

      {isLoadingMore && <div className="h-10">Loading...</div>}

      {isReachingEnd && !isLoadingMore && (
        <div className="h-10">No more posts</div>
      )}

      <div ref={ref} className="h-10 bg-amber-600" />
    </div>
  );
}
