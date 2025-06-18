import Section from "@/components/section";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Link from "next/link";
import Footer from "@/components/footer";
import { Navbar } from "@/components/nav-bar";

async function getGitHubStars() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/better-auth/better-auth",
      {
        next: {
          revalidate: 60,
        },
      },
    );
    if (!response?.ok) {
      return null;
    }
    const json = await response.json();
    const stars = parseInt(json.stargazers_count).toLocaleString();
    return stars;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const stars = await getGitHubStars();
  return (
    <main className="mx-auto h-min overflow-x-hidden">
      <Navbar />
      <div className="w-full border-b border-dashed border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:border-zinc-800 dark:from-zinc-950 dark:via-black dark:to-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-full w-full">
            <div className="flex h-12 flex-col items-center justify-center gap-1 md:flex-row md:gap-2">
              <span className="flex items-center gap-2 text-center text-sm font-medium text-zinc-700 md:text-left dark:text-zinc-300">
                <span className="text-zinc-900 transition-colors hover:text-zinc-950 dark:text-white/90 dark:hover:text-zinc-100">
                  Join our{" "}
                  <span className="font-semibold">
                    growing developer community
                  </span>
                </span>
                <span className="hidden text-zinc-400 md:inline">|</span>
              </span>
              <Link
                href="https://twitter.com/your_twitter_handle"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Follow us on Twitter{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M19.633 7.997c.013.176.013.353.013.53 0 5.386-4.097 11.6-11.6 11.6-2.308 0-4.453-.673-6.258-1.823a8.196 8.196 0 0 0 6.066-1.697 4.088 4.088 0 0 1-3.815-2.834 5.143 5.143 0 0 0 .774.063c.504 0 .997-.067 1.464-.19a4.082 4.082 0 0 1-3.275-4.004v-.051a4.1 4.1 0 0 0 1.847.514A4.086 4.086 0 0 1 2.8 6.766a11.589 11.589 0 0 0 8.406 4.262 4.605 4.605 0 0 1-.101-.937 4.085 4.085 0 0 1 7.067-2.792 8.045 8.045 0 0 0 2.594-.99 4.07 4.07 0 0 1-1.793 2.253 8.2 8.2 0 0 0 2.35-.637 8.73 8.73 0 0 1-2.05 2.127z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Section
        className="mb-1 overflow-y-clip"
        crosses
        crossesOffset="lg:translate-y-[5.25rem]"
        customPaddings
        id="hero"
      >
        <Hero />
        <Features stars={stars} />
      </Section>
      <Footer />
    </main>
  );
}
