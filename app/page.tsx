import LikeButton from "@/components/like-button";
import Navbar from "@/components/navbar";
import PostCard from "@/components/post-card";
import prisma from "@/lib/prisma";

export default async function Home() {
  // const post = await prisma.post.findMany({
  //   where: {
  //     interactions: {
  //       none: { userId, type: "HIDE" },
  //     },
  //   },

  //   include: {
  //     _count: {
  //       select: {
  //         interactions: {
  //           where: { type: "LIKE" },
  //         },
  //       },
  //     },

  //     interactions: {
  //       where: { userId },
  //       select: { type: true },
  //     },
  //   },
  // });

  return (
    <div>
      <Navbar />
      {/* {JSON.stringify(post)} */}

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
