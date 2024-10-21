/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader, Sparkles } from "lucide-react";
import { useResumeInfoContext } from "@/context/resume-info-provider";
import { AIChatSession } from "@/lib/google-ai-modal";
import { toast } from "@/hooks/use-toast";

const PROMPT = `Given the job title "{jobTitle}", create 6-7 concise and personal bullet points in HTML format that highlight my key skills, relevant technologies, and significant contributions in that role. Do not include the job title itself in the output. Provide only the bullet points inside an unordered list.`;

const RichTextEditor = (props: {
  index: number;
  initialValue: string;
  onEditorChange: (e: any) => void;
}) => {
  const { index, initialValue, onEditorChange } = props;
  const { resumeInfo } = useResumeInfoContext();
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(initialValue || "");

  const GenerateSummaryFromAI = async () => {
    try {
      if (!resumeInfo?.experience?.[index]?.title) {
        toast({
          title: "Must provide Job Postion",
          variant: "destructive",
        });
        return;
      }
      const jobTitle = resumeInfo?.experience?.[index]?.title;
      setLoading(true);
      const prompt = PROMPT.replace("{jobTitle}", jobTitle);
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = await result.response.text();
      const validJsonArray = JSON.parse(`[${responseText}]`);
      console.log(validJsonArray[0]);
      // console.log(validJsonArray);
      setValue(validJsonArray?.[0]);
      onEditorChange(validJsonArray?.[0]);
      //setAiGeneratedSummary(JSON?.parse(responseText));
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
  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <Label>Work Summary</Label>
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
      <EditorProvider>
        <Editor
          value={value}
          containerProps={{
            style: {
              resize: "vertical",
              lineHeight: 1.2,
              fontSize: "13.5px",
            },
          }}
          onChange={(e) => {
            setValue(e.target.value);
            onEditorChange(e.target.value);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
