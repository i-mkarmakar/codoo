"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { AvatarCircles } from "@/components/magicui/avatar-circles";

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
  },
];

export default function Hero() {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden px-4 antialiased md:min-h-[40rem]">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-black dark:bg-[radial-gradient(rgba(255,255,255,0.10)_1px,transparent_1px)]"></div>
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 px-4 pt-24 pb-20 sm:flex-row sm:gap-10 lg:px-6 xl:px-8">
        <div className="max-w-xl flex-shrink-0">
          <div>
            <Badge variant="secondary" className="px-2 py-1" asChild>
              <Link href="/">What's new</Link>
            </Badge>
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span className="text-md">⚡Just shipped v1.0</span>
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
          <h1 className="mt-6 text-4xl leading-tight font-bold sm:text-5xl">
            <span>Code as a Team, Think as One using — </span>{" "}
            <PointerHighlight
              rectangleClassName="border-neutral-300 dark:border-neutral-600"
              pointerClassName="text-yellow-500"
            >
              <span className="relative z-10 font-normal tracking-tighter">
                AI Collaboration.
              </span>
            </PointerHighlight>
          </h1>
          <p className="text-muted-foreground mt-4 text-sm">
            AI-powered coding companion — built to simplify collaboration,{" "}
            automate <br /> documentation, and make navigating complex codebases
            effortless.
          </p>

          <div className="mt-4 flex flex-col items-start gap-y-4">
            <div className="flex space-x-4">
              <Button size="lg" className="group">
                Get Started
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                Learn More
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="mt-4 flex items-center gap-x-3">
              <AvatarCircles avatarUrls={avatars} numPeople={100} />
              <span className="text-muted-foreground text-sm font-medium">
                Joined by <span className="font-semibold">100+</span> developers
              </span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-2xl">
          <div className="border-border bg-background z-0 w-full rounded-lg border shadow-xl">
            <div className="border-border border-b p-4">
              <div className="flex items-center">
                <div className="flex gap-x-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
                <div className="bg-muted text-muted-foreground ml-4 w-full max-w-[300px] rounded-md px-3 py-1 text-sm">
                  https://codoo.dev
                </div>
              </div>
            </div>
            <div className="bg-muted/30 h-80 w-[448px] rounded-b-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
