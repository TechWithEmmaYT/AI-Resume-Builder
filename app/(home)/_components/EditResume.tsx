"use client";
import React, { useCallback, useEffect, useRef } from "react";
import TopSection from "@/app/(home)/_components/common/TopSection";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import { useResumeInfoContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";
import { generateThumbnail } from "@/lib/helper";

const EditResume = () => {
  const { resumeInfo } = useResumeInfoContext();
  const { mutateAsync } = useUpdateDocument();

  const hasUpdatedThumbnailRef = useRef(false);

  // const [isSaving, setIsSaving] = useState<boolean>(false);
  // const [saveStatus, setSaveStatus] = useState<string>("All changes saved");
  // const debouncedFormData = useDebounce<ResumeDataType>(
  //   resumeInfo as ResumeDataType,
  //   8000
  // );

  // const saveFormData = useCallback(async () => {
  //   let retries = 3; // Maximum retry attempts for saving
  //   while (retries > 0) {
  //     try {
  //       console.log("save more");

  //       if (!debouncedFormData) {
  //         return;
  //       }

  //       if (!debouncedFormData?.personalInfo?.firstName) return;
  //       console.log("callind api");

  //       setIsSaving(true);
  //       setSaveStatus("Saving...");
  //       // Simulate an API call to save the data
  //       //await new Promise((resolve) => setTimeout(resolve, 1000));
  //       await mutateAsync(
  //         {
  //           title: debouncedFormData.title,
  //           currentPosition: debouncedFormData.currentPosition || 1,
  //           themeColor: debouncedFormData.themeColor ?? "#7c3aed",
  //           summary: debouncedFormData.summary,
  //           personalInfo: debouncedFormData?.personalInfo ?? {},
  //           experience: debouncedFormData.experiences ?? [],
  //           education: debouncedFormData.educations ?? [],
  //           skills: debouncedFormData?.skills ?? [],
  //         },
  //         {
  //           onSuccess: () => {
  //             setSaveStatus("All changes saved");
  //           },
  //           onError() {
  //             setSaveStatus("Failed to save");
  //           },
  //         }
  //       );
  //       //setSaveStatus("All changes saved");
  //       break; // Exit loop after successful save
  //     } catch (error) {
  //       console.error(error);
  //       retries -= 1; // Decrement retry count on failure
  //       setSaveStatus(
  //         retries > 0
  //           ? `Retrying... (${retries} attempts left)`
  //           : "Failed to save"
  //       );
  //     } finally {
  //       setIsSaving(false);
  //     }
  //   }
  // }, [debouncedFormData, mutateAsync]);

  // Trigger save when the debounced value of formData changes
  // useEffect(() => {
  //   console.log(debouncedFormData);
  //   if (!debouncedFormData) {
  //     saveFormData();
  //   }
  // }, [debouncedFormData, saveFormData]);

  // dont do this on plssssss
  const updateThumbnail = useCallback(async () => {
    if (!resumeInfo) return;
    if (resumeInfo?.thumbnail) {
      hasUpdatedThumbnailRef.current = true;
      return;
    }

    const thumbnail = await generateThumbnail();

    if (!thumbnail) return;

    console.log("thumbnail");

    await mutateAsync(
      {
        thumbnail: thumbnail,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: `Thumbnail updated successfully`,
          });
          hasUpdatedThumbnailRef.current = true;
        },
        onError() {
          toast({
            title: "Error",
            description: "Failed to update thumbnail",
            variant: "destructive",
          });
        },
      }
    );
  }, [mutateAsync, resumeInfo]);

  useEffect(() => {
    if (hasUpdatedThumbnailRef.current) return;
    updateThumbnail();
  }, [hasUpdatedThumbnailRef.current]);

  return (
    <div className="relative w-full">
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
    </div>
  );
};

export default EditResume;
