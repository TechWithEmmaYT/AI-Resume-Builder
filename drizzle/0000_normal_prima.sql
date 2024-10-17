DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('archived', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "document" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"title" varchar(255) NOT NULL,
	"status" "status" DEFAULT 'published',
	"author_name" varchar(255) NOT NULL,
	"author_email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "document_document_id_unique" UNIQUE("document_id")
);