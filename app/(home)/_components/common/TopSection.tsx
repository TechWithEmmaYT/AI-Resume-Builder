"use client";
import React, { useCallback } from "react";
import { MoreHorizontal } from "lucide-react";
import useUpdateDocument from "@/features/document/use-update-document";
import { Button } from "@/components/ui/button";
import ResumeTitle from "@/app/(home)/_components/common/ResumeTitle";
import { useResumeInfoContext } from "@/context/resume-info-provider";
import { toast } from "@/hooks/use-toast";
import ThemeColor from "./ThemeColor";
import Share from "./Share";
import PreviewModal from "../PreviewModal";
import Download from "./Download";

const TopSection = () => {
  const { resumeInfo, isLoading, onUpdate } = useResumeInfoContext();

  const { mutateAsync, isPending } = useUpdateDocument();

  const handleTitle = useCallback(
    (title: string) => {
      if (!resumeInfo) return;

      if (title === "Untitled Resume" || !title) return;

      onUpdate({
        ...resumeInfo,
        title: title,
      });

      mutateAsync(
        {
          title: title || "Untitled Resume",
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Title updated successfully",
            });
          },
          onError: () => {
            toast({
              title: "Error",
              description: "Failed to update the title",
              variant: "destructive",
            });
          },
        }
      );
    },
    [resumeInfo, onUpdate, mutateAsync]
  );
  return (
    <div className="w-full flex items-center justify-between border-b pb-3 z-50">
      <div className="flex items-center gap-2">
        <ResumeTitle
          isLoading={isPending}
          initialTitle={resumeInfo?.title}
          status={resumeInfo?.status}
          onSave={(value) => handleTitle(value)}
        />
        {/* <span className="flex items-center gap-1 text-[14px]">
          <CloudUploadIcon size="17px" />
          {isSaving ? "Saving..." : saveStatus}
        </span> */}
      </div>
      <div className="flex items-center gap-2">
        {/* {ThemeColor} */}
        <ThemeColor />

        {/* {Preview Resume} */}
        <PreviewModal />

        {/* {Download Resume} */}
        <Download
          title={resumeInfo?.title || "Untitled Resume"}
          {...{
            isLoading,
          }}
        />
        {/* {Share Resume} */}
        <Share />

        <Button
          variant="secondary"
          size="icon"
          className="bg-white border dark:bg-gray-800"
        >
          <MoreHorizontal />
        </Button>
      </div>
    </div>
  );
};

export default TopSection;
