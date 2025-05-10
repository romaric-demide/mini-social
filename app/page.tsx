// import LikeButton from "@/components/like-button";
import Navbar from "@/components/navbar";
import PostCard from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/lib/auth";
// import prisma from "@/lib/prisma";

export default async function Home() {
  const session = await auth()
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

  if (session?.user?.id) {
    return JSON.stringify(session.user)
  }

  return (
    <div>
      {/* <Navbar /> */}

      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <Button type="submit">Signin with Google</Button>
      </form>
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
