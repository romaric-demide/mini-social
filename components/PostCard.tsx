"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  ChevronRightIcon,
  DotIcon,
  EllipsisIcon,
  MessageCircleIcon,
} from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { Button, buttonVariants } from "./ui/button";
import { toggleAction } from "@/app/_actions/toggles";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import FollowButton from "./FollowButton";
import {
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

type PostCardProps = {
  post: {
    id: string;
    text: string;
    images: string[];
    userId: string;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: {
      id: string;
      username: string;
      image: string | null;
      followers: { followerId: string }[];
      following: { followingId: string }[];
      _count: {
        followers: number;
        posts: number;
      };
    };
    likes: { userId: string }[];
    saves: { userId: string }[];
    _count: {
      likes: number;
      replies: number;
    };
  };
  mutate?: () => void;
};

// font-[family-name:var(--font-geist-sans)]

export default function PostCard({ post, mutate }: PostCardProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <div className="flex items-start space-x-1.5 px-3.5 py-7 text-[15px]">
        <div className="relative">
          <Avatar className="size-10" onClick={() => setOpen(true)}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button
            size={"icon"}
            className="border-background absolute right-0 bottom-0 size-3.5 border"
          >
            <PlusIcon className="size-3 stroke-2" />
          </Button>
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex items-center">
              <button className="font-semibold" onClick={() => setOpen(true)}>
                @dmd_dev
              </button>
              <div className="text-muted-foreground flex items-center">
                <DotIcon className="size-4" /> 4h
              </div>
            </div>

            <Drawer>
              <DrawerTrigger asChild>
                <button>
                  <EllipsisHorizontalIcon className="size-6" />
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerTitle />

                <div className="flex flex-col space-y-1.5 p-3.5">
                  <Link
                    href={`/posts/${post.id}/edit`}
                    className={buttonVariants({
                      variant: "ghost",
                      size: "lg",
                    })}
                  >
                    Edit
                  </Link>

                  <Button variant="ghost" size="lg">
                    Delete
                  </Button>

                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() =>
                      startTransition(async () => {
                        await toggleAction("hide", post.id);
                        if (mutate) mutate();
                      })
                    }
                  >
                    Hide
                  </Button>

                  <Button variant="ghost" size="lg">
                    Copy link
                  </Button>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          <Link href={`/posts/${post.id}`}>
            <div className="line-clamp-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              praesentium, molestias quibusdam dolorum laborum alias. Sapiente,
              ab praesentium eligendi tenetur quia harum aspernatur suscipit.
              Tempora aperiam dolorum rerum quia dignissimos.
            </div>

            <div className="flex aspect-square flex-wrap overflow-hidden rounded-lg">
              {post.images.map((img, i) => (
                <div
                  key={i}
                  className="border-background relative aspect-square flex-1 basis-1/2 border"
                >
                  <Image
                    src={img}
                    alt="Next.js logo"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Link>

          <div className="flex justify-between">
            <div className="flex">
              <LikeButton
                initialLiked={post.likes.length > 0}
                initialCount={post._count.likes}
                postId={post.id}
                mutate={mutate}
              />

              <Link href={`/posts/${post.id}`}>
                <ChatBubbleOvalLeftIcon className="size-6" />{" "}
                {post._count.replies}
              </Link>
            </div>

            <SaveButton
              initialSaved={post.saves.length > 0}
              postId={post.id}
              mutate={mutate}
            />
          </div>
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerTitle />

          <div className="flex flex-col items-center p-3.5 text-sm">
            <Avatar className="size-28">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="pt-1.5">@romaric</div>

            <div className="text-muted-foreground flex pb-3.5">
              15 followers <DotIcon /> 12 posts
            </div>

            <div>
              <FollowButton
                initialFollowing={post.user.followers.length > 0}
                followingId={post.user.id}
                label={
                  post.user.following.length > 0 ? "Follow Back" : "Follow"
                }
                mutate={mutate}
              />

              <Button>Profile</Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
