import { ResumeDataType } from "@/types/resume.type";
import React from "react";

const SkillPreview = ({
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
        Skills
      </h5>
      <hr
        className="border-[1.5px]"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className="grid grid-cols-2 gap-3 pt-3 my-1">
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <h5 className="text-xs">{skill?.name}</h5>
            <div className="h-2 bg-gray-200 w-[120px]">
              <div
                className="h-2"
                style={{
                  background: resumeInfo?.themeColor,
                  width: skill.rating,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillPreview;
