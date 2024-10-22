"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { File, Loader, Plus } from "lucide-react";
import useCreateDocument from "@/features/document/use-create-document";
import { generateThumbnail } from "@/lib/helper";

const AddResume = () => {
  const router = useRouter();
  const { isPending, mutate } = useCreateDocument();

  const onCreate = useCallback(() => {
    mutate(
      {
        title: "Untitled Resume",
      },
      {
        onSuccess: (response) => {
          const documentId = response.data.documentId;
          router.push(`/dashboard/document/${documentId}/edit`);

          generateThumbnail();
        },
      }
    );
  }, [mutate, router]);

  return (
    <>
      <div
        role="button"
        className="p-[2px] cursor-pointer max-w-[164px]"
        onClick={onCreate}
      >
        <div
          className="py-24 h-[183px] flex flex-col 
      rounded-lg gap-2 w-full max-w-full items-center justify-center
      border 
      bg-white
      hover:border-primary 
      hover:scale-101
      transition
    hover:shadow
      dark:bg-secondary"
        >
          <span>
            <Plus size="30px" />
          </span>
          <p className="text-sm font-semibold">Blank Resume</p>
        </div>
      </div>
      {isPending && (
        <div className="fixed top-0 left-0 right-0 flex flex-col gap-2 items-center justify-center bg-black/10 w-full h-full">
          <Loader size="35px" className="animate-spin" />
          <div className="flex items-center gap-2">
            <File />
            Creating Blank Resume...
          </div>
        </div>
      )}
    </>
  );
};

export default AddResume;
