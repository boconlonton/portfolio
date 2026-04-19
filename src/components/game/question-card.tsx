"use client";

import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Question } from "@/lib/game-data";
import { GAME_DEFINITIONS } from "@/lib/game-data";
import { GAME_TYPE_LABELS } from "@/lib/game-engine";

interface QuestionCardProps {
  question: Question;
  /** Increment this to trigger a new flip animation */
  flipKey: number;
}

const TYPE_COLORS: Record<string, string> = {
  wyr:   "bg-[var(--play-wyr)]/15 text-[var(--play-wyr)]",
  nhi:   "bg-[var(--play-dare)]/15 text-[var(--play-dare)]",
  mlt:   "bg-[var(--play-stoic)]/15 text-[var(--play-stoic)]",
};

const TYPE_BORDER: Record<string, string> = {
  wyr:   "border-[var(--play-wyr)]/20",
  nhi:   "border-[var(--play-dare)]/20",
  mlt:   "border-[var(--play-stoic)]/20",
};

export function QuestionCard({ question, flipKey }: QuestionCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [displayed, setDisplayed] = useState(question);
  const [revealed, setRevealed] = useState(false);
  const prevFlipKey = useRef(flipKey);

  useEffect(() => {
    if (flipKey === prevFlipKey.current) return;
    prevFlipKey.current = flipKey;

    setFlipped(true);
    setRevealed(false);

    const swapTimer = setTimeout(() => {
      setDisplayed(question);
    }, 220);

    const unflipTimer = setTimeout(() => {
      setFlipped(false);
    }, 240);

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(unflipTimer);
    };
  }, [flipKey, question]);

  const def = GAME_DEFINITIONS[displayed.gameType];
  const badgeColor = TYPE_COLORS[displayed.gameType] ?? "bg-fg/10 text-fg";
  const borderColor = TYPE_BORDER[displayed.gameType] ?? "border-[var(--play-border)]";

  const activeRule = displayed.specialRule ?? def.rule;
  const activePenalty = displayed.specialPenalty ?? def.penalty;

  return (
    <div
      className="relative w-full"
      style={{ perspective: "900px" }}
      role="region"
      aria-live="polite"
      aria-label="Current question"
    >
      <div
        className="relative w-full rounded-2xl"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(90deg)" : "rotateY(0deg)",
          transition: "transform 0.22s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Card face */}
        <div
          className={cn(
            "flex flex-col gap-4 rounded-2xl border p-6 shadow-xl",
            "bg-[var(--play-card)]",
            borderColor,
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Badge + level */}
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em]",
                badgeColor,
              )}
            >
              {GAME_TYPE_LABELS[displayed.gameType]}
            </span>
            <span className="text-[0.6875rem] font-medium text-subtle">
              Level {displayed.level}
            </span>
          </div>

          {/* Rule + Penalty — always visible first */}
          <div className="flex flex-col gap-2 rounded-xl border border-[var(--play-border)] bg-fg/[0.02] px-4 py-3">
            <div className="flex gap-2">
              <span className="mt-px shrink-0 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-subtle/60 w-12">Luật</span>
              <p className="text-[0.75rem] leading-relaxed text-subtle">{activeRule}</p>
            </div>
            <div className="h-px bg-[var(--play-border)]" />
            <div className="flex gap-2">
              <span className="mt-px shrink-0 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-[var(--play-penalty)]/70 w-12">Phạt</span>
              <p className="text-[0.75rem] leading-relaxed text-subtle">{activePenalty}</p>
            </div>
          </div>

          {/* Question content — hidden until revealed */}
          <div className="relative">
            <p
              className={cn(
                "font-heading text-[1.125rem] font-medium leading-snug tracking-tight text-fg transition-[filter,opacity] duration-300",
                !revealed && "select-none blur-[6px]",
              )}
              aria-hidden={!revealed}
            >
              {displayed.content}
            </p>

            {!revealed && (
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Reveal question"
              >
                <span className="flex items-center gap-1.5 rounded-full border border-[var(--play-border)] bg-[var(--play-card)] px-3 py-1.5 text-[0.75rem] font-medium text-subtle shadow-sm transition-colors duration-150 hover:text-fg">
                  <Eye className="size-3.5" strokeWidth={1.75} aria-hidden />
                  Xem câu hỏi
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
