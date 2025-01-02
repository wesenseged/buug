import {
  validateSessionToken,
  deleteSessionTokenCookie,
  setSessionTokenCookie,
} from "../lucia";
import { type User } from "../db/schema/user";
import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";

type Env = {
  Variables: {
    user: User;
  };
};

export const handleRequest = createMiddleware<Env>(async (c, next) => {
  try {
    if (c.req.method !== "GET") {
      const origin = c.req.header("Origin");
      if (!origin || origin !== "https://buug.vercel.app/") {
        c.status(403);
        return c.json({ message: "Forbidden" });
      }
    }

    const token = getCookie(c, "session");

    if (token === null) {
      return c.text("Unauthorized: No Session Token", 401);
    }

    const { session, user } = await validateSessionToken(token!);
    if (!session && !user) {
      deleteSessionTokenCookie(c);
      return c.json({ user: user });
    }
    // Renew session cookie if valid
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days expiration
    setSessionTokenCookie(c, token!, expiresAt);
    c.set("user", user);

    await next();
  } catch (error) {
    throw new HTTPException(500, { message: "500 no internet" });
  }
});
