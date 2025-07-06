"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import React from "react";
import AskQuestionCard from "../dashboard/ask-question-card";
import MDEditor from "@uiw/react-md-editor";
import CodeReference from "../dashboard/code-reference";

const QAPage = () => {
  const { projectId } = useProject();
  const { data: questions } = api.project.getQuestions.useQuery({ projectId });

  const [questionIndex, setQuestionIndex] = React.useState(0);
  const question = questions?.[questionIndex];

  return (
    <Sheet>
      <AskQuestionCard />
      <div className="h-4"></div>
      <h1 className="text-xl font-semibold">Saved Questions</h1>
      <div className="h-2"></div>
      <div className="flex flex-col gap-2">
        {questions?.map((question, index) => {
          return (
            <React.Fragment key={index}>
              <SheetTrigger onClick={() => setQuestionIndex(index)}>
                <div className="flex items-center gap-4 rounded-none border bg-white p-4 shadow">
                  <img
                    className="rounded-full"
                    height={30}
                    width={30}
                    src={question.user.imageUrl ?? ""}
                  />

                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2">
                      <p className="line-clamp-1 text-lg font-medium text-gray-700">
                        {question.question}
                      </p>
                      <span className="text-xs whitespace-nowrap text-gray-400">
                        {question.createdAt.toLocaleDateString()}
                      </span>
                      <p className="line-clamp-1 text-sm text-gray-500">
                        {question.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </SheetTrigger>
            </React.Fragment>
          );
        })}
      </div>

      {question && (
        <SheetContent className="sm:max-w-[80vw]">
          <SheetHeader>
            <SheetTitle>{question.question}</SheetTitle>
            <MDEditor.Markdown source={question.answer} />
            <CodeReference
              filesReferences={(question.filesReferences ?? []) as any}
            />
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default QAPage;
