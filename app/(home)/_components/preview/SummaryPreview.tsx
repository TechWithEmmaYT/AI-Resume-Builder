import { ResumeDataType } from "@/types/resume.type";
import React from "react";

const SummaryPreview = ({
  resumeInfo,
}: {
  resumeInfo: ResumeDataType | undefined;
}) => {
  return <p className="text-xs">{resumeInfo?.summery}</p>;
};

export default SummaryPreview;
