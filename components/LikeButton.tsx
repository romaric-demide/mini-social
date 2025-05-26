"use client";

import { useState, useTransition } from "react";
import { toggleAction } from "@/app/_actions/toggles";
import { Button } from "@/components/ui/button";

type LikeButtonProps = {
  initialLiked: boolean;
  initialCount: number;
  postId: string;
  mutate?: () => void;
};

export default function LikeButton({
  initialLiked,
  initialCount,
  postId,
  mutate,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      size="sm"
      variant="ghost"
      className="px-2"
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          toggleAction("like", postId);
          setIsLiked((prev) => {
            setLikeCount((count) => count + (prev ? -1 : 1));
            return !prev;
          });
          if (mutate) mutate();
        })
      }
    >
      {isLiked ? "💖" : "🤍"} {likeCount}
    </Button>
  );
}
