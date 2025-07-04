"use client";

import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function AuthPage() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    signIn,
    setActive: setActiveSignIn,
    isLoaded: signInLoaded,
  } = useSignIn();
  const {
    signUp,
    setActive: setActiveSignUp,
    isLoaded: signUpLoaded,
  } = useSignUp();
  const router = useRouter();

  const handleBack = () => router.back();

  const handleSignIn = async () => {
    setError("");
    setLoading(true);
    if (!signInLoaded || !signIn) return;

    try {
      const result = await signIn.create({ identifier: email, password });

      if (result.status === "complete") {
        await setActiveSignIn({ session: result.createdSessionId });
        router.push("/sync-user");
      } else {
        setError("Sign-in not complete.");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setError("");
    setLoading(true);
    if (!signUpLoaded || !signUp) return;

    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      router.push(`/verify?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Failed to sign up.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "oauth_google" | "oauth_github") => {
    setError("");
    setLoading(true);

    try {
      if (!signInLoaded || !signIn) return;

      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "OAuth sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <Button
        variant="outline"
        onClick={handleBack}
        className="absolute top-4 left-4 z-20 flex cursor-pointer items-center gap-1 rounded-none text-sm"
      >
        <ArrowLeft />
        Back
      </Button>
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full opacity-20"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      <div className="relative z-10 w-full max-w-sm space-y-4">
        <div className="mb-2 inline-flex overflow-hidden rounded-none border border-gray-300 dark:border-gray-700">
          <div
            onClick={() => setTab("signin")}
            className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors ${
              tab === "signin"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-black dark:text-white"
            }`}
          >
            Sign In
          </div>
          <div
            onClick={() => setTab("signup")}
            className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors ${
              tab === "signup"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-black dark:text-white"
            }`}
          >
            Sign Up
          </div>
        </div>

        <Card className="rounded-none border">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              {tab === "signin" ? "Sign In" : "Sign Up"}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-xs md:text-sm">
              {tab === "signin"
                ? "Enter your email below to login to your account"
                : "Create a new account to get started"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4">
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="rounded-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {tab === "signin" && (
                    <Link href="#" className="ml-auto text-sm underline">
                      Forgot your password?
                    </Link>
                  )}
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    autoComplete="current-password"
                    className="rounded-none pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeClosed className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <Button
                  onClick={tab === "signin" ? handleSignIn : handleSignUp}
                  disabled={loading}
                  className="mt-4 w-full cursor-pointer rounded-none"
                >
                  {loading
                    ? "Loading..."
                    : tab === "signin"
                      ? "Sign In"
                      : "Sign Up"}
                </Button>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => handleOAuth("oauth_google")}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-none border px-4 py-2"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 533.5 544.3"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M533.5 278.4c0-17.5-1.6-35-4.9-51.9H272.1v98.3h146.6c-6.3 34-25.4 62.8-54.3 82.1v68.2h87.8c51.4-47.3 81.3-117.1 81.3-196.7z"
                      fill="#4285F4"
                    />
                    <path
                      d="M272.1 544.3c73.4 0 135-24.3 180-66.2l-87.8-68.2c-24.4 16.4-55.5 26-92.2 26-70.8 0-130.8-47.9-152.3-112.1H30v70.6c44.4 88.1 135.6 149.9 242.1 149.9z"
                      fill="#34A853"
                    />
                    <path
                      d="M119.8 323.8c-10.7-31.4-10.7-65.4 0-96.8V156.4H30c-44.4 88.1-44.4 192.5 0 280.6l89.8-70.6z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M272.1 107.7c39.9-.6 78.2 14.6 107.4 42.8l80.2-80.2C413.4 24.7 344.5-1.2 272.1 0 165.6 0 74.4 61.8 30 149.9l89.8 70.6c21.4-64.2 81.5-112.1 152.3-112.8z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </button>

                <button
                  onClick={() => handleOAuth("oauth_github")}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-none border px-4 py-2"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.6-4-1.6-.5-1.3-1.1-1.6-1.1-1.6-.9-.7.1-.7.1-.7 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.3-1.1.6-1.4-2.7-.3-5.5-1.3-5.5-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.2 0 4.5-2.8 5.5-5.5 5.8.4.3.7.9.7 1.8v2.6c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
                  </svg>
                  Sign in with GitHub
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
