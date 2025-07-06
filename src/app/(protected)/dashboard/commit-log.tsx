"use client";

import React from "react";
import { api } from "@/trpc/react";
import useProject from "@/hooks/use-project";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const CommitLog = () => {
  const { projectId, project } = useProject();
  const { data: commits } = api.project.getCommits.useQuery({ projectId });
  return (
    <>
      <ul className="space-y-6">
        {commits?.map((commit, commitIdx) => {
          return (
            <li key={commit.id} className="relative flex gap-x-4">
              <div
                className={cn(
                  commitIdx === commits.length - 1 ? "h-6" : "-bottom-6",
                  "absolute top-0 left-0 flex w-6 justify-center",
                )}
              >
                <div className="w-px translate-x-1 bg-primary"></div>
              </div>
              <>
                <img
                  src={commit.commitAuthorAvatar}
                  alt=" commit avatar"
                  className="relative mt-4 size-8 flex-none rounded-full bg-gray-50"
                />
                <div className="rounded-none flex-auto bg-transparent p-3 border">
                  <div className="flex justify-between gap-x-4">
                    <Link
                      target="_blank"
                      href={`${project?.githubUrl}/commits/${commit.commitHash}`}
                      className="py-0.5 text-xs leading-5 text-muted-foreground"
                    >
                      {commit.commitMessage}
                      {" "}
                      <span className="font-medium text-primary">
                        {commit.commitAuthorName}
                      </span>{" "}
                      {""}
                      <span className="inline-flex items-center">
                        commited
                        <ExternalLink className="ml-1 size-4" />
                      </span>
                    </Link>
                  </div>
                  <span className="font-semibold">{commit.commitMessage}</span>
                  <pre className="mt-2 text-sm leading-6 whitespace-pre-wrap text-gray-500">
                    {commit.summary}
                  </pre>
                </div>
              </>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default CommitLog;
