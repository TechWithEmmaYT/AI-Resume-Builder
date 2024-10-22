import { v4 as uuidv4 } from "uuid";
import html2canvas from "html2canvas";

export const INITIAL_THEME_COLOR = "#7c3aed";

export const generateDocUUID = (): string => {
  // Generate UUID, remove hyphens, and take the first 8 characters
  const uuid = uuidv4().replace(/-/g, ""); // Remove hyphens
  return `doc-${uuid.substring(0, 16)}`; // Take the first 8 characters and prefix with 'doc-'
};

export const generateThumbnail = async () => {
  const resumeElement = document.getElementById(
    "resume-preview-id"
  ) as HTMLElement;
  if (!resumeElement) {
    console.error("Resume preview element not found.");
    return;
  }
  try {
    const canvas = await html2canvas(resumeElement, { scale: 0.5 });
    const thumbnailImage = canvas.toDataURL("image/png");
    console.log(thumbnailImage);
    return thumbnailImage;
  } catch (error) {
    console.error("Thumbnail generation failed:", error);
  }
};

export const formatFileName = (title: string, useHyphen: boolean = true) => {
  // Replace spaces with the specified delimiter (hyphen or underscore)
  const delimiter = useHyphen ? "-" : "_";
  return title.trim().replace(/\s+/g, delimiter) + ".pdf";
};
