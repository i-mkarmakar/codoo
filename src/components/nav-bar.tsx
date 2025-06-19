import Link from "next/link";
import { NavLink } from "./nav-link";

export const navMenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
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
          <div className="flex w-full flex-col gap-2">
            <h1>Codoo</h1>
          </div>
        </Link>

        <div className="relative flex items-center justify-end md:col-span-10">
          <ul className="hidden w-max shrink-0 items-center divide-x md:flex">
            {navMenu.map((menu) => (
              <NavLink key={menu.name} href={menu.path}>
                {menu.name}
              </NavLink>
            ))}
            <NavLink href="/auth">Get Started</NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
};
