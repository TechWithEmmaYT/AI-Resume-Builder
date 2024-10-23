"use client";
import React from "react";
import { Eye, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ResumePreview from "./ResumePreview";
import { useResumeInfoContext } from "@/context/resume-info-provider";

const PreviewModal = () => {
  const { resumeInfo } = useResumeInfoContext();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            disabled={resumeInfo?.status === "archived" ? true : false}
            variant="secondary"
            className="bg-white border gap-1 dark:bg-gray-800 !w-10 !p-2 lg:!w-auto lg:p-4"
          >
            <Eye size="17px" />
            <span className="hidden lg:flex">Preview</span>
          </Button>
        </DialogTrigger>
        <DialogContent
          className="
      sm:max-w-4xl 
      p-0 
      w-full 
      max-h-[90vh] 
      lg:max-h-[95vh] 
      overflow-y-auto
      "
        >
          <DialogHeader className="!pb-0 !m-0 sticky top-0 backdrop-blur bg-white/80 dark:bg-black/80 z-1">
            <DialogTitle className="flex items-center gap-1 text-[20px] pt-2 px-3 font-semibold opacity-100">
              <FileText className="stroke-primary" size="20px" />
              {resumeInfo?.title || "Untitled Resume"}
            </DialogTitle>
          </DialogHeader>

          <div
            className="
        w-full 
        h-full 
        px-3 pb-4
      "
          >
            <ResumePreview />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreviewModal;
