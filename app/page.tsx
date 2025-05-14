import PostCard from "@/components/post-card";
import Image from "next/image";
import { getPosts } from "./_actions/posts";

export default async function Home() {
  const posts = await getPosts("following", 1, 2);

  const fakePosts = [
    {
      id: "post1",
      text: "Premier post ! Heureux de rejoindre cette plateforme 😄",
      images: [],
      userId: "user1",
      user: {
        id: "user1",
        username: "dev_isa",
        image: "/avatars/user1.png",
        followers: [],
        following: [],
        _count: { followers: 5, posts: 4 },
      },
      likes: [],
      saves: [],
      _count: { likes: 0, replies: 0 },
      createdAt: new Date("2025-05-11T08:00:00Z"),
      updatedAt: new Date("2025-05-11T08:00:00Z"),
    },
    {
      id: "post2",
      text: "Avez-vous vu les nouveautés React 20 ? 🔥",
      images: ["react20-preview.png"],
      userId: "user2",
      user: {
        id: "user2",
        username: "react_wizard",
        image: "/avatars/user2.png",
        followers: [],
        following: [],
        _count: { followers: 20, posts: 10 },
      },
      likes: [{ userId: "cmamogpse0000320vbipz4051" }],
      saves: [],
      _count: { likes: 1, replies: 2 },
      createdAt: new Date("2025-05-10T10:30:00Z"),
      updatedAt: new Date("2025-05-10T10:30:00Z"),
    },
    {
      id: "post3",
      text: "Aujourd’hui j’ai déployé mon premier projet avec Vercel 🎉",
      images: [],
      userId: "user3",
      user: {
        id: "user3",
        username: "nina_dev",
        image: "/avatars/user3.png",
        followers: [],
        following: [],
        _count: { followers: 13, posts: 7 },
      },
      likes: [],
      saves: [],
      _count: { likes: 0, replies: 1 },
      createdAt: new Date("2025-05-12T13:45:00Z"),
      updatedAt: new Date("2025-05-12T13:45:00Z"),
    },
    {
      id: "post4",
      text: "Un petit guide des bonnes pratiques Prisma 🔧",
      images: ["prisma-tips.png"],
      userId: "user4",
      user: {
        id: "user4",
        username: "data_craft",
        image: "/avatars/user4.png",
        followers: [],
        following: [],
        _count: { followers: 8, posts: 3 },
      },
      likes: [],
      saves: [{ userId: "cmamogpse0000320vbipz4051" }],
      _count: { likes: 0, replies: 0 },
      createdAt: new Date("2025-05-09T16:20:00Z"),
      updatedAt: new Date("2025-05-09T16:20:00Z"),
    },
    {
      id: "post5",
      text: "Réponse à @dev_isa : totalement d’accord !",
      images: [],
      userId: "user5",
      parentId: "post1",
      user: {
        id: "user5",
        username: "code_sensei",
        image: "/avatars/user5.png",
        followers: [],
        following: [],
        _count: { followers: 2, posts: 1 },
      },
      likes: [],
      saves: [],
      _count: { likes: 0, replies: 0 },
      createdAt: new Date("2025-05-13T07:15:00Z"),
      updatedAt: new Date("2025-05-13T07:15:00Z"),
    },
    {
      id: "post6",
      text: "Je viens de publier une nouvelle vidéo sur Next.js !",
      images: ["video-thumbnail.png"],
      userId: "user6",
      user: {
        id: "user6",
        username: "vid_creator",
        image: "/avatars/user6.png",
        followers: [],
        following: [],
        _count: { followers: 44, posts: 18 },
      },
      likes: [],
      saves: [],
      _count: { likes: 0, replies: 3 },
      createdAt: new Date("2025-05-08T20:00:00Z"),
      updatedAt: new Date("2025-05-08T20:00:00Z"),
    },
    {
      id: "post7",
      text: "Quels IDE utilisez-vous ? Je cherche à changer...",
      images: [],
      userId: "user7",
      user: {
        id: "user7",
        username: "curious_cat",
        image: "/avatars/user7.png",
        followers: [],
        following: [],
        _count: { followers: 3, posts: 2 },
      },
      likes: [],
      saves: [],
      _count: { likes: 0, replies: 0 },
      createdAt: new Date("2025-05-11T19:50:00Z"),
      updatedAt: new Date("2025-05-11T19:50:00Z"),
    },
    {
      id: "post8",
      text: "Retour d’expérience sur Tailwind CSS après 1 mois",
      images: ["tailwind-review.png"],
      userId: "user8",
      user: {
        id: "user8",
        username: "css_magic",
        image: "/avatars/user8.png",
        followers: [],
        following: [],
        _count: { followers: 11, posts: 6 },
      },
      likes: [{ userId: "cmamogpse0000320vbipz4051" }],
      saves: [],
      _count: { likes: 1, replies: 1 },
      createdAt: new Date("2025-05-10T06:25:00Z"),
      updatedAt: new Date("2025-05-10T06:25:00Z"),
    },
    {
      id: "post9",
      text: "Je suis passé de PHP à TypeScript et je regrette pas 💥",
      images: [],
      userId: "user9",
      user: {
        id: "user9",
        username: "ts_convert",
        image: "/avatars/user9.png",
        followers: [],
        following: [],
        _count: { followers: 17, posts: 5 },
      },
      likes: [],
      saves: [],
      _count: { likes: 0, replies: 2 },
      createdAt: new Date("2025-05-07T12:10:00Z"),
      updatedAt: new Date("2025-05-07T12:10:00Z"),
    },
    {
      id: "post10",
      text: "Qui code encore en Java en 2025 ? 😅",
      images: [],
      userId: "user10",
      user: {
        id: "user10",
        username: "legacy_dev",
        image: "/avatars/user10.png",
        followers: [],
        following: [],
        _count: { followers: 9, posts: 4 },
      },
      likes: [],
      saves: [],
      _count: { likes: 0, replies: 4 },
      createdAt: new Date("2025-05-06T15:40:00Z"),
      updatedAt: new Date("2025-05-06T15:40:00Z"),
    },
  ];

  if (posts) {
    return (
      <div>
        {fakePosts.map((post) => (
          <div key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-sm/6 sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="rounded bg-black/[.05] px-1 py-0.5 font-[family-name:var(--font-geist-mono)] font-semibold dark:bg-white/[.06]">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm font-medium transition-colors hover:bg-[#383838] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="flex h-10 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm font-medium transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:w-auto sm:px-5 sm:text-base md:w-[158px] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
