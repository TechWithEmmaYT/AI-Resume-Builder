import {
  pgTable,
  serial,
  integer,
  boolean,
  json,
  timestamp,
} from "drizzle-orm/pg-core";
import { documentTable } from "./document";
import { resumeSectionTable } from "./resume-sections";
import { relations } from "drizzle-orm";

export const documentResumeSectionTable = pgTable("document_resume_section", {
  id: serial("id").primaryKey(),
  documentId: integer("document_id")
    .notNull()
    .references(() => documentTable.id, {
      onDelete: "cascade",
    }), // Foreign key to the document
  resumeSectionId: integer("resume_section_id")
    .notNull()
    .references(() => resumeSectionTable.id, {
      onDelete: "cascade",
    }), // Foreign key to the resume section
  content: json("content").notNull(), // Can be customized content for the document
  isVisible: boolean("is_visible").default(true),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const documentResumeRelations = relations(
  documentResumeSectionTable,
  ({ one }) => ({
    document: one(documentTable, {
      fields: [documentResumeSectionTable.documentId],
      references: [documentTable.id],
    }),
    resumeSection: one(resumeSectionTable, {
      fields: [documentResumeSectionTable.resumeSectionId],
      references: [resumeSectionTable.id],
    }),
  })
);
