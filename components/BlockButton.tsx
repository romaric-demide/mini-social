"use client";

import { useState, useTransition } from "react";
import { toggleBlock } from "@/app/_actions/toggles";
import { Button } from "@/components/ui/button";

type BlockButtonProps = {
  initialBlocked: boolean;
  blockedId: string;
  mutate?: () => void;
};

export default function BlockButton({
  initialBlocked,
  blockedId,
  mutate,
}: BlockButtonProps) {
  const [isBlocked, setIsBlocked] = useState(initialBlocked);
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      size="sm"
      variant="ghost"
      className="px-2"
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          toggleBlock(blockedId);
          setIsBlocked((prev) => !prev);
          if (mutate) mutate();
        })
      }
    >
      {isBlocked ? "Unblock" : "Block"}
    </Button>
  );
}
