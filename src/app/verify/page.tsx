"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function VerifyPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    if (!signUp) {
      setError("Sign-up context not available yet. Please try again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        setError("Verification incomplete. Please try again.");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !signUp) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading verification page...</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      {/* Background Grid */}
      <FlickeringGrid
        className="absolute inset-0 z-0 opacity-20"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
      />

      {/* Foreground Card */}
      <Card className="relative z-10 w-full max-w-sm rounded-none bg-background/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">Verify Email</CardTitle>
        </CardHeader>
        <CardContent className="-mt-4 grid gap-4">
          <p className="text-muted-foreground text-sm">
            Please check your email and enter the 6-digit verification code.
          </p>

          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleVerify}
            disabled={loading || code.length !== 6}
            className="cursor-pointer rounded-none"
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
