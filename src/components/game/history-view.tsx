"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { clearHistory } from "@/lib/game-storage";
import type { HistoryEntry } from "@/lib/game-storage";
import { GAME_TYPE_LABELS } from "@/lib/game-engine";

interface HistoryViewProps {
  entries: HistoryEntry[];
  onClear: () => void;
}

const TYPE_BADGE: Record<string, string> = {
  nhi:   "bg-[var(--play-dare)]/12 text-[var(--play-dare)]",
  wyr:   "bg-[var(--play-wyr)]/12 text-[var(--play-wyr)]",
  mlt:   "bg-[var(--play-stoic)]/12 text-[var(--play-stoic)]",
};

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function HistoryView({ entries, onClear }: HistoryViewProps) {
  const [confirming, setConfirming] = useState(false);

  function handleClear() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    clearHistory();
    onClear();
    setConfirming(false);
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <p className="text-[0.875rem] text-subtle">No questions yet this session.</p>
        <p className="text-[0.75rem] text-subtle/60">
          Questions appear here as you play — in reverse order.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-subtle">
          {entries.length} question{entries.length !== 1 ? "s" : ""} this session
        </p>
        <button
          type="button"
          onClick={handleClear}
          className={cn(
            "flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[0.75rem] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            confirming
              ? "bg-destructive/15 text-destructive hover:bg-destructive/20"
              : "text-subtle hover:bg-fg/[0.06] hover:text-fg",
          )}
        >
          <Trash2 className="size-3.5" strokeWidth={1.75} aria-hidden />
          {confirming ? "Confirm clear" : "Clear history"}
        </button>
      </div>

      {/* List */}
      <ol className="flex flex-col gap-2" aria-label="Session history, most recent first">
        {entries.map((entry) => (
          <li
            key={`${entry.questionId}-${entry.timestamp}`}
            className="flex flex-col gap-1.5 rounded-xl border border-[var(--play-border)] bg-[var(--play-card)] px-4 py-3"
          >
            {/* Top row: mode badge + outcome + time */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em]",
                    TYPE_BADGE[entry.gameType] ?? "bg-fg/10 text-fg",
                  )}
                >
                  {GAME_TYPE_LABELS[entry.gameType]}
                </span>
                <span
                  className={cn(
                    "text-[0.625rem] font-medium uppercase tracking-[0.06em]",
                    entry.outcome === "penalized" ? "text-[var(--play-penalty)]" : "text-[var(--play-stoic)]",
                  )}
                >
                  {entry.outcome === "penalized" ? "Penalized" : "Answered"}
                </span>
              </div>
              <span className="text-[0.625rem] text-subtle/50">{formatTime(entry.timestamp)}</span>
            </div>

            {/* Question content */}
            <p className="text-[0.8125rem] leading-snug text-fg/80">{entry.content}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
