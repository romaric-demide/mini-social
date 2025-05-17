"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  ChevronRightIcon,
  DotIcon,
  EllipsisIcon,
  MessageCircleIcon,
  PlusIcon
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { LikeButton } from "./like-button";
import { SaveButton } from "./save-button";
import { Button } from "./ui/button";

type PostCardProps = {
  post: {
    id: string;
    text: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      username: string;
      image: string;
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
};

// const userId = "cmaocjf4k00001b0x89hhjowo";

export default function PostCard({ post }: PostCardProps) {
  const [open, setOpen] = useState(false);

  const isFollowing = post.user.followers.length > 0;
  const isFollower = post.user.following.length > 0;

  return (
    <div className="flex space-x-1.5 px-3 py-6">
      <div>
        <div className="relative">
          <Avatar className="size-10" onClick={() => setOpen(true)}>
            <AvatarImage src={post.user.image} />
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
      </div>

      <div className="flex-1">
        <div className="flex justify-between">
          <div className="flex">
            <button className="font-bold" onClick={() => setOpen(true)}>
              @{post.user.username}
            </button>
            <div className="text-muted-foreground flex items-center">
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
                <Button variant={"ghost"} className="text-base font-bold">
                  Hide
                </Button>
                <Button variant={"ghost"} className="text-base font-bold">
                  Copy link
                </Button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <div>
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius
            obcaecati fuga perferendis consequuntur excepturi reiciendis debitis
            illum nemo deserunt officia quasi voluptate, eveniet nulla. Cum
            deleniti repellat voluptas libero nisi.
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

      {/* Mobile Drawer */}
      <Drawer open={open} onOpenChange={setOpen}>
        {/* <DrawerTrigger>Open</DrawerTrigger> */}
        <DrawerContent>
          <DrawerTitle />

          <div className="space-y-3 p-6">
            <Avatar className="mx-auto size-30">
              <AvatarImage src={post.user.image} />
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
              {!isFollowing && !isFollower && (
                <Button className="flex-1">Follow</Button>
              )}

              {!isFollowing && isFollower && (
                <Button className="flex-1">Follow Back</Button>
              )}

              {isFollowing && !isFollower && (
                <Button className="flex-1">Unfollow</Button>
              )}

              {isFollowing && isFollower && (
                <Button className="flex-1">Mutual</Button>
              )}

              <Button variant={"secondary"} className="flex-1">
                Profile <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
