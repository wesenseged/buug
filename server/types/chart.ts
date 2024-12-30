import { z } from "zod";

export const insertChartSchema = z.object({
  userId: z.string().optional(),
  id: z.number().optional(),
  date: z.string(),
  completed: z.number().default(0),
  uncompleted: z.number().default(0),
});

export const selectChartSchema = z.object({
  id: z.number(),
  userId: z.string().optional(),
  date: z.string(),
  completed: z.number().default(0),
  uncompleted: z.number().default(0),
});

export type InsertChart = z.infer<typeof insertChartSchema>;
export type SelectChart = z.infer<typeof selectChartSchema>;
