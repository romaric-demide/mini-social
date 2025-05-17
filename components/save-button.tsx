"use client";

import { useState, useTransition } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleSave } from "@/app/_actions/toggles";

interface SaveButtonProps {
  postId: string;
  initialSaved: boolean;
}

export function SaveButton({ postId, initialSaved }: SaveButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      disabled={isPending}
      className="flex items-center space-x-2"
      onClick={() =>
        startTransition(async () => {
          await toggleSave(postId);
          setSaved((prev) => !prev);
        })
      }
    >
      <Bookmark
        className={`h-5 w-5 transition ${
          saved ? "fill-blue-600 text-blue-600" : "text-gray-500"
        }`}
      />
      <span>{saved ? "Saved" : "Save"}</span>
    </Button>
  );
}
