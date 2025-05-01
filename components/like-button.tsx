"use client";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(-1);
  return (
    <div>
      <div>Jesus</div>

      <Button onClick={() => setLiked(!liked)}>
        {liked ? <ThumbsUp /> : <ThumbsDown />} {likes > 0 && likes}
      </Button>
    </div>
  );
}
