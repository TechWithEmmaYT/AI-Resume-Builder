import { cn } from "@/lib/utils";
import { Lock, FileText, Globe, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ResumeTitleProps {
  initialTitle?: string;
  isLoading: boolean;
  status?: "archived" | "private" | "public" | null;
  onSave?: (newTitle: string) => void;
}

const ResumeTitle: React.FC<ResumeTitleProps> = ({
  initialTitle,
  isLoading,
  status,
  onSave,
}) => {
  const [title, setTitle] = useState("Untitled Resume");

  useEffect(() => {
    if (initialTitle) setTitle(initialTitle);
  }, [initialTitle]);

  const handleBlur = (e: React.FocusEvent<HTMLHeadingElement>) => {
    const newTitle = e.target.innerText;
    setTitle(newTitle); // Update title state
    if (onSave && typeof onSave === "function") {
      onSave(newTitle); // Call the save function with the new title
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents a new line
      e.currentTarget.blur(); // Save the title by triggering the blur event
    }
  };

  return (
    <div className="flex items-center gap-1 pr-4">
      <FileText className="stroke-primary" size="20px" />
      <h5
        className={cn(
          "text-[20px] px-1 text-gray-700 dark:text-gray-300 font-semibold opacity-100",
          {
            "!opacity-70 !pointer-events-none":
              isLoading === true || status === "archived",
          }
        )}
        contentEditable={isLoading || status === "archived" ? false : true}
        suppressContentEditableWarning={true} // Suppress warning for contentEditable
        onBlur={handleBlur} // Handle save on blur
        onKeyDown={handleKeyDown} // Handle Enter key
        spellCheck={false} // Optionally disable spell check
      >
        {title}
      </h5>
      <span>
        {status === "private" ? (
          <Lock size="14px" className="" />
        ) : status === "public" ? (
          <Globe size="14px" />
        ) : status === "archived" ? (
          <Trash2 size="14px" />
        ) : null}
      </span>
    </div>
  );
};

export default ResumeTitle;
