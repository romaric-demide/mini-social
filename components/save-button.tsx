"use client";

import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { BookmarkIcon } from "lucide-react";
import clsx from "clsx";
import { toggleInteraction } from "@/lib/actions/like";
// import { toggleSave } from "@/lib/actions/save";

export default function SaveButton({
  postId,
  initialSaved,
}: {
  postId?: string;
  initialSaved?: boolean;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await toggleInteraction("SAVE", "cma2i03vw000d2l0wdcf5c8h4");
          setSaved((prev) => !prev);
        })
      }
      className={clsx(
        saved &&
          "text-blue-500 hover:text-blue-500 [&_svg:not([class*='size-'])]:fill-blue-500 hover:[&_svg:not([class*='size-'])]:fill-blue-500",
      )}
    >
      <BookmarkIcon className="mr-2" />
    </Button>
  );
}
