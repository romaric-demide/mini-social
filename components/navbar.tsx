import React from "react";
import { Button } from "./ui/button";
import {
  ArrowLeftIcon,
  BellIcon,
  EllipsisVerticalIcon,
  HomeIcon,
  PlusIcon,
  PlusSquareIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";

export default function Navbar() {
  return (
    <>
      <div className="py-2 text-center text-4xl font-bold">v12</div>

      {/* <div className="bg-background/50 fixed inset-x-0 top-0 z-10 flex h-12 items-center justify-between px-4 backdrop-blur-3xl">
        <div className="text-lg font-bold">V12</div>
        <div className="space-x-2">
          <Button variant={"ghost"}>
            <PlusSquareIcon />
          </Button>

          <Button variant={"ghost"}>
            <UserIcon />
          </Button>

          <Button variant={"ghost"}>
            <SearchIcon />
          </Button>
        </div>
      </div> */}

      <div className="bg-background/50 fixed inset-x-0 top-0 flex h-12 items-center justify-between px-4 backdrop-blur-3xl">
        <div className="flex space-x-2 font-bold">
          {/* <ArrowLeftIcon /> */}
          <span>@freddy.Chavez</span>
        </div>
        <div>
          <Button variant={"ghost"} size={"icon"}>
            <EllipsisVerticalIcon />
          </Button>
        </div>
      </div>

      <div className="bg-background fixed inset-x-0 bottom-0 z-10 flex h-12 items-center border-t px-4">
        <Button variant={"ghost"} size={"icon"} className="flex-1">
          <HomeIcon />
        </Button>

        <Button variant={"ghost"} size={"icon"} className="flex-1">
          <SearchIcon />
        </Button>

        <Button variant={"ghost"} size={"icon"} className="flex-1">
          <PlusSquareIcon />
        </Button>

        <Button variant={"ghost"} size={"icon"} className="flex-1">
          <BellIcon />
        </Button>

        <Button variant={"ghost"} size={"icon"} className="flex-1">
          <UserIcon />
        </Button>
      </div>
    </>
  );
}
