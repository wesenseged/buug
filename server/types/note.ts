import { z } from "zod";

export const insertNoteSchema = z.object({
  userId: z.string().optional(),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  data: z.string().optional(),
  createdAt: z.string(),
});

export const selectNoteSchema = z.object({
  id: z.number(),
  userId: z.string(),
  title: z.string(),
  data: z.string().optional(),
  createdAt: z.string(),
});

export type InsertNote = z.infer<typeof insertNoteSchema>;
export type SelectNote = z.infer<typeof selectNoteSchema>;
