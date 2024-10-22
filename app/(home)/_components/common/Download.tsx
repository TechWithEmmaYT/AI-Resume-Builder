import React, { useCallback } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { DownloadCloud } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatFileName } from "@/lib/helper";

const Download = (props: { title: string; isLoading: boolean }) => {
  const { title, isLoading: loading } = props;
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDownload = useCallback(async () => {
    setIsLoading(true); // Set loading to true when starting the download
    const resumeElement = document.getElementById("resume-preview-id");
    console.log(resumeElement, "resumeElement");
    if (!resumeElement) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Could not download",
        variant: "destructive",
      });
      return;
    }

    const fileName = formatFileName(title);

    try {
      const canvas = await html2canvas(resumeElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 size in mm
      const pageHeight = 295; // A4 size in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(fileName); // Trigger the download
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Error generating PDF:",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Reset loading state once done
    }
  }, [title]);
  return (
    <Button
      variant="secondary"
      disabled={isLoading || loading}
      type="button"
      className="bg-white border gap-1 dark:bg-gray-800 !w-10 !p-2 lg:!w-auto lg:p-4"
      onClick={handleDownload}
    >
      <DownloadCloud size="17px" />
      <span className="hidden  lg:flex">
        {isLoading ? "Generating PDF..." : "Download Resume"}
      </span>
    </Button>
  );
};

export default Download;
