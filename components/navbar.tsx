"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Home, Search, Bell, User, Plus } from "lucide-react";

const tabs = [
  { name: "For You", href: "/" },
  { name: "Following", href: "/posts/following" },
];

const navLinks = [
  { icon: Home, href: "/" },
  { icon: Search, href: "/search" },
  { icon: Plus, href: "/posts/new" },
  { icon: Bell, href: "/notifications" },
  { icon: User, href: "/profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  const showTabs = ["/", "/posts/following"].includes(pathname);

  return (
    <div>
      {showTabs && (
        <div className="flex space-x-2">
          {tabs.map(({ name, href }) => (
            <Button
              key={href}
              size="sm"
              variant={pathname === href ? "default" : "secondary"}
              asChild
            >
              <Link href={href}>{name}</Link>
            </Button>
          ))}
        </div>
      )}

      <div className="flex space-x-4">
        {navLinks.map(({ icon: Icon, href }) => (
          <Link href={href} key={href}>
            <Icon
              className={`h-5 w-5 ${
                pathname === href ? "text-black" : "text-gray-400"
              }`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
