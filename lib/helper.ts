import { v4 as uuidv4 } from "uuid";

export const generateDocUUID = (): string => {
  // Generate UUID, remove hyphens, and take the first 8 characters
  const uuid = uuidv4().replace(/-/g, ""); // Remove hyphens
  return `doc-${uuid.substring(0, 16)}`; // Take the first 8 characters and prefix with 'doc-'
};

export function generateBaseColor(): string {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}
