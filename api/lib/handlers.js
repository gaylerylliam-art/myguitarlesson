import { authConfig, getUserFromRequest } from "./auth.js";
import { getStorageInfo, getUserState, recordPracticeEvent, saveUserState } from "./db.js";

export async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

export async function handleAuthConfig(req, res) {
  if (req.method !== "GET") return sendJson(res, 405, { error: "Method not allowed" });
  sendJson(res, 200, {
    ...authConfig(),
    storage: getStorageInfo()
  });
}

export async function handleState(req, res) {
  const user = await getUserFromRequest(req);

  if (req.method === "GET") {
    return sendJson(res, 200, {
      user,
      state: getUserState(user.sub),
      storage: getStorageInfo()
    });
  }

  if (req.method === "PUT") {
    const body = await readJson(req);
    const saved = saveUserState(user.sub, body.state || {});
    return sendJson(res, 200, { user, state: saved });
  }

  return sendJson(res, 405, { error: "Method not allowed" });
}

export async function handlePractice(req, res) {
  const user = await getUserFromRequest(req);

  if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" });

  const body = await readJson(req);
  const minutes = Math.max(1, Number(body.minutes || 1));
  const focus = String(body.focus || "Practice").slice(0, 80);
  recordPracticeEvent(user.sub, minutes, focus);

  const current = getUserState(user.sub);
  const today = new Date().toISOString().slice(0, 10);
  const practiceLog = [...(current.practiceLog || [])];
  const existing = practiceLog.find((entry) => entry.date === today);

  if (existing) {
    existing.minutes += minutes;
    existing.focus = focus;
  } else {
    practiceLog.push({ date: today, minutes, focus });
  }

  const saved = saveUserState(user.sub, { ...current, practiceLog });
  sendJson(res, 200, { user, state: saved });
}

export function handleError(res, error) {
  const status = error.status || 500;
  sendJson(res, status, {
    error: status === 500 ? "Server error" : error.message
  });
}
