import { Hono } from "hono";
import { eq, and, desc } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { getAuthUser } from "@/lib/kinde";
import {
  DocumentSchema,
  documentTable,
  createDocumentTableSchema,
  updateCombinedSchema,
  UpdateDocumentSchema,
} from "@/db/schema/document";
import { generateDocUUID } from "@/lib/helper";
import { db } from "@/db";
import { z } from "zod";
import {
  educationTable,
  experienceTable,
  personalInfoTable,
  skillsTable,
} from "@/db/schema";

const documentRoute = new Hono()
  .post(
    "/create",
    zValidator("json", createDocumentTableSchema),
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
  .patch(
    "/update/:documentId",
    zValidator(
      "param",
      z.object({
        documentId: z.string(),
      })
    ),
    zValidator("json", updateCombinedSchema),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const { documentId } = c.req.valid("param");

        const {
          title,
          summary,
          themeColor,
          currentPosition,
          personalInfo,
          experience,
          education,
          skills,
        } = c.req.valid("json");
        const userId = user.id;

        if (!documentId) {
          return c.json({ error: "DocumentId status" }, 400);
        }

        await db.transaction(async (trx) => {
          // Update resume document
          const resumeUpdate = {} as UpdateDocumentSchema;
          if (title) resumeUpdate.title = title;
          if (summary) resumeUpdate.summary = summary;
          if (themeColor) resumeUpdate.themeColor = themeColor;
          if (currentPosition)
            resumeUpdate.currentPosition = currentPosition || 1;

          const [documentData] = await trx
            .update(documentTable)
            .set(resumeUpdate)
            .where(
              and(
                eq(documentTable.documentId, documentId),
                eq(documentTable.userId, userId)
              )
            )
            .returning();

          if (!documentData) {
            return c.json({ error: "Document not found" }, 404);
          }

          if (personalInfo) {
            if (!personalInfo.firstName && !personalInfo.lastName) {
              console.warn("Skipping empty experience record:");
              return; // Skip empty experience records
            }
            const exists = await trx
              .select()
              .from(personalInfoTable)
              .where(eq(personalInfoTable.docId, documentData.id))
              .limit(1);

            if (exists.length > 0) {
              // Update if the record exists
              await trx
                .update(personalInfoTable)
                .set(personalInfo)
                .where(eq(personalInfoTable.docId, documentData.id));
            } else {
              // Insert if the record does not exist
              await trx
                .insert(personalInfoTable)
                .values({ docId: documentData.id, ...personalInfo });
            }
          }

          if (experience) {
            const existingExperiences = await trx
              .select()
              .from(experienceTable)
              .where(eq(experienceTable.docId, documentData.id));

            const existingCompanyNames = new Set(
              existingExperiences.map((exp) => exp.companyName)
            );
            for (const exp of experience) {
              if (!exp.companyName && !exp.title) {
                console.warn("Skipping empty experience record:", exp);
                continue; // Skip empty experience records
              }
              if (existingCompanyNames.has(exp.companyName || "")) {
                // Update if the experience record exists
                await trx
                  .update(experienceTable)
                  .set(exp)
                  .where(
                    and(
                      eq(experienceTable.docId, documentData.id),
                      eq(experienceTable.companyName, exp.companyName || "")
                    )
                  );
              } else {
                // Insert if the experience record does not exist
                await trx
                  .insert(experienceTable)
                  .values({ docId: documentData.id, ...exp });
              }
            }
          }

          if (education) {
            const existingEducations = await trx
              .select()
              .from(educationTable)
              .where(eq(educationTable.docId, documentData.id));

            const existingUniversityNames = new Set(
              existingEducations.map((edu) => edu.universityName)
            );

            for (const edu of education) {
              if (!edu.universityName) {
                console.warn("Skipping empty education record:", edu);
                continue; // Skip empty records
              }

              const upsertData = { docId: documentData.id, ...edu };
              const query = existingUniversityNames.has(
                edu.universityName || ""
              )
                ? trx
                    .update(educationTable)
                    .set(edu)
                    .where(
                      and(
                        eq(educationTable.docId, documentData.id),
                        eq(
                          educationTable.universityName,
                          edu.universityName || ""
                        )
                      )
                    )
                : trx.insert(educationTable).values(upsertData);
              await query; // Execute the upsert operation
            }
          }

          if (skills) {
            const existingSkills = await trx
              .select()
              .from(skillsTable)
              .where(eq(skillsTable.docId, skillsTable.id));

            const existingNames = new Set(
              existingSkills.map((skill) => skill.name)
            );

            for (const skill of skills) {
              if (!skill.name) {
                console.warn("Skipping empty skill record:");
                continue; // Skip empty records
              }

              const upsertData = { docId: documentData.id, ...skill };
              const query = existingNames.has(skill.name || "")
                ? trx
                    .update(skillsTable)
                    .set(skill)
                    .where(
                      and(
                        eq(skillsTable.docId, documentData.id),
                        eq(skillsTable.name, skill.name || "")
                      )
                    )
                : trx.insert(skillsTable).values(upsertData);
              await query; // Execute the upsert operation
            }
          }
        });

        return c.json(
          {
            success: "ok",
            message: "Updated successfully",
          },
          { status: 200 }
        );
      } catch (error) {
        console.log(error);
        return c.json(
          {
            success: false,
            message: "Failed to update document",
            error: error,
          },
          500
        );
      }
    }
  )
  .get("/recent", getAuthUser, async (c) => {
    try {
      const user = c.get("user");
      const userId = user.id;
      // Fetch documents with pagination
      const documents = await db
        .select()
        .from(documentTable)
        .orderBy(desc(documentTable.updatedAt))
        .where(eq(documentTable.userId, userId))
        .limit(5);

      return c.json({
        success: true,
        data: documents,
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
  })
  .get(
    "/:documentId",
    zValidator(
      "param",
      z.object({
        documentId: z.string(),
      })
    ),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const { documentId } = c.req.valid("param");

        const userId = user.id;
        const documentData = await db.query.documentTable.findFirst({
          where: and(
            eq(documentTable.userId, userId),
            eq(documentTable.documentId, documentId)
          ),
          with: {
            personalInfo: true,
            experiences: true,
            educations: true,
            skills: true,
          },
        });

        // const [documentData] = await db
        //   .select({
        //     id: documentTable.id,
        //     documentId: documentTable.documentId,
        //     title: documentTable.title,
        //     summary: documentTable.summary,
        //     status: documentTable.status,
        //     personalInfo: personalInfoTable,
        //     experiences: experienceTable,
        //     educations: educationTable,
        //     skills: skillsTable,
        //   })
        //   .from(documentTable)
        //   .leftJoin(
        //     personalInfoTable,
        //     eq(documentTable.id, personalInfoTable.docId)
        //   )
        //   .leftJoin(
        //     experienceTable,
        //     eq(documentTable.id, experienceTable.docId)
        //   )
        //   .leftJoin(educationTable, eq(documentTable.id, educationTable.docId))
        //   .leftJoin(skillsTable, eq(documentTable.id, skillsTable.docId))
        //   .where(
        //     and(
        //       eq(documentTable.userId, userId),
        //       eq(documentTable.documentId, documentId)
        //     )
        //   );

        return c.json({
          success: true,
          data: documentData,
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
    }
  );
// .get(
//   "/:status/all",
//   zValidator(
//     "param",
//     z.object({
//       status: z.enum(["archived", "private", "public"]),
//     })
//   ),
//   getAuthUser,
//   async (c) => {
//     try {
//       const user = c.get("user");
//       const { status } = c.req.valid("param");
//       const userId = user.id;
//       // Calculate offset for pagination
//       // Fetch documents with pagination
//       if (!status) {
//         return c.json({ error: "Missing status" }, 400);
//       }

//       const documents = await db
//         .select({
//           id: documentTable.id,
//           documentId: documentTable.documentId,
//           title: documentTable.title,
//           status: documentTable.status,
//           updatedAt: documentTable.updatedAt,
//         })
//         .from(documentTable)
//         .where(
//           and(
//             eq(documentTable.userId, userId),
//             eq(documentTable.status, status)
//           )
//         );

//       return c.json({
//         success: true,
//         data: documents,
//       });
//     } catch (error) {
//       return c.json(
//         {
//           success: false,
//           message: "Failed to fetch documents",
//           error: error,
//         },
//         500
//       );
//     }
//   }
// );

export default documentRoute;

// .get("/all", getAuthUser, async (c) => {
//   try {
//     const user = c.get("user");
//     const userId = user.id;
//     // Get pagination parameters from query
//     const page = parseInt(c.req.query("page") || "1", 10);
//     const limit = parseInt(c.req.query("limit") || "10", 10);
//     // Calculate offset for pagination
//     const offset = (page - 1) * limit;

//     // Fetch documents with pagination
//     const documents = await db
//       .select()
//       .from(documentTable)
//       .where(eq(documentTable.userId, userId))
//       .limit(limit)
//       .offset(offset);

//     const result = await db
//       .select({ count: count() })
//       .from(documentTable)
//       .where(eq(documentTable.userId, userId));

//     const totalCount = result?.[0]?.count;

//     return c.json({
//       success: true,
//       data: documents,
//       pagination: {
//         page, // Current page
//         pageSize: limit, // Number of documents per page
//         totalElements: totalCount, // Total number of documents
//         totalPages: Math.ceil(totalCount / limit), // Total pages
//         hasMore: page * limit < totalCount, // Check if more documents are available
//       },
//     });
//   } catch (error) {
//     return c.json(
//       {
//         success: false,
//         message: "Failed to fetch documents",
//         error: error,
//       },
//       500
//     );
//   }
// });
