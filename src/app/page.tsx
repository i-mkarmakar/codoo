import Section from "@/components/section";
import Hero from "@/components/hero";
import Features from "@/components/features";
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
  return (
    <main className="mx-auto h-min overflow-x-hidden">
      <Navbar />
      <Section
        className="mb-1 overflow-y-clip"
        crosses
        crossesOffset="lg:translate-y-[5.25rem]"
        customPaddings
        id="hero"
      >
        <Hero />
        <Features />
      </Section>
      <Footer />
    </main>
  );
}
