import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { userTable } from "../db/schema/user";
import { insertUserSchema, loginUserSchema } from "../types/user";
import { db } from "../adapter";
import postgres from "postgres";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";
import { getCookie } from "hono/cookie";
import { handleRequest } from "../middleware/session";
import {
  createSession,
  deleteSessionTokenCookie,
  generateSessionToken,
  invalidateSession,
  setSessionTokenCookie,
  validateSessionToken,
  type SessionValidationResult,
} from "../lucia";

const authRoute = new Hono()
  .post("/register", zValidator("json", insertUserSchema), async (c) => {
    const data = c.req.valid("json");
    const userId = crypto.randomUUID().toString();
    const password = await Bun.password.hash(data.password_hash);
    try {
      await db.insert(userTable).values({
        id: userId,
        username: data.username,
        email: data.email,
        password_hash: password,
      });
      const token = generateSessionToken();
      const sesstion = await createSession(token, userId);
      setSessionTokenCookie(c, token, sesstion.expiresAt);
      return c.json({ message: "User Created" }, 201);
    } catch (error) {
      if (error instanceof postgres.PostgresError && error.code === "23505") {
        throw new HTTPException(409, { message: "User name Already taken" });
      }
      throw new HTTPException(500, { message: "unabel to create user" });
    }
  })
  .post("/login", zValidator("json", loginUserSchema), async (c) => {
    const data = c.req.valid("json");
    const [existingUser] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, data.email));
    if (!existingUser) {
      throw new HTTPException(401, { message: "email does not exist!" });
    }

    const passwordValidation = await Bun.password.verify(
      data.password_hash,
      existingUser.password_hash
    );
    if (!passwordValidation) {
      throw new HTTPException(401, { message: "invalid credential" });
    }

    const token = getCookie(c, "session");
    if (token !== null || token !== undefined) {
      const newToken = generateSessionToken();
      const session = await createSession(newToken, existingUser.id);
      setSessionTokenCookie(c, newToken, session.expiresAt);
      return c.json({ message: "User Logged in" }, 201);
    }
    const { session, user }: SessionValidationResult =
      await validateSessionToken(token!);
    setSessionTokenCookie(
      c,
      token!,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    );
    return c.json({ session, user }, 201);
  })
  .get("/logout", async (c) => {
    const sessionId = getCookie(c, "session") ?? null;

    if (!sessionId) {
      c.status(401);
      return c.json({ error: "Unauthorized" });
    }

    await invalidateSession(sessionId);

    deleteSessionTokenCookie(c);
    c.redirect("/");
    return c.json({ message: "Logged out successfully" });
  })
  .get("/me", handleRequest, async (c) => {
    const user = c.var.user;
    return c.json({ user: { name: user.username, email: user.email } }, 201);
  });

export default authRoute;
