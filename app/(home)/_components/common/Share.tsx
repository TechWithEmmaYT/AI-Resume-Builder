import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe, ShareIcon } from "lucide-react";

const Share = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="bg-white border gap-1 dark:bg-gray-800 !w-10 !p-2 lg:!w-auto lg:p-4"
        >
          <div className="flex items-center gap-1">
            <ShareIcon size="17px" />
            <span className="hidden lg:flex">Share</span>
          </div>
          <ChevronDown size="14px" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="bg-background">
        <div className="w-full flex flex-col gap-3 items-center justify-center">
          <Globe size="40px" />
          <div className="text-center">
            <h5 className="font-semibold">Publish this resume</h5>
            <p className="text-sm">Share your work with others</p>
          </div>
          <Button className="w-full !bg-black dark:!bg-primary font-medium text-white">
            Publish
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Share;
