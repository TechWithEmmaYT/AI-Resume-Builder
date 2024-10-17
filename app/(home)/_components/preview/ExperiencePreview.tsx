import React from "react";
import { ResumeDataType } from "@/types/resume.type";

const ExperiencePreview = ({
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
        Proffessional Experience
      </h5>
      <hr
        className="border-[1.5px]"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className="flex flex-col gap-2 pt-3">
        {resumeInfo?.experience?.map((experience, index) => (
          <div key={index}>
            <h5
              className="text-sm font-bold"
              style={{
                color: resumeInfo?.themeColor,
              }}
            >
              {experience?.title}
            </h5>
            <div className="flex items-start justify-between">
              <h5 className="text-xs">
                {experience?.companyName}, {experience?.city}{" "}
                {experience?.state}
              </h5>
              <span className="text-xs">
                {experience?.startDate} -{" "}
                {experience?.currentlyWorking ? "Present" : experience?.endDate}
              </span>
            </div>
            <p className="text-xs my-2">{experience?.workSummery}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePreview;
