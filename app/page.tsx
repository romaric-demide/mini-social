// import LikeButton from "@/components/like-button";
import Navbar from "@/components/navbar";
import PostCard from "@/components/post-card";
import PostList from "@/components/post-list";
import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/lib/auth";
import prisma from "@/lib/prisma";
// import prisma from "@/lib/prisma";

export default async function Home() {
  const session = await auth();

  async function getPosts(page: number) {
    "use server";
    const PAGE_SIZE = 7;
    const offset = (page - 1) * PAGE_SIZE;

    const posts = await prisma.post.findMany({
      skip: offset,
      take: PAGE_SIZE,
      include: { user: true },
    });

    return posts;
  }

  if (session?.user?.id) {
    return JSON.stringify(session.user.username);
  }

  return (
    <div>
      {/* <Navbar /> */}
      <PostList getPosts={getPosts} />
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
