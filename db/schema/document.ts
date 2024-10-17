import {
  timestamp,
  pgTable,
  serial,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const statusEnum = pgEnum("status", ["archived", "published"]);

export const documentTable = pgTable("document", {
  id: serial("id").notNull().primaryKey(),
  documentId: varchar("document_id").unique().notNull(),
  userId: varchar("user_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  status: statusEnum("status").default("published"),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  authorEmail: varchar("author_email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const documentTableSchema = createInsertSchema(documentTable, {
  title: (schema) => schema.title.min(1),
}).pick({
  title: true,
});

export type DocumentSchema = z.infer<typeof documentTableSchema>;

export type NewDocumentModel = InferInsertModel<typeof documentTable>;
export type SelectDocumentModel = InferSelectModel<typeof documentTable>;
