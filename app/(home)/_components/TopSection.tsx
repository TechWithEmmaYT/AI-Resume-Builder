"use client";
import React from "react";
import {
  CloudUploadIcon,
  DownloadCloud,
  Layers3,
  MoreHorizontal,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumeTitle from "@/app/(home)/_components/common/ResumeTitle";

const TopSection = () => {
  return (
    <div className="w-full flex items-center justify-between border-b pb-3">
      <div className="flex items-center gap-2">
        <ResumeTitle />
        <span>
          <CloudUploadIcon size="17px" />
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          className="bg-white border gap-1 dark:bg-gray-800"
        >
          <Palette size="18px" />
          <span>Theme</span>
        </Button>
        <Button
          variant="secondary"
          className="bg-white border gap-1 dark:bg-gray-800"
        >
          <Layers3 size="18px" />
          <span>Manage Sections</span>
        </Button>

        <Button
          variant="secondary"
          className="bg-white border gap-1 dark:bg-gray-800"
        >
          <DownloadCloud size="18px" />
          <span>Download Resume</span>
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="bg-white border dark:bg-gray-800"
        >
          <MoreHorizontal />
        </Button>
      </div>
    </div>
  );
};

export default TopSection;
