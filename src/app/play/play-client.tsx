"use client";

import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { loadHistory } from "@/lib/game-storage";
import type { HistoryEntry } from "@/lib/game-storage";
import { SetupView } from "@/components/game/setup-view";
import { GameView } from "@/components/game/game-view";
import { HistoryView } from "@/components/game/history-view";
import type { GameConfig } from "@/components/game/setup-view";

type View = "setup" | "game" | "history";

const DEFAULT_CONFIG: GameConfig = {
  level: 3,
  intensity: "medium",
  gameType: "shuffle",
};

export function PlayClient() {
  const [view, setView] = useState<View>("setup");
  const [config, setConfig] = useState<GameConfig>(DEFAULT_CONFIG);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  function startGame() {
    setHistory(loadHistory());
    setGameKey((k) => k + 1);
    setView("game");
  }

  function reconfigure() {
    setHistory(loadHistory());
    setView("setup");
  }

  const refreshHistory = useCallback(() => {
    setHistory(loadHistory());
  }, []);

  const tabs: { id: View; label: string; icon?: React.ReactNode }[] = [
    { id: "setup", label: "Setup" },
    { id: "game", label: "Play" },
    {
      id: "history",
      label: "History",
      icon: history.length > 0 ? (
        <span className="ml-1 rounded-full bg-[var(--play-accent)]/20 px-1.5 py-0.5 text-[0.5625rem] font-semibold text-[var(--play-accent)]">
          {history.length}
        </span>
      ) : null,
    },
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[var(--play-bg)]">
      {/* Tab bar */}
      <div className="sticky top-0 z-10 flex gap-0 border-b border-[var(--play-border)] bg-[var(--play-bg)] px-2 pb-0 pt-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              if (tab.id === "history") refreshHistory();
              if (tab.id === "game" && view !== "game") startGame();
              else setView(tab.id);
            }}
            aria-current={view === tab.id ? "page" : undefined}
            className={cn(
              "relative flex cursor-pointer items-center gap-0.5 px-4 py-3 text-[0.8125rem] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--play-accent)]",
              view === tab.id
                ? "text-fg after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--play-accent)]"
                : "text-subtle hover:text-fg",
            )}
          >
            {tab.label}
            {tab.icon}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto w-full max-w-lg">
        {view === "setup" && (
          <SetupView
            config={config}
            onChange={setConfig}
            onStart={startGame}
          />
        )}

        {view === "game" && (
          <GameView
            key={gameKey}
            config={config}
            onReconfigure={reconfigure}
          />
        )}

        {view === "history" && (
          <HistoryView
            entries={history}
            onClear={() => setHistory([])}
          />
        )}
        </div>
      </div>
    </div>
  );
}
