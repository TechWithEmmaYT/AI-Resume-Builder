DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('archived', 'private', 'public');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "document" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"title" varchar(255) NOT NULL,
	"summary" text,
	"status" "status" DEFAULT 'private',
	"author_name" varchar(255) NOT NULL,
	"author_email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "document_document_id_unique" UNIQUE("document_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "education" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer,
	"university_name" varchar(255),
	"degree" varchar(255),
	"major" varchar(255),
	"description" text,
	"start_date" date,
	"end_date" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer,
	"title" varchar(100),
	"company_name" varchar(100),
	"city" varchar(100),
	"state" varchar(100),
	"currently_working" boolean DEFAULT false,
	"work_summary" varchar(2000),
	"start_date" date,
	"end_date" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "personal_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"job_title" varchar(255),
	"address" varchar(500),
	"phone" varchar(50),
	"email" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer,
	"name" varchar(255),
	"rating" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "education" ADD CONSTRAINT "education_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "experience" ADD CONSTRAINT "experience_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "personal_info" ADD CONSTRAINT "personal_info_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skills" ADD CONSTRAINT "skills_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
