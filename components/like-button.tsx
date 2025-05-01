"use client";

import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { HeartIcon } from "lucide-react";
import clsx from "clsx";
import { toggleLike } from "@/lib/actions/like";

export default function LikeButton({
  postId,
  initialLiked,
  initialLikes,
}: {
  postId?: string;
  initialLiked?: boolean;
  initialLikes?: number;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes || 0);
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant={"outline"}
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await toggleLike("cma2i03vw000d2l0wdcf5c8h4");
          setLiked((prev) => !prev);
          setLikes((prev) => prev + (liked ? -1 : 1));
        })
      }
      className={clsx(
        liked &&
          "text-red-500 hover:text-red-500 [&_svg:not([class*='size-'])]:fill-red-500 hover:[&_svg:not([class*='size-'])]:fill-red-500",
      )}
    >
      <HeartIcon /> {likes > 0 && likes}
    </Button>
  );
}
