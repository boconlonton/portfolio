"use client";

import { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { PENALTIES, type Penalty, type PenaltyIntensity } from "@/lib/game-data";
import { pickPenalty } from "@/lib/game-engine";

type ReelState = "idle" | "spinning" | "settled";

interface PenaltyReelProps {
  intensity: PenaltyIntensity;
  onPenaltyDrawn?: (penalty: Penalty) => void;
  disabled?: boolean;
}

/** Fake items shown during the spin — we cycle through random penalties */
function buildSpinItems(real: Penalty): string[] {
  const others = PENALTIES.filter((p) => p.id !== real.id);
  const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 5);
  return [...shuffled.map((p) => p.content), real.content];
}

export function PenaltyReel({ intensity, onPenaltyDrawn, disabled }: PenaltyReelProps) {
  const [state, setState] = useState<ReelState>("idle");
  const [drawn, setDrawn] = useState<Penalty | null>(null);
  const [spinItems, setSpinItems] = useState<string[]>([]);
  const [reelOffset, setReelOffset] = useState(0);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const SPIN_DURATION = 850;

  function spin() {
    if (state !== "idle" || disabled) return;

    const penalty = pickPenalty(PENALTIES, intensity);
    const items = buildSpinItems(penalty);
    const ITEM_HEIGHT = 60;
    const finalIndex = items.length - 1;
    const totalScroll = finalIndex * ITEM_HEIGHT;

    setSpinItems(items);
    setDrawn(null);
    setReelOffset(0);
    setState("spinning");

    startTimeRef.current = performance.now();

    function animate(now: number) {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / SPIN_DURATION, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setReelOffset(eased * totalScroll);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setReelOffset(totalScroll);
        setState("settled");
        setDrawn(penalty);
        onPenaltyDrawn?.(penalty);
      }
    }

    animFrameRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    return () => {
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const ITEM_HEIGHT = 60;

  return (
    <div className="flex flex-col gap-3">
      {/* Reel window */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border transition-colors duration-200",
          state === "settled"
            ? "border-[var(--play-penalty)]/30 bg-[var(--play-penalty)]/8"
            : "border-[var(--play-border)] bg-[var(--play-card)]",
        )}
        style={{ height: `${ITEM_HEIGHT}px` }}
        aria-live="polite"
        aria-label={state === "settled" && drawn ? `Penalty: ${drawn.content}` : "Penalty reel"}
      >
        {/* Idle placeholder */}
        {state === "idle" && (
          <div className="flex h-full items-center px-4">
            <p className="text-[0.8125rem] text-subtle">Press Lucky Penalty to spin…</p>
          </div>
        )}

        {/* Spinning reel */}
        {(state === "spinning" || state === "settled") && spinItems.length > 0 && (
          <div
            className="absolute left-0 right-0 top-0"
            style={{
              transform: `translateY(-${reelOffset}px)`,
              willChange: "transform",
            }}
          >
            {spinItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center px-4"
                style={{ height: `${ITEM_HEIGHT}px` }}
              >
                <p
                  className={cn(
                    "text-[0.875rem] leading-snug font-medium",
                    i === spinItems.length - 1 && state === "settled"
                      ? "text-[var(--play-penalty)]"
                      : "text-fg",
                  )}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Edge fade gradients */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[var(--play-card)] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[var(--play-card)] to-transparent" />
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={spin}
        disabled={disabled || state === "spinning"}
        className={cn(
          "flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[0.875rem] font-medium transition-all duration-150",
          "border-[var(--play-penalty)]/30 bg-[var(--play-penalty)]/10 text-[var(--play-penalty)]",
          "hover:bg-[var(--play-penalty)]/15 active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--play-penalty)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--play-bg)]",
          (disabled || state === "spinning") && "cursor-not-allowed opacity-40",
        )}
      >
        <Zap className="size-4" strokeWidth={2} aria-hidden />
        {state === "spinning" ? "Spinning…" : "Lucky Penalty"}
      </button>

      {/* Dismiss after settled */}
      {state === "settled" && (
        <button
          type="button"
          onClick={() => setState("idle")}
          className="cursor-pointer text-center text-[0.75rem] text-subtle underline underline-offset-2 hover:text-fg transition-colors duration-150"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}
