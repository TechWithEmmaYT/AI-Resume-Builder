import React from "react";
import { ResumeDataType } from "@/types/resume.type";

const EducationalPreview = ({
  resumeInfo,
}: {
  resumeInfo: ResumeDataType | undefined;
}) => {
  return (
    <div className="w-full my-5">
      <h5
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Education
      </h5>
      <hr
        className="border-[1.5px]"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className="flex flex-col gap-2 pt-3">
        {resumeInfo?.education?.map((education, index) => (
          <div key={index}>
            <h5
              className="text-sm font-bold"
              style={{
                color: resumeInfo?.themeColor,
              }}
            >
              {education?.universityName}
            </h5>
            <div className="flex items-start justify-between">
              <h5 className="text-xs">
                {education?.degree} in {education?.major}
              </h5>
              <span className="text-xs">
                {education?.startDate} - {education?.endDate}
              </span>
            </div>
            <p className="text-xs my-2">{education?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationalPreview;
