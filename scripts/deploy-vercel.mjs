import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const token = process.env.VERCEL_TOKEN;
const root = process.cwd();
const projectName = process.env.VERCEL_PROJECT_NAME || "acoustic-steps";

if (!token) {
  console.error("Missing VERCEL_TOKEN. Set it in your shell before running this script.");
  process.exit(1);
}

const ignored = new Set([".git", ".vercel", "node_modules", "scripts", "data"]);
const ignoredFiles = new Set([".env", ".env.local"]);
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".mjs",
  ".svg",
  ".txt",
  ".webmanifest"
]);

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    if (ignoredFiles.has(entry.name) || entry.name.endsWith(".log")) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await listFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function toVercelPath(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, "/");
}

async function createDeployment() {
  const diskFiles = await listFiles(root);
  const files = await Promise.all(diskFiles.map(async (filePath) => {
    const extension = path.extname(filePath).toLowerCase();
    const data = await readFile(filePath);
    const isText = textExtensions.has(extension);

    return {
      file: toVercelPath(filePath),
      data: isText ? data.toString("utf8") : data.toString("base64"),
      encoding: isText ? "utf-8" : "base64"
    };
  }));

  const response = await fetch("https://api.vercel.com/v13/deployments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: projectName,
      target: "preview",
      files,
      projectSettings: {
        framework: null,
        buildCommand: null,
        devCommand: null,
        installCommand: null,
        outputDirectory: null,
        nodeVersion: "24.x"
      },
      meta: {
        source: "codex-static-preview"
      }
    })
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  const url = result.url?.startsWith("http") ? result.url : `https://${result.url}`;
  console.log(url);
}

createDeployment().catch((error) => {
  console.error(error);
  process.exit(1);
});
