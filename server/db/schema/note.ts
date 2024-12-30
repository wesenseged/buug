import { serial, text, pgTable } from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  data: text("desc"),
  createdAt: text("created_at").notNull(),
});

export type Note = {
  id: number;
  userId: string;
  title: string;
  data: string | null;
  createdAt: string;
};
