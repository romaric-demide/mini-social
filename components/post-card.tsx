"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerContent,
  DrawerTitle
} from "@/components/ui/drawer";
import { DotIcon, EllipsisIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type PostCardProps = {
  id: string;
  text: string;
  images: string[];
  userId: string;
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
  createdAt: Date;
  updatedAt: Date;
};

export default function PostCard({ post }: { post: PostCardProps }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex space-x-2 px-4">
      <Avatar onClick={() => setOpen(true)}>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex">
            <button className="font-bold" onClick={() => setOpen(true)}>
              @{post.user.username}
            </button>

            <div className="text-muted-foreground flex items-center">
              <DotIcon className="size-5" /> 4h
            </div>
          </div>

          <button className="bg-amber-300">
            <EllipsisIcon className="size-5" />
          </button>
        </div>

        <div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est natus
            eum culpa sunt distinctio vitae nihil, nisi sit illo molestiae
            maiores officiis, neque a dicta in rem repellat exercitationem
            explicabo.
          </div>

          <div className="flex aspect-square flex-wrap overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative aspect-square flex-1 basis-1/2">
                <Image
                  src="https://sje25hcba2nnaaxl.public.blob.vercel-storage.com/MainBefore-SAA8uV3odbMA23hsfDPNTPXrF3F0Qv.jpg"
                  alt="Next.js logo"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>footer</div>
      </div>

      {/* drawer */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerTitle className="sr-only" />

          <div>Contenu</div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
