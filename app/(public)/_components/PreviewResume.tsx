"use client";
import React from "react";
import PersonalInfo from "@/app/(home)/_components/preview/PersonalInfo";
import SummaryPreview from "@/app/(home)/_components/preview/SummaryPreview";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { cn } from "@/lib/utils";
import ExperiencePreview from "@/app/(home)/_components/preview/ExperiencePreview";
import EducationalPreview from "@/app/(home)/_components/preview/EducationalPreview";
import SkillPreview from "@/app/(home)/_components/preview/SkillPreview";
import { ResumeDataType } from "@/types/resume.type";

const PreviewResume = (props: {
  isLoading: boolean;
  resumeInfo: ResumeDataType;
}) => {
  const { isLoading, resumeInfo } = props;
  const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;

  return (
    <div
      id="resume-preview-id"
      className={cn(
        `shadow-lg bg-white w-full flex-[1.02] h-full p-10
     dark:border dark:bg-card !font-open-sans
     dark:border-b-gray-800 dark:border-x-gray-800 min-h-screen`
      )}
      style={{
        borderTop: `13px solid ${themeColor}`,
      }}
    >
      {/* {Personnal Info} */}
      <PersonalInfo isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* {Summery} */}
      <SummaryPreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* {Professional Exp.} */}
      <ExperiencePreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* {Eduncational Info} */}
      <EducationalPreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* {Skills} */}
      <SkillPreview isLoading={isLoading} resumeInfo={resumeInfo} />
    </div>
  );
};

export default PreviewResume;
