"use client";

import {
  BellIcon,
  HomeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  BellIcon as BellIconSolid,
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import clsx from "clsx";
import {
  PlusSquareIcon,
  SearchIcon,
  UserRoundIcon,
  UsersIcon,
} from "lucide-react";

const tabs = [
  { href: "/", label: "For you" },
  { href: "/posts/following", label: "Following" },
];

const navLinks = [
  { href: "/", icon: [<HomeIcon />, <HomeIconSolid />] },
  { href: "/search", icon: [<MagnifyingGlassIcon />, <MagnifyingGlassIcon />] },
  { href: "/posts/create", icon: [<PlusIcon />, <PlusIcon />] },
  { href: "/notifications", icon: [<BellIcon />, <BellIconSolid />] },
  { href: "/profile", icon: [<UserIcon />, <UserIconSolid />] },
];

export default function Navbar() {
  const pathname = usePathname();

  const showTabs = tabs.some(({ href }) => href === pathname);
  const showNavLinks = ["/", "/search", "/notifications", "/profile"].includes(
    pathname,
  );

  return (
    <div>
      {showTabs && (
        <div>
          <div>V12</div>
          <div>
            {tabs.map(({ href, label }) => (
              <Button
                key={href}
                size="sm"
                variant={pathname === href ? "default" : "outline"}
                asChild
              >
                <Link href={href}>{label}</Link>
              </Button>
            ))}
          </div>
        </div>
      )}

      {showNavLinks && (
        <nav className="bg-background fixed inset-x-0 bottom-0 z-10 flex h-12 items-center">
          {navLinks.map(({ href, icon }) => (
            <Button key={href} variant="ghost" className="flex-1/2" asChild>
              <Link href={href}>{pathname === href ? icon[1] : icon[0]}</Link>
            </Button>
          ))}
        </nav>
      )}
    </div>
  );
}
