import {
  pgTable,
  serial,
  varchar,
  boolean,
  date,
  integer,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { documentTable } from "./document";
import { relations } from "drizzle-orm";

export const experienceTable = pgTable("experience", {
  id: serial("id").primaryKey(),
  docId: integer("document_id")
    .references(() => documentTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  title: varchar("title", { length: 100 }),
  companyName: varchar("company_name", { length: 100 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  currentlyWorking: boolean("currently_working").notNull().default(false),
  workSummary: text("work_summary"),
  startDate: date("start_date"),
  endDate: date("end_date"), // Can be null if currently working
});

export const experienceRelations = relations(experienceTable, ({ one }) => ({
  document: one(documentTable, {
    fields: [experienceTable.docId],
    references: [documentTable.id],
  }),
}));

export const experienceTableSchema = createInsertSchema(experienceTable).pick({
  title: true,
  companyName: true,
  city: true,
  state: true,
  currentlyWorking: true,
  workSummary: true,
  startDate: true,
  endDate: true,
});

export type ExperienceSchema = z.infer<typeof experienceTableSchema>;
