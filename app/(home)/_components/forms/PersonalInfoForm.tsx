import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeInfoContext } from "@/context/resume-info-provider";
import { ResumeDataType } from "@/types/resume.type";
import React, { useCallback } from "react";

const PersonalInfoForm = () => {
  const { resumeInfo, onUpdate } = useResumeInfoContext();

  const handleChange = useCallback(
    (e: { target: { name: any; value: any } }) => {
      const { name, value } = e.target;

      const resumeDataInfo = resumeInfo as ResumeDataType;
      const updatedInfo = {
        ...resumeDataInfo,
        [name]: value,
      };
      console.log(updatedInfo);
      onUpdate(updatedInfo);
    },
    [resumeInfo]
  );

  const onSave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Personal Information</h2>
        <p className="text-sm">Get Started with the personal infomation</p>
      </div>
      <div>
        <form onSubmit={onSave}>
          <div className="grid grid-cols-2 mt-5 gap-3">
            <div>
              <Label className="text-sm">First Name</Label>
              <Input
                name="firstName"
                required
                placeholder="John"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className="text-sm">Last Name</Label>
              <Input
                name="lastName"
                required
                placeholder="Smith"
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <Label className="text-sm">Job Title</Label>
              <Input name="jobTitle" required onChange={handleChange} />
            </div>

            <div className="col-span-2">
              <Label className="text-sm">Address</Label>
              <Input name="address" required onChange={handleChange} />
            </div>

            <div className="col-span-2">
              <Label className="text-sm">Phone</Label>
              <Input name="phone" required onChange={handleChange} />
            </div>

            <div className="col-span-2">
              <Label className="text-sm">Email</Label>
              <Input name="email" required onChange={handleChange} />
            </div>
          </div>

          <Button className="mt-4" type="submit">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
