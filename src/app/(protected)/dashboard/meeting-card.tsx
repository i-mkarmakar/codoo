"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Card } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import React from "react";
import { uploadFile } from "@/lib/firebase";
import { Presentation, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const MeetingCard = () => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "audio/*": [".mp3", ".wav", ".mp4"],
    },
    multiple: false,
    maxSize: 50_000_000,
    onDrop: async (acceptedFiles) => {
      setIsUploading(true);
      const file = acceptedFiles[0];
      const downloadURL = await uploadFile(file as File, setProgress);
      window.alert(downloadURL);
      setIsUploading(false);
    },
  });

  return (
    <Card
      className="col-span-2 flex flex-col items-center justify-center rounded-none p-10"
      {...getRootProps()}
    >
      {!isUploading && (
        <>
          <Presentation className="h-10 w-10 animate-bounce" />
          <h3 className="text-sm font-semibold">Create a new meeting</h3>
          <p className="text-center text-sm">
            Analyse your meeting with Dionysus.
            <br />
            Powered by AI.
          </p>
          <div>
            <Button disabled={isUploading}>
              <Upload className="mr-1.5 -ml-0.5 h-5 w-5" aria-hidden="true" />
              Upload Meeting
            </Button>
            <input className="hidden" {...getInputProps()} />
          </div>
        </>
      )}
      {isUploading && (
        <div>
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            className="size-20"
          />
          <p className="text-center text-sm">Uploading your meeting...</p>
        </div>
      )}
    </Card>
  );
};

export default MeetingCard;
