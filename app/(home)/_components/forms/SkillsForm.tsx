"use client";
import React, { useCallback, useEffect } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useResumeInfoContext } from "@/context/resume-info-provider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Plus, X } from "lucide-react";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";
import { generateThumbnail } from "@/lib/helper";

const initialState = {
  name: "",
  rating: 0,
};

const SkillsForm = () => {
  const { resumeInfo, onUpdate } = useResumeInfoContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [skillsList, setSkillsList] = React.useState([
    ...(resumeInfo?.skills || []),
    initialState,
  ]);

  useEffect(() => {
    if (!resumeInfo) {
      return;
    }
    onUpdate({
      ...resumeInfo,
      skills: skillsList,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillsList]);

  const handleChange = (
    value: string | number,
    name: string,
    index: number
  ) => {
    setSkillsList((prevState) => {
      const newSkillList = [...prevState];
      newSkillList[index] = {
        ...newSkillList[index],
        [name]: value,
      };
      return newSkillList;
    });
  };

  const addNewSkill = () => {
    setSkillsList([...skillsList, initialState]);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...skillsList];
    updatedSkills.splice(index, 1);
    setSkillsList(updatedSkills);
  };

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      const thumbnail = await generateThumbnail();

      await mutateAsync(
        {
          currentPosition: 1,
          thumbnail: thumbnail,
          skills: skillsList,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Skills updated successfully",
            });
          },
          onError() {
            toast({
              title: "Error",
              description: "Failed to update skills",
              variant: "destructive",
            });
          },
        }
      );
    },
    [skillsList]
  );

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Skills</h2>
        <p className="text-sm">Add your skills information</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
          {skillsList.map((item, index) => (
            <div key={index}>
              <div className="relative flex items-center justify-between mb-5 pt-4 gap-3">
                {/* {Remove Skills} */}
                {skillsList?.length > 1 && (
                  <Button
                    variant="secondary"
                    type="button"
                    className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white"
                    size="icon"
                    onClick={() => removeSkill(index)}
                  >
                    <X size="13px" />
                  </Button>
                )}

                <div className="flex-1">
                  <Label className="text-sm">Name</Label>
                  <Input
                    name="name"
                    placeholder=""
                    required
                    autoComplete="off"
                    value={item.name || ""}
                    onChange={(e) =>
                      handleChange(e.target.value, "name", index)
                    }
                  />
                </div>
                <div className="shrink-0 pt-5">
                  <Rating
                    style={{ maxWidth: 120 }}
                    isDisabled={!item.name}
                    value={item?.rating || 0}
                    onChange={(value: number) =>
                      handleChange(value, "rating", index)
                    }
                  />
                </div>
              </div>

              {index === skillsList.length - 1 && skillsList.length < 15 && (
                <Button
                  className="gap-1 mt-1 text-primary border-primary/50"
                  variant="outline"
                  type="button"
                  onClick={addNewSkill}
                >
                  <Plus size="15px" />
                  Add More Skills
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button className="mt-4" type="submit" disabled={isPending}>
          {isPending && <Loader size="15px" className="animate-spin" />}
          Save & Done
        </Button>
      </form>
    </div>
  );
};

export default SkillsForm;
