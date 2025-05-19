"use client";

import { toggleFollow } from "@/app/_actions/toggles";
import { useState, useTransition } from "react";

interface FollowButtonProps {
  initialFollowing: boolean;
  label: string;
  followingId: string;
}

export function FollowButton({
  initialFollowing,
  label,
  followingId,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await toggleFollow(followingId);
          setIsFollowing(!isFollowing);
        })
      }
      className={`rounded px-4 py-2 font-semibold ${
        isFollowing ? "bg-gray-300 text-black" : "bg-blue-600 text-white"
      }`}
    >
      {isFollowing ? "Unfollow" : label}
    </button>
  );
}
