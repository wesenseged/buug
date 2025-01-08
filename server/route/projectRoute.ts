import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { handleRequest } from "../middleware/session";
import { db } from "../adapter";
import { projects } from "../db/schema/project";
import { eq } from "drizzle-orm";
import { insertProjectSchema, selectProjectSchema } from "@/types/project";

// Read
const projectRoute = new Hono()

  .get("/project", handleRequest, async (c) => {
    try {
      const user = c.get("user");
      const project = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, user.id.toString()));
      return c.json(project, 200);
    } catch (error) {
      return c.text("Internal Server Error", 500);
    }
  })

  // Create
  .post(
    "/project/createPro",
    handleRequest,
    zValidator("json", insertProjectSchema),
    async (c) => {
      try {
        const user = c.get("user");
        const data = c.req.valid("json");

        const validatedProject = {
          ...data,
          userId: user.id.toString(),
        };
        const result = await db.insert(projects).values(validatedProject);

        return c.json(result, 200);
      } catch (error) {
        const message = "incalid data";
        return c.json({ message, error }, 400);
      }
    }
  )

  // Update
  .put(
    "/project/updatePro/:id",
    handleRequest,
    zValidator("json", insertProjectSchema),
    async (c) => {
      try {
        const id = c.req.param("id");
        const data = c.req.valid("json");
        const project = await db
          .update(projects)
          .set(data)
          .where(eq(projects.id, Number(id)));
        if (!project) {
          return c.json({ message: "Bad request" }, 400);
        }
        const updatedProject = await db
          .select()
          .from(projects)
          .where(eq(projects.id, Number(id)));

        // const updatedProject = await projectModel.findById(id);
        return c.json(updatedProject, 200);
      } catch (error) {
        return c.json({ message: "Error found" }, 500);
      }
    }
  )

  // Delete
  .delete("/project/deletePro/:id", handleRequest, async (c) => {
    try {
      const id = c.req.param("id");
      if (!id) {
        return c.text("Bad request", 400);
      }
      const project = await db
        .delete(projects)
        .where(eq(projects.id, Number(id)));
      if (project) {
        return c.json(project, 200);
      } else {
        return c.json(
          { message: "There is no project with the given id." },
          400
        );
      }
    } catch (error) {
      return c.text("Bad request", 400);
    }
  });

export default projectRoute;
