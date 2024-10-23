import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

import { Loader, MoreHorizontal, Redo, Trash2 } from "lucide-react";
import useUpdateDocument from "@/features/document/use-update-document";
import { useResumeInfoContext } from "@/context/resume-info-provider";
import { toast } from "@/hooks/use-toast";

const MoreOption = () => {
  const router = useRouter();
  const { resumeInfo, isLoading, onUpdate } = useResumeInfoContext();

  const { mutateAsync, isPending } = useUpdateDocument();

  const handleClick = useCallback(
    async (status: "archived" | "private" | "public") => {
      if (!resumeInfo) return;

      await mutateAsync(
        {
          status: status,
        },
        {
          onSuccess: () => {
            onUpdate({
              ...resumeInfo,
              status: status,
            });
            router.replace(`/dashboard/`);
            toast({
              title: "Success",
              description: `Moved to trash successfully`,
            });
          },
          onError() {
            toast({
              title: "Error",
              description: "Failed to move to trash",
              variant: "destructive",
            });
          },
        }
      );
    },
    [mutateAsync, onUpdate, resumeInfo, router]
  );
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger disabled={isLoading} asChild>
          <Button
            variant="secondary"
            size="icon"
            className="bg-white border dark:bg-gray-800"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            {resumeInfo?.status === "archived" ? (
              <Button
                variant="ghost"
                className="gap-1 !py-2 !cursor-pointer"
                disabled={isPending}
                onClick={() => handleClick("private")}
              >
                <Redo size="15px" />
                Retore resume
                {isPending && <Loader size="15px" className="animate-spin" />}
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="gap-1  !py-2 !cursor-pointer"
                disabled={isPending}
                onClick={() => handleClick("archived")}
              >
                <Trash2 size="15px" />
                Move to Trash
                {isPending && <Loader size="15px" className="animate-spin" />}
              </Button>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MoreOption;
