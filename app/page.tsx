import LikeButton from "@/components/like-button";
import PostCard from "@/components/post-card";
import PostForm from "@/components/post-form";
import PostList from "@/components/post-list";
import prisma from "@/lib/prisma";
import { text } from "stream/consumers";
// import prisma from "@/lib/prisma";

export default async function Home() {
  const userId = "cma1qsj4500007p0vnvw4huxk";

  const post = await prisma.post.findMany({
    where: {
      interactions: {
        none: { userId, type: "HIDE" },
      },
    },

    include: {
      _count: {
        select: {
          interactions: {
            where: { type: "LIKE" },
          },
        },
      },

      interactions: {
        where: { userId },
        select: { type: true },
      },
    },
  });

  // const post = {
  //   id: "cma2i03vw000d2l0wdcf5c8h4",
  //   text: "ytruyturtetryt",
  //   images: [
  //     // "https://example.com/image1.jpg",
  //     // "https://example.com/image2.jpg",
  //   ],
  // };

  return (
    <div>
      {JSON.stringify(post)}
      {/* {post.map((user) => (
        <div
          key={user.id}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.id}</p>
          <p className="text-gray-600">{user.createdAt.toString()}</p>
        </div>
      ))} */}

      {/* <PostList type="gocho" />/ */}
      {/* <PostForm post={post} /> */}

      <LikeButton />

      <div className="mx-auto flex max-w-lg flex-col divide-y">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            <PostCard post={{ dmd: "fllflf" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
