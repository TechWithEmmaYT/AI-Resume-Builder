"use client";
import React, { useCallback } from "react";
import useUpdateDocument from "@/features/document/use-update-document";
import ResumeTitle from "@/app/(home)/_components/common/ResumeTitle";
import { useResumeInfoContext } from "@/context/resume-info-provider";
import { toast } from "@/hooks/use-toast";
import ThemeColor from "./ThemeColor";
import Share from "./Share";
import PreviewModal from "../PreviewModal";
import Download from "./Download";
import MoreOption from "./MoreOption";
import { AlertCircle } from "lucide-react";

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
    <>
      {resumeInfo?.status === "archived" && (
        <div
          className="absolute z-[9] inset-0 h-6 top-0 bg-rose-500 text-center text-base p-2 text-white
      flex items-center gap-x-2 justify-center font-medium
        "
        >
          <AlertCircle size="16px" />
          This resume is in the trash bin
        </div>
      )}
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
            status={resumeInfo?.status}
            {...{
              isLoading,
            }}
          />
          {/* {Share Resume} */}
          <Share />

          {/* {More Option} */}
          <MoreOption />
        </div>
      </div>
    </>
  );
};

export default TopSection;
