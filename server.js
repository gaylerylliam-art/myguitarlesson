import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { handleAuthConfig, handleError, handlePractice, handleState, sendJson } from "./api/lib/handlers.js";

const root = process.cwd();
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json"
};

async function serveStatic(req, res, pathname) {
  const requested = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.resolve(root, `.${decodeURIComponent(requested)}`);

  if (!filePath.startsWith(root)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  try {
    const data = await readFile(filePath);
    res.statusCode = 200;
    res.setHeader("Content-Type", types[path.extname(filePath)] || "application/octet-stream");
    res.end(data);
  } catch {
    const index = await readFile(path.join(root, "index.html"));
    res.statusCode = 200;
    res.setHeader("Content-Type", types[".html"]);
    res.end(index);
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || `${host}:${port}`}`);

  try {
    if (url.pathname === "/api/auth-config") return await handleAuthConfig(req, res);
    if (url.pathname === "/api/state") return await handleState(req, res);
    if (url.pathname === "/api/practice") return await handlePractice(req, res);
    if (url.pathname.startsWith("/api/")) return sendJson(res, 404, { error: "API route not found" });
    await serveStatic(req, res, url.pathname);
  } catch (error) {
    handleError(res, error);
  }
});

server.listen(port, host, () => {
  console.log(`Acoustic Steps running at http://${host}:${port}`);
});
