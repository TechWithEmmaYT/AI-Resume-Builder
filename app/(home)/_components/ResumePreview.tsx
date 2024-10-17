import React from "react";
import PersonalInfo from "./preview/PersonalInfo";
import { useResumeInfoContext } from "@/context/resume-info-provider";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillPreview from "./preview/SkillPreview";
import { cn } from "@/lib/utils";

const ResumePreview = () => {
  const { resumeInfo } = useResumeInfoContext();
  return (
    <div
      className={cn(`shadow-lg bg-white  w-full flex-[1.02] 
      h-full p-10 border-t-primary !border-t-[13px] 
      dark:border dark:!border-gray-800 dark:!border-t-primary
      dark:bg-card 
     `)}
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* {Personnal Info} */}
      <PersonalInfo resumeInfo={resumeInfo} />

      {/* {Summery} */}
      <SummaryPreview resumeInfo={resumeInfo} />

      {/* {Professional Exp.} */}
      <ExperiencePreview resumeInfo={resumeInfo} />

      {/* {Eduncational Info} */}
      <EducationalPreview resumeInfo={resumeInfo} />

      {/* {Skills} */}
      <SkillPreview resumeInfo={resumeInfo} />
    </div>
  );
};

export default ResumePreview;
