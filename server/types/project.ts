import { z } from "zod";

// Define the task schema
export const taskSchema = z.object({
  title: z.string(),
  desc: z.string(),
});

// Define the project schema for inserting data
export const insertProjectSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
  status: z.string(),
  priority: z.string(),
  tasks: z.array(taskSchema).default([]).optional(),
  createdAt: z.string(),
  dueAt: z.string(),
});

// Define the project schema for selecting data
export const selectProjectSchema = z.object({
  id: z.number(),
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  tasks: z.array(taskSchema).optional(),
  priority: z.string(),
  createdAt: z.string(),
  dueAt: z.string(),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type SelectProject = z.infer<typeof selectProjectSchema>;
