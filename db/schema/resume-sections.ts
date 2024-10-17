import { pgTable, serial, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resumeSectionTable = pgTable("resume_section", {
  id: serial("id").primaryKey(),
  sectionType: varchar("section_type", { length: 100 }).notNull(), // e.g., 'Summary', 'Experience'
  content: json("content").notNull(), // Stores the default content
});

export const resumeSectionTableSchema = createInsertSchema(resumeSectionTable);

export type ResumeSectionSchema = z.infer<typeof resumeSectionTableSchema>;
