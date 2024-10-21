import React from "react";
import { useResumeInfoContext } from "@/context/resume-info-provider";

import { cn } from "@/lib/utils";
import PersonalInfo from "./preview/PersonalInfo";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillPreview from "./preview/SkillPreview";
import { INITIAL_THEME_COLOR } from "@/lib/helper";

const ResumePreview = () => {
  const { resumeInfo, isLoading } = useResumeInfoContext();
  const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;
  console.log(themeColor);
  return (
    <div
      className={cn(
        `shadow-lg bg-white w-full flex-[1.02] h-full p-10
     dark:border dark:bg-card !font-open-sans
     dark:border-b-gray-800 dark:border-x-gray-800`
      )}
      style={{
        borderTop: `13px solid ${themeColor || "red"}`,
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

export default ResumePreview;
