"use client";

import MDEditor from "@uiw/react-md-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useProject from "@/hooks/use-project";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { askQuestion } from "./actions";
import { readStreamableValue } from "ai/rsc";
import CodeReference from "./code-reference";
import { api } from "@/trpc/react";
import type { promises } from "dns";
import { toast } from "sonner";
import useRefetch from "@/hooks/use-refetch";

const AskQuestionCard = () => {
  const { project } = useProject();
  const [open, setOpen] = React.useState(false);
  const [question, setQuestion] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [filesReferences, setFileReferences] = React.useState<
    { fileName: string; sourceCode: string; summary: string }[]
  >([]);
  const [answer, setAnswer] = React.useState("");
  const saveAnswer = api.project.saveAnswer.useMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setAnswer("");
    setFileReferences([]);
    e.preventDefault();
    if (!project?.id) return;
    setLoading(true);

    const { output, filesReferences } = await askQuestion(question, project.id);
    setOpen(true);
    setFileReferences(filesReferences);

    for await (const delta of readStreamableValue(output)) {
      if (delta) {
        setAnswer((ans) => ans + delta);
      }
      setLoading(false);
    }
  };
  const refetch = useRefetch();

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[80vw]">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <DialogTitle>Codoo</DialogTitle>
              <Button
                disabled={saveAnswer.isPending}
                variant={"outline"}
                onClick={() => {
                  saveAnswer.mutate(
                    {
                      projectId: project!.id,
                      question,
                      answer,
                      filesReferences,
                    },
                    {
                      onSuccess: () => {
                        toast.success("Answer Saved!");
                        refetch();
                      },
                      onError: () => {
                        toast.error("Failed to save answer!");
                      },
                    },
                  );
                }}
              >
                Save Answer
              </Button>
            </div>
          </DialogHeader>
          <MDEditor.Markdown
            source={answer}
            className="!h-full max-h-[40vh] max-w-[70vw] overflow-scroll"
          />
          <div className="h-4"></div>
          <CodeReference filesReferences={filesReferences} />
          <Button
            type="button"
            onClick={() => {
              setOpen(false);
            }}
          ></Button>
        </DialogContent>
      </Dialog>
      <Card className="relative col-span-2">
        <CardHeader>
          <CardTitle>Ask a question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Textarea
              placeholder="Which file should I edit to change the home page?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="h-4"></div>
            <Button type="submit" disabled={loading}>
              Ask Codoo!
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AskQuestionCard;
