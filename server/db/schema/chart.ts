import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const chartTable = pgTable("chart", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  date: text("date").notNull(),
  completed: integer("completed").notNull().default(0),
  uncompleted: integer("uncompleted").notNull().default(0),
});

export type Chart = {
  id: number;
  userId: string | null;
  date: string;
  completed: number;
  uncompleted: number;
};
