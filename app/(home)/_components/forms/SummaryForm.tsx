import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeInfoContext } from "@/context/resume-info-provider";
import { ResumeDataType } from "@/types/resume.type";
import { Loader, Sparkles } from "lucide-react";
import { AIChatSession } from "@/lib/google-ai-modal";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useUpdateDocument from "@/features/document/use-update-document";

interface GeneratedSummaryType {
  fresher: string;
  mid: string;
  experienced: string;
}

const prompt = `Job Title: {jobTitle}. Based on the job title, please generate concise and complete summaries for my resume in JSON format, incorporating the following experience levels: fresher, mid, and experienced. Each summary should be limited to 3 to 4 lines, reflecting a personal tone and showcasing specific relevant programming languages, technologies, frameworks, and methodologies without any placeholders or gaps. Ensure that the summaries are engaging and tailored to highlight unique strengths, aspirations, and contributions to collaborative projects, demonstrating a clear understanding of the role and industry standards.`;

const SummaryForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, onUpdate } = useResumeInfoContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummary, setAiGeneratedSummary] =
    useState<GeneratedSummaryType | null>(null);

  const handleChange = useCallback(
    (e: { target: { value: string } }) => {
      const { value } = e.target;

      const resumeDataInfo = resumeInfo as ResumeDataType;
      const updatedInfo = {
        ...resumeDataInfo,
        summary: value,
      };
      onUpdate(updatedInfo);
    },
    [onUpdate, resumeInfo]
  );

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (!resumeInfo) return;
      await mutateAsync(
        {
          currentPosition: resumeInfo.currentPosition || 1,
          summary: resumeInfo?.summary,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Summary updated successfully",
            });
            handleNext();
          },
          onError() {
            toast({
              title: "Error",
              description: "Failed to update summary",
              variant: "destructive",
            });
          },
        }
      );
    },
    [resumeInfo]
  );

  const GenerateSummaryFromAI = async () => {
    try {
      const jobTitle = resumeInfo?.personalInfo?.jobTitle;
      if (!jobTitle) return;
      setLoading(true);
      const PROMPT = prompt.replace("{jobTitle}", jobTitle);
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      // const validJsonArray = JSON.parse(`[${responseText}]`);
      // console.log(validJsonArray);
      setAiGeneratedSummary(JSON?.parse(responseText));
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to generate summary",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = useCallback(
    (summary: string) => {
      const resumeDataInfo = resumeInfo as ResumeDataType;
      const updatedInfo = {
        ...resumeDataInfo,
        summary: summary,
      };
      onUpdate(updatedInfo);
      setAiGeneratedSummary(null);
    },
    [onUpdate, resumeInfo]
  );

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Summary</h2>
        <p className="text-sm">Add summary for your resume</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-end  justify-between">
            <Label>Add Summary</Label>
            <Button
              variant="outline"
              className="gap-1"
              disabled={loading}
              onClick={() => GenerateSummaryFromAI()}
            >
              <>
                <Sparkles size="15px" className="text-purple-500" />
                Generate with AI
              </>
              {loading && <Loader size="13px" className="animate-spin" />}
            </Button>
          </div>
          <Textarea
            className="mt-5 min-h-36"
            required
            value={resumeInfo?.summary || ""}
            onChange={handleChange}
          />

          {aiGeneratedSummary && (
            <div>
              <h5 className="font-semibold text-[15px] my-4">Suggestions</h5>
              {Object?.entries(aiGeneratedSummary)?.map(
                ([experienceType, summary], index) => (
                  <Card
                    role="button"
                    key={index}
                    className="my-4 bg-primary/5 shadow-none border-primary/30"
                    onClick={() => handleSelect(summary)}
                  >
                    <CardHeader className="py-2">
                      <CardTitle className="font-semibold text-md">
                        {experienceType?.charAt(0)?.toUpperCase() +
                          experienceType?.slice(1)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>{summary}</p>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          )}

          <Button className="mt-4" type="submit" disabled={isPending}>
            {isPending && <Loader size="15px" className="animate-spin" />}
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SummaryForm;
