"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import PreviewResume from "../../../_components/PreviewResume";
import useGetDocumentById from "@/features/document/use-get-document-by-id";
import Error from "../../../_components/Errror";
import { ResumeDataType } from "@/types/resume.type";

const PublicResume = () => {
  const param = useParams();
  const documentId = param.documentId as string;

  const { data, isSuccess, isLoading } = useGetDocumentById(documentId, true);
  const resumeInfo = data?.data ?? ({} as ResumeDataType);

  if (!isLoading && !isSuccess) {
    return <Error />;
  }
  return (
    <div className="w-full min-h-screen h-auto bg-black">
      <nav className="w-full px-8 border-b sticky top-0 border-gray-700 bg-black/50 h-12 py-2">
        <div className="flex items-center gap-1">
          <Image
            src="/images/pdf_icon.png"
            width={20}
            height={20}
            alt="pdf logo"
          />
          <h5
            className={
              "text-[20px] px-1 text-gray-300 font-semibold opacity-100"
            }
          >
            {resumeInfo?.title || "Untitled Resume"}.pdf
          </h5>
        </div>
      </nav>
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="max-w-[50%] w-full bg-white">
          <PreviewResume
            {...{
              resumeInfo,
              isLoading,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PublicResume;