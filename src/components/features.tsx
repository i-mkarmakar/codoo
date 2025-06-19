"use client";

import {
  FileText,
  Search,
  History,
  Users,
  GitBranch,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    id: 1,
    label: "AI Documentation",
    title: "Automatic <strong>Code Documentation</strong>.",
    description:
      "Generates detailed documentation automatically, helping developers quickly understand code structure and logic.",
    icon: FileText,
  },
  {
    id: 2,
    label: "Smart Search",
    title: "Context-aware <strong>Codebase Search</strong>.",
    description:
      "AI-enhanced search helps you find variables, functions, and files instantly across your project.",
    icon: Search,
  },
  {
    id: 3,
    label: "Commit Insights",
    title: "AI-generated <strong>Commit Summaries</strong>.",
    description:
      "Automatically summarizes commit messages in human-readable form to keep everyone on the same page.",
    icon: History,
  },
  {
    id: 4,
    label: "Real-time Collaboration",
    title: "Built-in <strong>Collaboration Tools</strong>.",
    description:
      "Work together with your team directly within the platform, enabling shared notes, docs, and updates in real time.",
    icon: Users,
  },
  {
    id: 5,
    label: "Seamless Integration",
    title: "GitHub & <strong>Microservices Friendly</strong>.",
    description:
      "Integrates with GitHub and supports Docker-based microservice deployment for a smoother dev workflow.",
    icon: GitBranch,
  },
  {
    id: 6,
    label: "AI Suggestions",
    title: "Contextual <strong>AI-Powered Suggestions</strong>.",
    description:
      "Get intelligent suggestions based on code context—like next steps, refactoring tips, or documentation improvements.",
    icon: Sparkles,
  },
];

export default function Features({ stars }: { stars: string | null }) {
  return (
    <div className="font-geist relative mx-auto mt-10 md:w-10/12">
      <div className="my-20 text-center">
        <h2 className="text-primary relative text-3xl font-bold">
          Features
          <span className="text-primary/5 absolute left-1/2 -z-50 -translate-x-1/2 -translate-y-1/3 transform text-8xl font-extrabold">
            Features
          </span>
        </h2>
      </div>

      <div className="w-full md:mx-0">
        <div className="relative grid grid-cols-1 md:grid-cols-3 md:grid-rows-2">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={cn(
                "flex transform-gpu flex-col justify-center border-t border-l p-10 md:min-h-[240px]",
                index % 3 === 0 && "md:border-l-0",
                index < 3 && "md:border-t-0",
              )}
            >
              <div className="my-1 flex items-center gap-2">
                <feature.icon className="h-4 w-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.label}
                </p>
              </div>
              <div className="mt-2">
                <div className="max-w-full">
                  <div className="flex gap-3">
                    <p
                      className="max-w-lg text-xl font-normal tracking-tighter md:text-2xl"
                      dangerouslySetInnerHTML={{
                        __html: feature.title,
                      }}
                    />
                  </div>
                </div>
                <p className="text-muted-foreground mt-2 text-left text-sm">
                  {feature.description}
                  <a className="ml-2 underline" href="/docs" target="_blank">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
