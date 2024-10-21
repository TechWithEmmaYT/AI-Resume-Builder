ALTER TABLE "document" ADD COLUMN "theme_color" varchar(255);--> statement-breakpoint
ALTER TABLE "document" ADD COLUMN "current_position" integer DEFAULT 0;