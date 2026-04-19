"use client";

import { Dices, FlameKindling, Layers, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { GAME_DEFINITIONS } from "@/lib/game-data";
import { GAME_TYPE_LABELS, LEVEL_LABELS, INTENSITY_LABELS } from "@/lib/game-engine";
import type { GameType, GameTypeOrShuffle, PenaltyIntensity } from "@/lib/game-data";

export interface GameConfig {
  level: number;
  intensity: PenaltyIntensity;
  gameType: GameTypeOrShuffle;
}

interface SetupViewProps {
  config: GameConfig;
  onChange: (config: GameConfig) => void;
  onStart: () => void;
}

const GAME_TYPE_OPTIONS: {
  value: GameTypeOrShuffle;
  icon: React.ReactNode;
  activeColor: string;
}[] = [
  {
    value: "shuffle",
    icon: <Layers className="size-5" strokeWidth={1.75} aria-hidden />,
    activeColor: "text-fg border-fg/60 bg-fg/5",
  },
  {
    value: "wyr",
    icon: <Dices className="size-5" strokeWidth={1.75} aria-hidden />,
    activeColor: "text-[var(--play-wyr)] border-[var(--play-wyr)]/60 bg-[var(--play-wyr)]/8",
  },
  {
    value: "nhi",
    icon: <FlameKindling className="size-5" strokeWidth={1.75} aria-hidden />,
    activeColor: "text-[var(--play-dare)] border-[var(--play-dare)]/60 bg-[var(--play-dare)]/8",
  },
  {
    value: "mlt",
    icon: <Users className="size-5" strokeWidth={1.75} aria-hidden />,
    activeColor: "text-[var(--play-stoic)] border-[var(--play-stoic)]/60 bg-[var(--play-stoic)]/8",
  },
];

const INTENSITY_OPTIONS: {
  value: PenaltyIntensity;
  label: string;
  description: string;
}[] = [
  { value: "easy", label: INTENSITY_LABELS.easy, description: "Nhẹ nhàng" },
  { value: "medium", label: INTENSITY_LABELS.medium, description: "Vừa vặn" },
  { value: "hard", label: INTENSITY_LABELS.hard, description: "Không thương" },
];

function getDescription(value: GameTypeOrShuffle): string {
  if (value === "shuffle") return "Trộn tất cả loại câu hỏi";
  return GAME_DEFINITIONS[value].rule;
}

export function SetupView({ config, onChange, onStart }: SetupViewProps) {
  return (
    <div className="flex flex-col gap-8 pb-6 animate-play-fade-in">
      <div>
        <h1 className="font-heading text-2xl font-medium tracking-tight text-fg">
          Set the vibe
        </h1>
        <p className="mt-1 text-sm text-subtle">Chọn loại câu hỏi và cấu hình trước khi bắt đầu.</p>
      </div>

      {/* Game Type */}
      <section aria-labelledby="gametype-heading">
        <p
          id="gametype-heading"
          className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-subtle"
        >
          Loại trò chơi
        </p>
        <div className="grid grid-cols-1 gap-2">
          {GAME_TYPE_OPTIONS.map((opt) => {
            const isActive = config.gameType === opt.value;
            const label = GAME_TYPE_LABELS[opt.value];
            const description = getDescription(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ ...config, gameType: opt.value })}
                aria-pressed={isActive}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150",
                  isActive
                    ? opt.activeColor + " border-current/30"
                    : "border-[var(--play-border)] text-subtle hover:border-fg/20 hover:text-fg",
                )}
              >
                <span className={cn("shrink-0", isActive ? "" : "opacity-60")}>{opt.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.875rem] font-medium leading-none">{label}</span>
                  <span className="mt-0.5 block text-[0.75rem] opacity-60 leading-snug line-clamp-2">
                    {description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Question Level */}
      <section aria-labelledby="level-heading">
        <div className="mb-3 flex items-center justify-between">
          <p
            id="level-heading"
            className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-subtle"
          >
            Độ khó câu hỏi
          </p>
          <span className="text-[0.8125rem] font-medium text-fg">
            {config.level} — {LEVEL_LABELS[config.level]}
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={config.level}
            onChange={(e) => onChange({ ...config, level: Number(e.target.value) })}
            aria-valuemin={1}
            aria-valuemax={5}
            aria-valuenow={config.level}
            aria-valuetext={`Level ${config.level}: ${LEVEL_LABELS[config.level]}`}
            className="w-full cursor-pointer appearance-none py-1.5 rounded-full [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[var(--play-border)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--play-accent)] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-mt-[0.4375rem] [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[var(--play-border)] [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[var(--play-accent)] [&::-moz-range-thumb]:cursor-pointer"
          />
          <div className="mt-2 flex justify-between">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={cn(
                  "text-[0.625rem] leading-none transition-opacity duration-150",
                  n === config.level ? "font-semibold text-[var(--play-accent)] opacity-100" : "text-subtle opacity-40",
                )}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Penalty Intensity */}
      <section aria-labelledby="intensity-heading">
        <p
          id="intensity-heading"
          className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-subtle"
        >
          Mức độ phạt
        </p>
        <div className="grid grid-cols-3 gap-2">
          {INTENSITY_OPTIONS.map((opt) => {
            const isActive = config.intensity === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ ...config, intensity: opt.value })}
                aria-pressed={isActive}
                className={cn(
                  "flex cursor-pointer flex-col gap-0.5 rounded-xl border px-3 py-3 text-center transition-all duration-150",
                  isActive
                    ? "border-[var(--play-penalty)]/40 bg-[var(--play-penalty)]/8 text-[var(--play-penalty)]"
                    : "border-[var(--play-border)] text-subtle hover:border-fg/20 hover:text-fg",
                )}
              >
                <span className="text-[0.8125rem] font-medium leading-none">{opt.label}</span>
                <span className="text-[0.6875rem] opacity-60 leading-snug">{opt.description}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <button
        type="button"
        onClick={onStart}
        className="mt-2 w-full cursor-pointer rounded-2xl bg-[var(--play-accent)] py-4 font-heading text-[1rem] font-medium text-[var(--play-accent-fg)] shadow-lg shadow-[var(--play-accent)]/25 transition-all duration-150 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--play-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--play-bg)]"
      >
        Bắt đầu — {GAME_TYPE_LABELS[config.gameType]}
      </button>
    </div>
  );
}
