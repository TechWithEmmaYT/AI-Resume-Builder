"use client";
import React from "react";
import ResumeForm from "../../../../_components/ResumeForm";
import ResumePreview from "../../../../_components/ResumePreview";
import { ResumeInfoProvider } from "@/context/resume-info-provider";
import TopSection from "@/app/(home)/_components/TopSection";

const Page = () => {
  return (
    <ResumeInfoProvider>
      <div className="w-full mx-auto max-w-7xl  py-4 px-5">
        <TopSection />
        <div className="w-full mt-1">
          <div className="flex flex-col lg:flex-row items-start w-full py-3 gap-6">
            {/* { Form Section} */}
            <ResumeForm />
            {/* { Preview Section} */}
            <ResumePreview />
          </div>
        </div>
      </div>
    </ResumeInfoProvider>
  );
};

export default Page;
