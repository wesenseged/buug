import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
// import { serveStatic } from "hono/bun";
import authRoute from "./route/apiRoute";
import { taskRoute } from "./route/taskRoute";
import projectRoute from "./route/projectRoute";
import noteRoute from "./route/noteRoute";
import { chartRoute } from "./route/chartRoute";

const app = new Hono();

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: "https://buug.vercel.app",
    allowHeaders: ["*"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    credentials: true, // Allow credentials to be included
  })
);

// Handle preflight (OPTIONS) requests
app.options("*", async (c) => {
  c.header("Access-Control-Allow-Origin", "https://buug.vercel.app");
  // c.header("Access-Control-Allow-Origin", "https://buug-client.onrender.com");
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  c.header("Access-Control-Allow-Credentials", "true");
  c.status(204);
});

const routes = app
  .basePath("/api")
  .route("/", authRoute)
  .route("/", taskRoute)
  .route("/", projectRoute)
  .route("/", noteRoute)
  .route("/", chartRoute);
//

// app.get("*", serveStatic({ root: "./client/dist" }));
// app.get("*", serveStatic({ path: "./client/dist/index.html" }));

export type AppType = typeof routes;
export default app;
