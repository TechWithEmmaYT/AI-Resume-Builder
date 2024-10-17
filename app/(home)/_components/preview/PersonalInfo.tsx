import { ResumeDataType } from "@/types/resume.type";
import React from "react";

const PersonalInfo = ({
  resumeInfo,
}: {
  resumeInfo: ResumeDataType | undefined;
}) => {
  return (
    <div>
      <h2
        className="font-bold text-xl text-center"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h5 className="text-center text-sm font-medium">
        {resumeInfo?.jobTitle}
      </h5>
      <p className="text-center font-normal text-xs">{resumeInfo?.address}</p>

      <div className="flex justify-between pt-3">
        <h5 className="font-normal text-xs">{resumeInfo?.phone}</h5>
        <h5 className="font-normal text-xs">{resumeInfo?.email}</h5>
      </div>
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
    </div>
  );
};

export default PersonalInfo;
