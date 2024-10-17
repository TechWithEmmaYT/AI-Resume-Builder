import { FileText } from "lucide-react";
import React, { useState } from "react";

interface ResumeTitleProps {
  initialTitle?: string;
  onSave?: (newTitle: string) => void;
}

const ResumeTitle: React.FC<ResumeTitleProps> = ({
  initialTitle = "Untitled document",
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);

  const handleBlur = (e: React.FocusEvent<HTMLHeadingElement>) => {
    const newTitle = e.target.innerText;
    setTitle(newTitle); // Update title state
    setIsEditing(false); // Exit editing mode
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
    <div className="flex items-center gap-1">
      <FileText className="stroke-primary" size="20px" />
      <h5
        className="text-[20px] px-1 text-gray-700 dark:text-gray-300 font-semibold"
        contentEditable
        suppressContentEditableWarning={true} // Suppress warning for contentEditable
        onBlur={handleBlur} // Handle save on blur
        onKeyDown={handleKeyDown} // Handle Enter key
        onClick={() => setIsEditing(true)} // Start editing on click
        spellCheck={false} // Optionally disable spell check
      >
        {title}
      </h5>
    </div>
  );
};

export default ResumeTitle;
