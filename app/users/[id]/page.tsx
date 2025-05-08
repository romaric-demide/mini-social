import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, ImageIcon, ListIcon, UserIcon } from "lucide-react";
import PostCard from "@/components/post-card";
import Navbar from "@/components/navbar";

const UserProfilePage = () => {
  return (
    <div className="pt-20">
      <div className="flex flex-col items-center justify-center space-y-2 px-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="font-bold">Milton Freddy Chavez</div>

        <div className="text-center text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dicta
          alias excepturi deserunt animi.
        </div>

        <div className="flex space-x-2 pt-2">
          <Button variant={"ghost"} className="flex flex-col">
            <span className="font-bold">560k</span>
            <div className="text-muted-foreground">Followers</div>
          </Button>
          <Button variant={"ghost"} className="flex flex-col">
            <span className="font-bold">53k</span>
            <div className="text-muted-foreground">Following</div>
          </Button>
          <Button variant={"ghost"} className="flex flex-col">
            <span className="font-bold">735k</span>{" "}
            <div className="text-muted-foreground">Posts </div>
          </Button>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button variant={"secondary"}>Edit Profile</Button>
          <Button variant={"outline"} size={"icon"}>
            <UserIcon />
          </Button>
        </div>
      </div>

      <div className="border-b pt-4">
        <div className="px-4">
          <Button variant={"ghost"} className="flex-1 rounded-none border-b-4">
            <ListIcon />
          </Button>
          <Button variant={"ghost"} className="flex-1">
            <BookmarkIcon />
          </Button>
          <Button variant={"ghost"} className="flex-1">
            <ImageIcon />
          </Button>
        </div>
      </div>

      <div className="px-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index}>
            <PostCard />
          </div>
        ))}
      </div>

      <Navbar />
    </div>
  );
};

export default UserProfilePage;
