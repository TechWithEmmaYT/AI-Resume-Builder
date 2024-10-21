/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeInfoContext } from "@/context/resume-info-provider";
import PersonalInfoSkeletonLoader from "@/components/skeleton-loader/personal-info-loader";
import { PersonalInfoType } from "@/types/resume.type";
import useUpdateDocument from "@/features/document/use-update-document";
import { Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const initialState = {
  firstName: "",
  lastName: "",
  jobTitle: "",
  address: "",
  phone: "",
  email: "",
};

const PersonalInfoForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, isLoading } = useResumeInfoContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [personalInfo, setPersonalInfo] =
    React.useState<PersonalInfoType>(initialState);

  useEffect(() => {
    if (!resumeInfo) {
      return;
    }
    if (resumeInfo?.personalInfo) {
      setPersonalInfo({
        ...(resumeInfo?.personalInfo || initialState),
      });
    }
  }, [resumeInfo?.personalInfo]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    setPersonalInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (!resumeInfo) return;
      await mutateAsync(
        {
          title: resumeInfo?.title || "Untitled Resume",
          currentPosition: resumeInfo.currentPosition || 1,
          themeColor: resumeInfo.themeColor ?? "#7c3aed",
          personalInfo: personalInfo,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "PersonalInfo updated successfully",
            });
            handleNext();
          },
          onError() {
            toast({
              title: "Error",
              description: "Failed to update personal information",
              variant: "destructive",
            });
          },
        }
      );
    },
    [resumeInfo, personalInfo]
  );

  if (isLoading) {
    return <PersonalInfoSkeletonLoader />;
  }

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Personal Information</h2>
        <p className="text-sm">Get Started with the personal infomation</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 mt-5 gap-3">
            <div>
              <Label className="text-sm">First Name</Label>
              <Input
                name="firstName"
                required
                placeholder=""
                value={personalInfo?.firstName || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className="text-sm">Last Name</Label>
              <Input
                name="lastName"
                required
                placeholder=""
                value={personalInfo?.lastName || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <Label className="text-sm">Job Title</Label>
              <Input
                name="jobTitle"
                required
                value={personalInfo?.jobTitle || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <Label className="text-sm">Address</Label>
              <Input
                name="address"
                required
                value={personalInfo?.address || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <Label className="text-sm">Phone number</Label>
              <Input
                name="phone"
                required
                value={personalInfo?.phone || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <Label className="text-sm">Email</Label>
              <Input
                name="email"
                value={personalInfo?.email || ""}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <Button className="mt-4" type="submit" disabled={isPending}>
            {isPending && <Loader size="15px" className="animate-spin" />}
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
