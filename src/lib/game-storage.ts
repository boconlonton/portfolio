import type { GameType } from "./game-data";

export interface HistoryEntry {
  questionId: string;
  content: string;
  gameType: GameType;
  outcome: "answered" | "penalized";
  timestamp: number;
}

const STORAGE_KEY = "play:history";
const MAX_ENTRIES = 200;

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    return [];
  }
}

export function appendHistory(entry: HistoryEntry): void {
  if (typeof window === "undefined") return;
  try {
    const existing = loadHistory();
    const updated = [entry, ...existing].slice(0, MAX_ENTRIES);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // quota exceeded or private browsing — fail silently
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
