import { Hono } from "hono";
import { count, eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { getAuthUser } from "@/lib/kinde";
import {
  DocumentSchema,
  documentTable,
  documentTableSchema,
} from "@/db/schema/document";
import { generateDocUUID } from "@/lib/helper";
import { db } from "@/db";

const documentRoute = new Hono()
  .post(
    "/create",
    zValidator("json", documentTableSchema),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const { title } = c.req.valid("json") as DocumentSchema;
        const userId = user.id;
        const authorName = `${user.given_name} ${user?.family_name}`;
        const authorEmail = user.email as string;
        const documentId = generateDocUUID();

        const newDoc = {
          title: title || "Untitled",
          userId: userId,
          documentId: documentId,
          authorName: authorName,
          authorEmail: authorEmail,
        };

        const [data] = await db
          .insert(documentTable)
          .values(newDoc)
          .returning();

        return c.json(
          {
            success: "ok",
            data,
          },
          { status: 200 }
        );
      } catch (error) {
        return c.json(
          {
            success: false,
            message: "Failed to create document",
            error: error,
          },
          500
        );
      }
    }
  )
  .get("/all", getAuthUser, async (c) => {
    try {
      const user = c.get("user");
      const userId = user.id;
      // Get pagination parameters from query
      const page = parseInt(c.req.query("page") || "1", 10);
      const limit = parseInt(c.req.query("limit") || "10", 10);
      // Calculate offset for pagination
      const offset = (page - 1) * limit;

      // Fetch documents with pagination
      const documents = await db
        .select()
        .from(documentTable)
        .where(eq(documentTable.userId, userId))
        .limit(limit)
        .offset(offset);

      // Check if there are more documents
      // const [{ count }] = await db
      //   .select({ count: sql`COUNT(*)` })
      //   .from(documentTable)
      //   .where(eq(documentTable.userId, userId));

      const result = await db
        .select({ count: count() })
        .from(documentTable)
        .where(eq(documentTable.userId, userId));

      const totalCount = result?.[0]?.count;

      return c.json({
        success: true,
        data: documents,
        pagination: {
          page, // Current page
          pageSize: limit, // Number of documents per page
          totalElements: totalCount, // Total number of documents
          totalPages: Math.ceil(totalCount / limit), // Total pages
          hasMore: page * limit < totalCount, // Check if more documents are available
        },
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to fetch documents",
          error: error,
        },
        500
      );
    }
  });

export default documentRoute;
