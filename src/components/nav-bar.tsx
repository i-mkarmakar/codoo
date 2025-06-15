import Link from "next/link";
import { NavLink } from "./nav-link";
import { Github, Star } from "lucide-react";

export const navMenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "#",
  },
];

export const Navbar = () => {
  return (
    <div className="bg-background sticky top-0 z-30 flex flex-col backdrop-blur-md">
      <nav className="top-0 flex grid-cols-12 items-center justify-between md:grid md:border-b">
        <Link
          href="/"
          className="text-foreground shrink-0 px-2.5 py-4 transition-colors md:col-span-2 md:w-[268px] md:border-r md:px-5 lg:w-[286px]"
        >
          <div className="flex w-full flex-col gap-2">{/* Logo here */}</div>
        </Link>

        <div className="relative flex items-center justify-end md:col-span-10">
          <ul className="hidden w-max shrink-0 items-center divide-x md:flex">
            {navMenu.map((menu) => (
              <NavLink key={menu.name} href={menu.path}>
                {menu.name}
              </NavLink>
            ))}
            <li className="pr-2 pl-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-br from-white/5 via-white/10 to-white/5 px-4 py-1.5 text-sm font-medium text-white shadow-sm backdrop-blur-sm transition-all hover:border-white/30"
              >
                <Github className="h-4 w-4" />
                <span>Star on GitHub</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-white">
                  <Star className="h-3.5 w-3.5" />
                  17
                </span>
              </a>
            </li>
            <NavLink href="/sign-in">Get Started</NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
};
