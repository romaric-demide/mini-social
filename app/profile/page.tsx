import PostList from "@/components/PostList";
import React from "react";

export default function Profile() {
  return (
    <div className="py-16">
      <PostList type="user" />
    </div>
  );
}
