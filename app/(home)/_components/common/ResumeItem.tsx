"use cient";
import React, { FC, useCallback, useMemo, useState } from "react";
import {
  Dot,
  EllipsisVertical,
  FileText,
  Globe,
  Link,
  Lock,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";

interface PropeType {
  documentId: string;
  title: string;
  status: "archived" | "private" | "public" | null;
  themeColor: string | null;
  updatedAt: string;
}

const ResumeItem: FC<PropeType> = ({
  documentId,
  status,
  title,
  themeColor,
  updatedAt,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const docDate = useMemo(() => {
    if (!updatedAt) return null;
    const formattedDate = format(updatedAt, "MMM dd, yyyy");
    return formattedDate;
  }, [updatedAt]);

  const goToDoc = useCallback(() => {
    router.push(`/dashboard/document/${documentId}/edit`);
  }, [router, documentId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOption = useCallback((e: any) => {
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  return (
    <div
      role="button"
      className="cursor-pointer max-w-[164px] border 
      rounded-lg
      transition-all
      h-[197px]
      hover:border-primary 
    hover:shadow-md
    shadow-primary
      "
      style={{
        borderColor: themeColor || "",
      }}
      onClick={goToDoc}
    >
      <div
        className="flex flex-col w-full h-full items-center 
      rounded-lg
        justify-center bg-white dark:bg-secondary"
      >
        <div className="w-full flex flex-1 justify-center items-center">
          <FileText />
        </div>
        <div className="shrink w-full border-t pt-2 pb-[9px] px-[9px]">
          <div className="flex items-center justify-between">
            <h5 className="font-semibold text-sm mb-[2px] truncate block w-[200px]">
              {title}
            </h5>
            <DropdownMenu modal open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild onClick={(e) => handleOption(e)}>
                <button className="text-muted-foreground">
                  <EllipsisVertical size="20px" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="gap-1 !cursor-pointer">
                  {status === "private" ? (
                    <>
                      <Globe size="12px" className="" />
                      Switch Public
                    </>
                  ) : (
                    <>
                      <Lock size="12px" />
                      Switch Private
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-1 !cursor-pointer">
                  <Link size="15px" />
                  Copy link
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-1 !cursor-pointer">
                  <Trash2 size="15px" />
                  Trash
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div
            className="flex items-center !text-[12px] 
              font-medium 
          text-muted-foreground"
          >
            <span className="flex items-center gap-[2px]">
              {status === "private" ? (
                <>
                  <Lock size="12px" />
                  Private
                </>
              ) : (
                <>
                  <Globe size="12px" className="text-primary" />
                  Public
                </>
              )}
            </span>
            <Dot size="15px" />
            <span className="items-center">{docDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeItem;
