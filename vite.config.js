import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Serves the Vercel functions in `api/` on the dev server, so `npm run dev`
 * behaves like the deployed site. Each `api/<name>.js` answers `/api/<name>`.
 * Environment variables come from `.env` via Vite's own loader.
 */
function vercelApiDev(mode) {
  return {
    name: "vercel-api-dev",
    apply: "serve",
    configureServer(server) {
      Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.match(/^\/api\/([\w-]+)(?:\?|$)/);
        if (!match) return next();
        try {
          const module = await server.ssrLoadModule(`/api/${match[1]}.js`);
          await module.default(req, res);
        } catch (error) {
          server.ssrFixStacktrace(error);
          console.error(error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "Function failed" }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), vercelApiDev(mode)],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
}));
