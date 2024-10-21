"use client";
import React from "react";
import TopSection from "@/app/(home)/_components/common/TopSection";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";

const EditResume = () => {
  // const { resumeInfo, onUpdate } = useResumeInfoContext();
  // const { mutateAsync } = useUpdateDocument();

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

  return (
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
  );
};

export default EditResume;
