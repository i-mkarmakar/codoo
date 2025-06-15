"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export const NavLink = ({ href, children, className, external }: Props) => {
  const segment = useSelectedLayoutSegment();
  const isActive =
    segment === href.slice(1) || (segment === null && href === "/");

  return (
    <li className={cn("group relative", className)}>
      <Link
        href={href}
        className={cn(
          "block h-full w-full px-5 py-4 transition-colors",
          "group-hover:text-foreground",
          isActive ? "text-foreground" : "text-muted-foreground",
        )}
        target={external ? "_blank" : "_parent"}
      >
        {children}
      </Link>
      <div
        className={cn(
          "bg-muted-foreground absolute bottom-0 h-0.5 opacity-0 transition-all duration-500",
          "group-hover:w-full group-hover:opacity-100",
          isActive ? "w-full opacity-100" : "w-0",
        )}
      />
    </li>
  );
};
