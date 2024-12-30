import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { handleRequest } from "../middleware/session";
import { db } from "../adapter";
import { notesTable } from "../db/schema/note";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { insertNoteSchema } from "@/types/note";

const updateNoteSchema = z.object({
  data: z.string(),
});

const noteRoute = new Hono()
  // Get All NOTES
  .get("/note", handleRequest, async (c) => {
    try {
      const user = c.var.user;
      const notes = await db
        .select()
        .from(notesTable)
        .where(eq(notesTable.userId, user.id.toString()));

      return c.json({ notes }, 200);
    } catch (error) {
      return c.json({ message: "Failed to fetch Notes" }, 400);
    }
  })

  // Create New NOTE
  .post(
    "/note/newNote",
    handleRequest,
    zValidator("json", insertNoteSchema),
    async (c) => {
      try {
        const user = c.var.user;
        const data = c.req.valid("json");

        const note = await db.insert(notesTable).values({
          userId: user.id.toString(),
          title: data.title,
          data: `# ${data.title}`,
          createdAt: data.createdAt.toString(),
        });

        return c.json({ note }, 200);
      } catch (error) {
        return c.json({ message: "Failed to create Note" }, 400);
      }
    }
  )

  // Update NOTE Body
  .put(
    "/note/updateNote/:id",
    handleRequest,
    zValidator("json", updateNoteSchema),
    async (c) => {
      try {
        const id = c.req.param("id");

        const data = c.req.valid("json");

        const noteBody = await db
          .update(notesTable)
          .set({
            data: data.data,
          })
          .where(eq(notesTable.id, Number(id)));

        return c.json(noteBody, 200);
      } catch (error) {
        return c.json({ message: "Error while updating Note" }, 400);
      }
    }
  )

  // Update NOTE Title
  .put(
    "/note/updateTitle/:id",
    handleRequest,
    zValidator("json", insertNoteSchema),
    async (c) => {
      try {
        const id = c.req.param("id");
        const { title } = c.req.valid("json");

        const noteTitle = await db
          .update(notesTable)
          .set({
            title: title,
          })
          .where(eq(notesTable.id, Number(id)));

        return c.json({ noteTitle }, 200);
      } catch (error) {
        return c.json({ message: "Error while updating Title" }, 400);
      }
    }
  )

  // Delete NOTE
  .delete("/note/deleteNote/:id", handleRequest, async (c) => {
    try {
      const id = c.req.param("id");
      const note = await db
        .delete(notesTable)
        .where(eq(notesTable.id, Number(id)));
      return c.json(note, 200);
    } catch (error) {
      return c.json({ message: "Error while deleting" }, 400);
    }
  });

export default noteRoute;
