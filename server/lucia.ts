import { userTable, sessionTable } from "./db/schema/user.js";
import { eq } from "drizzle-orm";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

import type { User, Session } from "./db/schema/user.js";
import { db } from "./adapter";

import { type Context } from "hono";

const env = process.env.NODE_ENV || "production";
// add Lax instead of None

// Generate Token
export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

// Create Sesstion
export async function createSession(
  token: string,
  userId: string,
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await db.insert(sessionTable).values(session);
  return session;
}

// Validate Sesstion
export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId));
  if (result.length < 1) {
    return { session: null, user: null };
  }
  const { user, session } = result[0];
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await db
      .update(sessionTable)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(sessionTable.id, session.id));
  }
  return { session, user };
}

// Invalidate Sesstion
export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

// Function to set the session token cookie
export function setSessionTokenCookie(
  c: Context,
  token: string,
  expiresAt: Date,
): void {
  const cookie = `session=${token}; HttpOnly; Expires=${expiresAt.toUTCString()}; Path=/; ${
    env === "production" ? "SameSite=None; Secure;" : "SameSite=Lax;"
  }`;

  c.header("Set-Cookie", cookie);
}

// Function to delete the session token cookie
export function deleteSessionTokenCookie(c: Context): void {
  const cookie = `session=; HttpOnly;  Max-Age=0; Path=/; ${
    env === "production" ? "SameSite=None; Secure;" : "SameSite=Lax;"
  }`;

  c.header("Set-Cookie", cookie);
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
