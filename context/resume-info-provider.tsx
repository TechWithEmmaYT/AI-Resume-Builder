import { resumeData } from "@/lib/dummy";
import { ResumeDataType } from "@/types/resume.type";
import { createContext, useContext, useEffect, useState } from "react";

type ResumeContextType = {
  resumeInfo: ResumeDataType | undefined;
  onUpdate: (data: ResumeDataType) => void;
};

export const ResumeInfoContext = createContext<ResumeContextType | undefined>(
  undefined
);

export const ResumeInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [resumeInfo, setResumeInfo] = useState<ResumeDataType>();

  useEffect(() => {
    setResumeInfo(resumeData);
  }, []);

  const onUpdate = (data: ResumeDataType) => {
    setResumeInfo(data);
  };
  return (
    <ResumeInfoContext.Provider
      value={{
        resumeInfo,
        onUpdate,
      }}
    >
      {children}
    </ResumeInfoContext.Provider>
  );
};

export const useResumeInfoContext = () => {
  const context = useContext(ResumeInfoContext);
  if (!context) {
    throw new Error(
      "useCurrentUserContext must be used within a ResumeInfoProvider"
    );
  }
  return context;
};
