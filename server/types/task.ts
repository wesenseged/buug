import { z } from "zod";

export const insertTaskSchema = z.object({
  userId: z.string().optional(),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  desc: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
  type: z.string(),
  createdAt: z.string().optional(),
  dueAt: z.string().optional(),
});

export const selectTaskSchema = z.object({
  id: z.number(),
  userId: z.string().optional(),
  title: z.string(),
  desc: z.string(),
  type: z.string(),
  createdAt: z.string().optional(),
  dueAt: z.string().optional(),
});

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type SelectTask = z.infer<typeof selectTaskSchema>;
