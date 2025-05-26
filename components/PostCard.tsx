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
  PlusIcon,
} from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { toggleHide } from "@/app/_actions/toggles";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import FollowButton from "./FollowButton";
import {
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
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

export default function PostCard({ post, mutate }: PostCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex text-sm">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex">
              <button className="font-semibold" onClick={() => setOpen(true)}>
                @dmd_dev
              </button>
              <div className="text-muted-foreground flex items-center">
                <DotIcon /> 4h
              </div>
            </div>
            <button>
              <EllipsisHorizontalIcon className="size-6" />
            </button>
          </div>

          <div>
            <div>
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
          </div>

          <div className="flex justify-between">
            <div className="flex">
              <LikeButton
                initialLiked={post.likes.length > 0}
                initialCount={post._count.likes}
                postId={post.id}
                mutate={mutate}
              />

              <Link href={"#"}>
                <ChatBubbleOvalLeftIcon className="size-6" />
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

          <div className="flex flex-col items-center text-sm">
            <Avatar className="size-28">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>@romaric</div>

            <div className="text-muted-foreground flex">
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

      {/* kllllllll */}
      <div className="flex space-x-2 px-4 font-[family-name:var(--font-geist-sans)] text-sm/normal tracking-wider">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex justify-between">
            <div className="bg-amber-5 flex">
              <button className="font-semibold">@dmd_dev</button>
              <div className="text-muted-foreground flex items-center">
                <DotIcon className="size-4" /> 5h
              </div>
            </div>

            <button className="bg-amber-4">
              <EllipsisHorizontalIcon className="size-6" />
            </button>
          </div>

          <div>
            <div className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              delectus eos quidem, excepturi aperiam facilis nulla nisi
              temporibus, mollitia libero totam non magni? Sunt beatae culpa
              nisi. Harum, quibusdam molestiae!
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
          </div>

          <div>dfff</div>
        </div>
      </div>

      <div className="flex space-x-1.5 border-b px-3 py-6">
        {/* <div>
          <div className="relative">
            <Avatar className="size-10" onClick={() => setOpen(true)}>
              <AvatarImage src={post.user.image || ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {post.user.followers.length === 0 && (
              <Button
                size={"icon"}
                className="border-background absolute right-0 bottom-0 size-4 border [&_svg:not([class*='size-'])]:size-3"
              >
                <PlusIcon />
              </Button>
            )}
          </div>
        </div> */}

        <div className="flex-1">
          {/* <div className="flex justify-between">
            <div className="flex">
              <button
                className="font-[family-name:var(--font-geist-sans)] font-semibold"
                onClick={() => setOpen(true)}
              >
                @{post.user.username}
              </button>
              <div className="text-muted-foreground flex items-center text-sm">
                <DotIcon className="size-5" /> 4h
              </div>
            </div>

            <Drawer>
              <DrawerTrigger asChild>
                <button>
                  <EllipsisIcon className="size-5" />
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerTitle />

                <div className="flex flex-col space-y-3 p-6">
                  <Button variant={"ghost"} className="text-base font-bold">
                    Edit
                  </Button>

                  <Button variant={"ghost"} className="text-base font-bold">
                    Delete
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-base font-bold"
                    onClick={() =>
                      startTransition(async () => {
                        await toggleHide(post.id);
                        setIsHidden(true);
                        mutate();
                      })
                    }
                  >
                    Hide
                  </Button>
                  <Button variant={"ghost"} className="text-base font-bold">
                    Copy link
                  </Button>
                </div>
              </DrawerContent>
            </Drawer>
          </div> */}

          <div>
            {/* <div className="font-sans text-sm/relaxed tracking-wide">
              {post.text}
            </div> */}

            {/* <div className="flex aspect-square flex-wrap overflow-hidden rounded-lg">
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
            </div> */}
          </div>

          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <LikeButton
                postId={post.id}
                initialLiked={post.likes.length > 0}
                initialCount={post._count.likes}
              />

              <button className="flex items-center space-x-1">
                <MessageCircleIcon className="size-5" /> {post._count.replies}
              </button>
            </div>

            <SaveButton postId={post.id} initialSaved={post.saves.length > 0} />
          </div>
        </div>

        {/* <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerTitle />

            <div className="space-y-3 p-6">
              <Avatar className="mx-auto size-30">
                <AvatarImage src={post.user.image || ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-center">
                <div className="font-bold">@{post.user.username}</div>
                <div className="text-muted-foreground flex items-center">
                  {post.user._count.followers} followers{" "}
                  <DotIcon className="size-5" /> {post.user._count.posts} posts
                </div>
              </div>

              <div className="flex space-x-2">
                <FollowButton
                  followingId={post.user.id}
                  initialFollowing={post.user.followers.length > 0}
                  label={
                    post.user.following.length > 0 ? "Follow back" : "Follow"
                  }
                />

                <Button variant={"secondary"} className="flex-1">
                  Profile <ChevronRightIcon />
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer> */}
      </div>
    </>
  );
}
