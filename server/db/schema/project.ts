import { serial, text, pgTable, jsonb } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(),
  tasks: jsonb("tasks").default([]),
  priority: text("priority").notNull(),
  createdAt: text("created_at").notNull(),
  dueAt: text("due_at").notNull(),
});

export type Project = {
  id: number;
  userId: string;
  title: string;
  description: string;
  status: string;
  tasks: Array<{ title: string; desc: string }>;
  priority: string;
  createdAt: string;
  dueAt: string;
};
