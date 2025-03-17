import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
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
          target:
            env.VITE_ENV === "production"
              ? env.VITE_API_URL
              : "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },
  };
});
