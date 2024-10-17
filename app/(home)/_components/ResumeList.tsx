"use client";
import { Fragment } from "react";
import useGetDocuments from "@/features/document/use-get-document";
import ResumeItem from "./common/ResumeItem";
import { Loader } from "lucide-react";

const ResumeList = () => {
  const { data, isLoading } = useGetDocuments();

  const resumes = data?.data ?? [];

  return (
    <Fragment>
      {isLoading ? (
        <div className=" flex items-center justify-center mx-5">
          <Loader className="animate-spin text-black dark:text-white size-10" />
        </div>
      ) : null}
      {resumes?.map((resume) => (
        <ResumeItem
          key={resume.documentId}
          documentId={resume.documentId}
          title={resume.title}
          status={resume.status}
          updatedAt={resume.updatedAt}
        />
      ))}
    </Fragment>
  );
};

export default ResumeList;
