import type { InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").unique().notNull(),
  email: text("email").notNull(),
  password_hash: text("password_hash").notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

// Schema for selecting a Expenses - can be used to validate API responses
export const selectUserSchema = createSelectSchema(userTable);
export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
