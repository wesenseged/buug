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
  cors({
    origin: "https://buug-client.onrender.com/", // Replace with your frontend URL
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// app.get("/favicon.ico", (c) => {
//   return c.body(null, 204);
// });

// app.get("/", (c) => {
//   return c.body("hello world", 200);
// });

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
//
export type AppType = typeof routes;
export default app;
