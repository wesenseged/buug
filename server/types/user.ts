import { z } from "zod";

export const insertUserSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  password_hash: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const loginUserSchema = z.object({
  id: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email({ message: "Invalid email" }),
  password_hash: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
