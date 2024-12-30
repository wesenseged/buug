import { insertChartSchema } from "@/types/chart";
import { db } from "../adapter";
import { chartTable } from "../db/schema/chart";
import { handleRequest } from "../middleware/session";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

export const chartRoute = new Hono()

  .get("/chart", handleRequest, async (c) => {
    try {
      const res = await db.select().from(chartTable);
      return c.json(res, 200);
    } catch (e) {
      return c.json({ message: e }, 401);
    }
  })
  .post(
    "/chart/add",
    handleRequest,
    zValidator("json", insertChartSchema),
    async (c) => {
      try {
        const user = c.get("user");
        const data = c.req.valid("json");

        const validatedChart = insertChartSchema.parse({
          id: data.id,
          date: data.date,
          completed: data.completed,
          uncompleted: data.uncompleted,
          userId: user.id.toString(),
        });

        const existingChart = await db
          .select()
          .from(chartTable)
          .where(eq(chartTable.date, validatedChart.date));

        if (existingChart.length > 0) {
          const chart = existingChart[0];
          const res = await db
            .update(chartTable)
            .set({
              completed: validatedChart.completed! + chart.completed!,
              uncompleted: validatedChart.uncompleted! + chart.uncompleted!,
            })
            .where(eq(chartTable.date, validatedChart.date));
          return c.json(res, 200);
        }

        const res = await db.insert(chartTable).values(validatedChart);

        return c.json(res, 200);
      } catch (e) {
        return c.json({ message: e }, 401);
      }
    }
  );
