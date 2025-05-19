"use client";

import { toggleBlock } from "@/app/_actions/toggles";
import { useState, useTransition } from "react";

interface BlockButtonProps {
  initialBlocked: boolean;
  blockedId: string;
}

export function BlockButton({ initialBlocked, blockedId }: BlockButtonProps) {
  const [isBlocked, setIsBlocked] = useState(initialBlocked);
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await toggleBlock(blockedId);
          setIsBlocked(!isBlocked);
        })
      }
      className={`rounded px-4 py-2 font-semibold ${
        isBlocked ? "bg-red-500 text-white" : "bg-gray-300 text-black"
      }`}
    >
      {isBlocked ? "Unblock" : "Block"}
    </button>
  );
}
