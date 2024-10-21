ALTER TABLE "document" ALTER COLUMN "theme_color" SET DEFAULT '#7c3aed';--> statement-breakpoint
ALTER TABLE "document" ALTER COLUMN "theme_color" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "document" ALTER COLUMN "current_position" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "document" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "experience" ALTER COLUMN "currently_working" SET NOT NULL;