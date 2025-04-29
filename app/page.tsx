import PostForm from "@/components/post-form";
import { text } from "stream/consumers";
// import prisma from "@/lib/prisma";

export default async function Home() {
  // const post = await prisma.user.findMany();

  const post = {
    id: "cma2i03vw000d2l0wdcf5c8h4",
    text: "ytruyturtetryt",
    images: [
      // "https://example.com/image1.jpg",
      // "https://example.com/image2.jpg",
    ],
  };
  return (
    <div>
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

      <PostForm post={post} />
    </div>
  );
}
