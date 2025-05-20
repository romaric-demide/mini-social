import PostList from "@/components/post-list";
import React from "react";

export default function Profile() {
  return (
    <div className="py-16">
      <PostList type="user" />
    </div>
  );
}
