"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleLike } from "@/app/_actions/toggles";

interface LikeButtonProps {
  postId: string;
  initialLiked: boolean;
  initialCount: number;
}

export function LikeButton({
  postId,
  initialLiked,
  initialCount,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      disabled={isPending}
      className="flex items-center space-x-2"
      onClick={() =>
        startTransition(async () => {
          await toggleLike(postId);
          setLiked((prev) => !prev);
          setCount((prev) => prev + (liked ? -1 : 1));
        })
      }
    >
      <Heart
        className={`h-5 w-5 transition ${
          liked ? "fill-red-500 text-red-500" : "text-gray-500"
        }`}
      />
      <span>{count}</span>
    </Button>
  );
}
