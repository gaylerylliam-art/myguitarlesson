import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const isVercel = Boolean(process.env.VERCEL);
const dbDir = isVercel ? "/tmp" : path.join(process.cwd(), "data");
const dbPath = process.env.SQLITE_PATH || path.join(dbDir, "acoustic-steps.sqlite");

mkdirSync(dbDir, { recursive: true });

const db = new DatabaseSync(dbPath);
db.exec(`
  CREATE TABLE IF NOT EXISTS user_state (
    user_id TEXT PRIMARY KEY,
    state_json TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS practice_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    minutes INTEGER NOT NULL,
    focus TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const fallbackState = {
  seenWelcome: true,
  completedLessons: [],
  favorites: [],
  practiceLog: [],
  reminderOn: false,
  reminderTime: "18:30",
  offlineAccess: true,
  dailyGoal: 15
};

export function getUserState(userId) {
  const row = db.prepare("SELECT state_json FROM user_state WHERE user_id = ?").get(userId);
  if (!row) return fallbackState;

  try {
    return { ...fallbackState, ...JSON.parse(row.state_json) };
  } catch {
    return fallbackState;
  }
}

export function saveUserState(userId, state) {
  const normalized = { ...fallbackState, ...state };
  db.prepare(`
    INSERT INTO user_state (user_id, state_json, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id) DO UPDATE SET
      state_json = excluded.state_json,
      updated_at = CURRENT_TIMESTAMP
  `).run(userId, JSON.stringify(normalized));

  return normalized;
}

export function recordPracticeEvent(userId, minutes, focus) {
  db.prepare("INSERT INTO practice_events (user_id, minutes, focus) VALUES (?, ?, ?)")
    .run(userId, minutes, focus);
}

export function getStorageInfo() {
  return {
    adapter: "node:sqlite",
    database: isVercel ? "/tmp/acoustic-steps.sqlite" : dbPath,
    persistent: !isVercel
  };
}
