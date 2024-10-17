import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import { Button } from "@/components/ui/button";

const ResumeForm = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  return (
    <div className="flex-1 w-full">
      <div
        className="shadow-md rounded-md bg-white !border-t-primary !border-t-4 dark:bg-card dark:border dark:border-gray-800 
"
      >
        <div className="flex items-center gap-1 px-3 justify-end border-b py-[7px]">
          <Button
            variant="outline"
            size="default"
            className="!px-2 !py-1 !h-auto"
            disabled={activeFormIndex > 1 ? false : true}
            onClick={() => setActiveFormIndex(activeFormIndex - 1)}
          >
            <ArrowLeft size="16px" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="default"
            className="!px-2 !py-1 !h-auto"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next
            <ArrowRight size="16px" />
          </Button>
        </div>
        <div className="px-5 py-3 pb-5">
          {/* {Personnal Info} */}

          {activeFormIndex === 1 && <PersonalInfoForm />}

          {/* {Summery} */}

          {/* {Professional Exp.} */}

          {/* {Eduncational Info} */}

          {/* {Skills} */}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
