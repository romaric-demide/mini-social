"use client";

import { useState, useTransition } from "react";
import { toggleFollow } from "@/app/_actions/toggles";
import { Button } from "@/components/ui/button";

type FollowButtonProps = {
  initialFollowing: boolean;
  followingId: string;
  label: string;
  mutate?: () => void;
};

export default function FollowButton({
  initialFollowing,
  followingId,
  label,
  mutate,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      size="sm"
      variant="ghost"
      className="px-2"
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          toggleFollow(followingId);
          setIsFollowing((prev) => !prev);
          if (mutate) mutate();
        })
      }
    >
      {isFollowing ? "Unfollow" : label}
    </Button>
  );
}
