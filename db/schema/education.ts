import {
  pgTable,
  serial,
  varchar,
  text,
  date,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { documentTable } from "./document";
import { relations } from "drizzle-orm";

export const educationTable = pgTable("education", {
  id: serial("id").primaryKey(),
  docId: integer("document_id")
    .references(() => documentTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  universityName: varchar("university_name", { length: 255 }),
  degree: varchar("degree", { length: 255 }),
  major: varchar("major", { length: 255 }),
  description: text("description"),
  startDate: date("start_date"),
  endDate: date("end_date"),
});

export const educationRelations = relations(educationTable, ({ one }) => ({
  document: one(documentTable, {
    fields: [educationTable.docId],
    references: [documentTable.id],
  }),
}));

export const educationTableSchema = createInsertSchema(educationTable).pick({
  universityName: true,
  degree: true,
  major: true,
  description: true,
  startDate: true,
  endDate: true,
});

export type EducationSchema = z.infer<typeof educationTableSchema>;
