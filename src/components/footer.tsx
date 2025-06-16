import Link from "next/link";
import { ThemeSwitch } from "./ThemeSwitch";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and copyright */}
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <Link href="/" className="font-semibold">
              Codoo
            </Link>
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved
            </span>
          </div>

          {/* Theme toggle and links */}
          <div className="w-full md:w-auto flex flex-col items-center md:flex-row md:items-center gap-6">
            {/* Theme toggle */}
            <div className="self-center md:self-auto">
              <ThemeSwitch />
            </div>

            {/* Navigation links */}
            <nav className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-3 md:flex gap-y-4 gap-x-6 md:gap-x-6 mt-4 md:mt-0 text-center md:text-left">
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground py-1"
              >
                About
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground py-1"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground py-1"
              >
                Terms
              </Link>
              <Link
                href="/changelog"
                className="text-sm text-muted-foreground hover:text-foreground py-1"
              >
                Changelog
              </Link>
              <Link
                href="/report-issue"
                className="text-sm text-muted-foreground hover:text-foreground py-1"
              >
                Report an Issue
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}