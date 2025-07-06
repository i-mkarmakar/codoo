"use client";

import React from "react";
import useProject from "@/hooks/use-project";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import CommitLog from "./commit-log";
import AskQuestionCard from "./ask-question-card";

const DashboardPage = () => {
  const { project } = useProject();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        <div className="w-fit border rounded-none px-4 py-3">
          <div className="flex items-center">
            <Github className="h-4 w-4" />
            <div className="ml-2">
              <p className="text-sm font-medium text-white">
                This project is linked to{" "}
                <Link
                  href={project?.githubUrl ?? ""}
                  className="inline-flex items-center text-white/80 hover:underline"
                >
                  {project?.githubUrl}
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="h-4"></div>

        <div className="flex items-center gap-4">
          TeamMembers InviteButton ArchiveButton
        </div>
      </div>

      <div className="mt-4">
        <div className="grid-cols grid gap-4 sm:grid-cols-5">
          <AskQuestionCard />
        </div>
      </div>

      <div className="mt-8">
        <CommitLog />
      </div>
    </div>
  );
};

export default DashboardPage;
