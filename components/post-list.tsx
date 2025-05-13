"use client"; 
import { useEffect, useRef } from "react"; 
import useSWRInfinite from "swr/infinite"; 
import { useInView } from "motion/react"; 
import { getPosts } from "@/app/_actions/posts"; 

type PostListProps = { 
  type: PostType; 
  userId?: string; 
  pageSize?: number; 
}; 

export default function PostList({ 
  type, 
  userId, 
  pageSize = 2 
}: PostListProps) { 
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index) => [type, index + 1, userId], 
    ([, page]) => getPosts(type, page, pageSize, userId)
  ); 

  const posts = data?.flat() || []; 
  const isReachingEnd = !data?.[0]?.length || data[data.length - 1]?.length < pageSize; 
  const isLoadingMore = isLoading || !data?.[size - 1]; 

  const ref = useRef(null); 
  const isInView = useInView(ref); 

  useEffect(() => { 
    if (isInView && !isLoadingMore && !isReachingEnd) { 
      setSize((prev) => prev + 1); 
    } 
  }, [isInView, isLoadingMore, isReachingEnd, setSize]); 

  return (
    <div>
      {posts.length === 0 && !isLoading && (
        <div className="text-center text-gray-500">Aucun post à afficher.</div>
      )}

      {posts.map((post) => (
        <div key={post.id} className="my-2 rounded border bg-red-600 p-2">
          <div>{post.text}</div>
        </div>
      ))}

      {isLoadingMore && <div>Chargement...</div>}

      {isReachingEnd && !isLoadingMore && posts.length > 0 && (
        <div className="text-center text-gray-500">Plus de posts à afficher.</div>
      )}

      <div ref={ref} className="h-10 bg-amber-600" />
    </div>
  );
}
