import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["pg", "drizzle-orm/pg-core", "drizzle-orm", "drizzle-zod"],
    },
  },
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dir, "./src"),
      "@server": path.resolve(import.meta.dir, "../server/"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://buug-zh5y.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
