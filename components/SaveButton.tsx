"use client";

import { useState, useTransition } from "react";
import { toggleAction } from "@/app/_actions/toggles";
import { Button } from "@/components/ui/button";

type SaveButtonProps = {
  initialSaved: boolean;
  postId: string;
  mutate?: () => void;
};

export default function SaveButton({
  initialSaved,
  postId,
  mutate,
}: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      size="sm"
      variant="ghost"
      className="px-2"
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          toggleAction("save", postId);
          setIsSaved((prev) => !prev);
          if (mutate) mutate();
        })
      }
    >
      {isSaved ? "💾" : "📁"}
    </Button>
  );
}
