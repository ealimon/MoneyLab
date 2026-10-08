import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// The production bundle (dist/server.cjs) must never boot the Vite dev server,
// even when the host doesn't set NODE_ENV.
const isProduction =
  process.env.NODE_ENV === "production" ||
  path.basename(process.argv[1] ?? "") === "server.cjs";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Serve static assets in production, else let Vite handle it in dev
  if (!isProduction) {
    // Imported lazily so the production bundle doesn't need vite at runtime.
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Financial Literacy Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Server startup crashed:", err);
  process.exit(1);
});
