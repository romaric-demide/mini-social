import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import {
  BookmarkIcon,
  DotIcon,
  EllipsisIcon,
  HeartIcon,
  MessageCircleIcon,
  PlusIcon,
} from "lucide-react";
import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function PostCard({ post }: { post: any }) {
  return (
    <div className="flex space-x-2 py-10">
      <div>
        <HoverCard>
          <HoverCardTrigger>
            <div className="relative">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button
                size={"icon"}
                className="border-background absolute right-0 bottom-0 size-4 border [&_svg:not([class*='size-'])]:size-3"
              >
                <PlusIcon />
              </Button>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            The React Framework – created and maintained by @vercel.
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div>Milton Freddy Chavez</div>
            <div className="text-muted-foreground flex items-center">
              <DotIcon />
              <div>15.Mai.2025</div>
            </div>
          </div>

          <div>
            <div className="md:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant={"outline"} className="h-auto p-0">
                    <EllipsisIcon />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerTitle />
                  <div className="flex flex-col space-y-2 p-4">
                    <Button variant={"outline"} size={"sm"}>
                      Edit
                    </Button>
                    <Button variant={"outline"} size={"sm"}>
                      Delete
                    </Button>

                    <Button variant={"outline"} size={"sm"}>
                      Share
                    </Button>
                    <Button variant={"outline"} size={"sm"}>
                      Copy Link
                    </Button>
                    <Button variant={"outline"} size={"sm"}>
                      Save
                    </Button>
                    <Button variant={"outline"} size={"sm"}>
                      Unfollow
                    </Button>
                    <Button variant={"outline"} size={"sm"}>
                      Block
                    </Button>
                    <Button variant={"outline"} size={"sm"}>
                      Mute
                    </Button>
                    <Button variant={"outline"} size={"sm"}>
                      Report
                    </Button>
                  </div>{" "}
                </DrawerContent>
              </Drawer>
            </div>

            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"} className="h-auto p-0">
                    <EllipsisIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            nisi quasi assumenda quibusdam molestiae id quod voluptatibus
            officiis eveniet itaque tenetur, ducimus minus saepe molestias eaque
            deserunt error sed explicabo.
          </div>

          <div className="flex aspect-square flex-wrap overflow-hidden rounded-lg">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="relative aspect-square flex-1 basis-1/2 border border-transparent"
              >
                <Image
                  src={"/MainBefore.jpg"}
                  alt="dldl"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <div className="space-x-2">
            <Button variant={"outline"} size={"sm"}>
              <HeartIcon /> 125k
            </Button>
            <Button variant={"outline"} size={"sm"}>
              <MessageCircleIcon /> 125k
            </Button>
          </div>

          <Button variant={"outline"} size={"sm"}>
            <BookmarkIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
