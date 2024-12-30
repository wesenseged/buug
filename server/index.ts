import app from "./app";

const port = process.env.PORT || 3333;
const server = Bun.serve({
  port: port,
  hostname: "0.0.0.0",
  fetch: app.fetch,
});

console.log("🚀 server running", server.port);
