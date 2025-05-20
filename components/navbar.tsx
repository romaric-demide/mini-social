"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

import {
  BellIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import {
  BellIcon as BellIconSolid,
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";

const tabs = [
  { name: "For You", href: "/" },
  { name: "Following", href: "/posts/following" },
];

const navLinks = [
  { icon: [HomeIcon, HomeIconSolid], href: "/" },
  { icon: [MagnifyingGlassIcon, MagnifyingGlassIcon], href: "/search" },
  { icon: [PlusIcon, PlusIcon], href: "/posts/new" },
  { icon: [BellIcon, BellIconSolid], href: "/notifications" },
  { icon: [UserIcon, UserIconSolid], href: "/profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  const showTabs = ["/", "/posts/following"].includes(pathname);
  const showNavLinks = [
    "/",
    "/posts/following",
    "/search",
    "/notifications",
    "/profile",
  ].includes(pathname);

  return (
    <div>
      {showTabs && (
        <div className="space-y-3 p-3">
          <div className="text-center text-2xl font-extrabold">V12</div>
          <div className="space-x-1.5">
            {tabs.map(({ name, href }) => (
              <Link
                key={href}
                href={href}
                className={buttonVariants({
                  variant: pathname === href ? "default" : "secondary",
                  size: "sm",
                })}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {showNavLinks && (
        <div className="bg-background fixed inset-x-0 bottom-0 z-10 flex h-12 items-center border-t">
          {navLinks.map(({ icon: [OutlineIcon, SolidIcon], href }) => {
            const isActive = pathname === href;
            const Icon = isActive ? SolidIcon : OutlineIcon;

            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  buttonVariants({ variant: "secondary" }),
                  !isActive && "text-muted-foreground",
                  "flex-1",
                )}
              >
                <Icon className="size-6 stroke-2" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
