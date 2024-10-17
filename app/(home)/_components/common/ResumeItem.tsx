"use cient";
import React, { FC, useCallback, useMemo } from "react";
import { Clock, EllipsisVertical, File } from "lucide-react";
import { format } from "date-fns";
import { generateBaseColor } from "@/lib/helper";
import { useRouter } from "next/navigation";

interface PropeType {
  documentId: string;
  title: string;
  status: "archived" | "published" | null;
  updatedAt: string;
}

const ResumeItem: FC<PropeType> = ({ documentId, title, updatedAt }) => {
  const router = useRouter();

  const baseColor = generateBaseColor();
  const docDate = useMemo(() => {
    if (!updatedAt) return null;
    const formattedDate = format(updatedAt, "MMM dd, yyyy");
    return formattedDate;
  }, [updatedAt]);

  const goToDoc = useCallback(() => {
    router.push(`/dashboard/document/${documentId}/edit`);
  }, [router, documentId]);

  return (
    <div
      role="button"
      className="cursor-pointer max-w-[164px] border bg-white 
      rounded-lg
      transition-all
      h-[197px]
      hover:border-primary 
    hover:shadow-md
    shadow-primary
      "
      style={{
        backgroundColor: `${baseColor}1A`,
        borderColor: `${baseColor}c1`,
      }}
      onClick={goToDoc}
    >
      <div
        className="flex flex-col w-full h-full items-center 
        justify-center dark:bg-secondary"
      >
        <div className="w-full flex flex-1 justify-center items-center">
          <File />
        </div>
        <div className="shrink w-full border-t pt-2 pb-[9px] px-[9px]">
          <div className="flex items-center justify-between">
            <h5 className="font-semibold text-sm mb-[2px]">{title}</h5>
            <button className="text-muted-foreground">
              <EllipsisVertical size="20px" />
            </button>
          </div>
          <div
            className="flex items-center gap-1 text-[12px] 
              font-medium 
          text-muted-foreground"
          >
            <Clock size="15px" />
            <p className="truncate w-full max-w-[200px] block">
              Modified {docDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeItem;
