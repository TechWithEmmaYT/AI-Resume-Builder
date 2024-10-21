import { Skeleton } from "@/components/ui/skeleton";
import { ResumeDataType } from "@/types/resume.type";
import React from "react";

const SummaryPreview = ({
  resumeInfo,
  isLoading,
}: {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}) => {
  return (
    <div className="w-full min-h-10">
      {isLoading ? (
        <Skeleton className="h-6 w-full" />
      ) : (
        <p className="text-[13px] !leading-4">
          {resumeInfo?.summary ||
            `Enter a brief description of your professional background. 
            You can choose to highlight specific skills, knowledge or industry
            experience.`}
        </p>
      )}
    </div>
  );
};

export default SummaryPreview;
