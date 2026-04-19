import type { GameType, GameTypeOrShuffle, PenaltyIntensity, Question, Penalty } from "./game-data";
import { GAME_DEFINITIONS } from "./game-data";

export function filterQuestions(
  questions: Question[],
  maxLevel: number,
  gameType: GameTypeOrShuffle,
): Question[] {
  if (gameType === "shuffle") {
    return questions.filter((q) => q.level <= maxLevel);
  }
  return questions.filter((q) => q.level <= maxLevel && q.gameType === gameType);
}

/**
 * Picks a question avoiding repeats. Once the pool is exhausted, `seen` is
 * cleared and we start over (handles small pools gracefully).
 */
export function pickQuestion(pool: Question[], seen: Set<string>): Question {
  const available = pool.filter((q) => !seen.has(q.id));
  const candidates = available.length > 0 ? available : pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

/** Picks a random penalty matching the requested intensity. */
export function pickPenalty(penalties: Penalty[], intensity: PenaltyIntensity): Penalty {
  const pool = penalties.filter((p) => p.intensity === intensity);
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * For shuffle mode: round-robins across all 4 game types so they appear at
 * roughly equal frequency.
 */
export function pickShuffleQuestion(
  pool: Question[],
  seen: Set<string>,
  shuffleIndex: number,
): { question: Question; nextIndex: number } {
  const types: GameType[] = ["wyr", "nhi", "mlt"];
  const targetType = types[shuffleIndex % types.length];

  const typePool = pool.filter((q) => q.gameType === targetType && !seen.has(q.id));
  const fallback = pool.filter((q) => q.gameType === targetType);
  const candidates = typePool.length > 0 ? typePool : fallback;

  const question = candidates[Math.floor(Math.random() * candidates.length)];
  return { question, nextIndex: shuffleIndex + 1 };
}

/** Knuth-Fisher-Yates shuffle — returns a new array. */
export function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export const GAME_TYPE_LABELS: Record<GameTypeOrShuffle, string> = {
  wyr: GAME_DEFINITIONS.wyr.label,
  nhi: GAME_DEFINITIONS.nhi.label,
  mlt: GAME_DEFINITIONS.mlt.label,
  shuffle: "Shuffle",
};

export const LEVEL_LABELS: Record<number, string> = {
  1: "Icebreaker",
  2: "Warming Up",
  3: "Deep Dive",
  4: "Exposed",
  5: "Chaos",
};

export const INTENSITY_LABELS: Record<PenaltyIntensity, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};
