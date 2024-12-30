import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "../adapter";
import { tasks as tasksTable } from "../db/schema/task";
import { insertTaskSchema } from "../types/task";

import { eq } from "drizzle-orm";
import { desc } from "drizzle-orm";
import { handleRequest } from "../middleware/session";
import { projects } from "../db/schema/project";

export const newTaskSchema = insertTaskSchema.omit({ userId: true });

export type newTask = z.infer<typeof newTaskSchema>;

export const taskRoute = new Hono()
  // Read
  .get("/task", handleRequest, async (c) => {
    try {
      const userId = c.var.user;
      const task = await db
        .select()
        .from(tasksTable)
        .where(eq(tasksTable.userId, userId.id.toString()))
        .orderBy(desc(tasksTable.createdAt))
        .limit(100);
      return c.json({ task });
    } catch (error) {
      return c.text("Internal Server Error", 500);
    }
  })
  .get("/task/:id", handleRequest, async (c) => {
    try {
      const id = c.req.param("id");
      const res = await db
        .select()
        .from(tasksTable)
        .where(eq(tasksTable.id, Number(id)))
        .limit(1);
      return c.json(res, 200);
    } catch (error) {
      return c.json({ message: error }, 401);
    }
  })

  // Create
  .post(
    "/task/create",
    handleRequest,
    zValidator("json", insertTaskSchema),
    async (c) => {
      try {
        const user = c.get("user");
        const data = c.req.valid("json");

        const validatedTask = insertTaskSchema.parse({
          title: data.title,
          desc: data.desc,
          type: data.type,
          createdAt: data.createdAt,
          dueAt: data.dueAt,
          userId: user.id.toString(),
        });

        const result = await db
          .insert(tasksTable)
          .values(validatedTask)
          .returning()
          .then((res) => res[0]);

        const project = await db
          .select()
          .from(projects)
          .where(eq(projects.title, result.type));

        if (project && project.length > 0) {
          const existingTasks = Array.isArray(project[0].tasks)
            ? project[0].tasks
            : []; // Ensure it's an array
          const updatedTasks = [
            ...existingTasks,
            { title: result.title, desc: result.desc },
          ];
          await db
            .update(projects)
            .set({ tasks: updatedTasks })
            .where(eq(projects.id, project[0].id));
        }

        c.status(201);
        return c.json(result);
      } catch (error) {
        const message = "Duplicated title";
        return c.json({ message }, 400);
      }
    }
  )

  // Delete
  .delete("/task/delete/:id", handleRequest, async (c) => {
    try {
      const id = c.req.param("id");
      if (!id) {
        return c.text("Bad request", 400);
      }
      const task = await db
        .delete(tasksTable)
        .where(eq(tasksTable.id, Number(id)));

      if (task) {
        return c.json(task, 200);
      } else {
        return c.json({ message: "There is no task with the given id." }, 400);
      }
    } catch (error) {
      return c.text("Bad request", 400);
    }
  });
