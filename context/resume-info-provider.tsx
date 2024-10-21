"use client";
import useGetDocumentById from "@/features/document/use-get-document-by-id";
import { ResumeDataType } from "@/types/resume.type";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type ResumeContextType = {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
  onUpdate: (data: ResumeDataType) => void;
};

export const ResumeInfoContext = createContext<ResumeContextType | undefined>(
  undefined
);

export const ResumeInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const param = useParams();
  const documentId = param.documentId as string;

  const { data, isSuccess, isLoading, isError, refetch } =
    useGetDocumentById(documentId);

  const [resumeInfo, setResumeInfo] = useState<ResumeDataType>();

  useEffect(() => {
    if (isSuccess) {
      setResumeInfo(data?.data);
    }
  }, [isSuccess]);

  const onUpdate = (data: ResumeDataType) => {
    setResumeInfo(data);
  };

  return (
    <ResumeInfoContext.Provider
      value={{
        resumeInfo,
        isSuccess,
        isLoading,
        isError,
        refetch,
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
