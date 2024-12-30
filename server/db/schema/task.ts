import { serial, index, text, pgTable } from "drizzle-orm/pg-core";

export const tasks = pgTable(
  "tasks",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id"),
    title: text("title").notNull(),
    desc: text("desc").notNull(),
    type: text("type").notNull(),
    createdAt: text("created_at"),
    dueAt: text("due_at"),
  },
  (tasks) => {
    return {
      userId: index("user_id_idx").on(tasks.userId),
    };
  }
);

export type Task = {
  id: number;
  userId: string | null;
  title: string;
  desc: string;
  type: string;
  createdAt: string | null;
  dueAt: string | null;
};
