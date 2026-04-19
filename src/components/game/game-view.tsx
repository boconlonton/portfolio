"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronRight, Settings } from "lucide-react";

import { QUESTIONS } from "@/lib/game-data";
import {
  filterQuestions,
  pickQuestion,
  pickShuffleQuestion,
  GAME_TYPE_LABELS,
  LEVEL_LABELS,
  INTENSITY_LABELS,
} from "@/lib/game-engine";
import { appendHistory } from "@/lib/game-storage";
import type { GameConfig } from "./setup-view";
import { QuestionCard } from "./question-card";
import { PenaltyReel } from "./penalty-reel";

interface GameViewProps {
  config: GameConfig;
  onReconfigure: () => void;
}

export function GameView({ config, onReconfigure }: GameViewProps) {
  const pool = filterQuestions(QUESTIONS, config.level, config.gameType);

  const seenRef = useRef<Set<string>>(new Set());
  const shuffleIndexRef = useRef(0);

  const getInitialQuestion = useCallback(() => {
    if (config.gameType === "shuffle") {
      const { question, nextIndex } = pickShuffleQuestion(pool, seenRef.current, shuffleIndexRef.current);
      shuffleIndexRef.current = nextIndex;
      seenRef.current.add(question.id);
      return question;
    }
    const q = pickQuestion(pool, seenRef.current);
    seenRef.current.add(q.id);
    return q;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [current, setCurrent] = useState(getInitialQuestion);
  const [flipKey, setFlipKey] = useState(0);
  const [questionCount, setQuestionCount] = useState(1);

  function next(outcome: "answered" | "penalized") {
    appendHistory({
      questionId: current.id,
      content: current.content,
      gameType: current.gameType,
      outcome,
      timestamp: Date.now(),
    });

    let nextQuestion;
    if (config.gameType === "shuffle") {
      const { question, nextIndex } = pickShuffleQuestion(pool, seenRef.current, shuffleIndexRef.current);
      shuffleIndexRef.current = nextIndex;
      nextQuestion = question;
    } else {
      nextQuestion = pickQuestion(pool, seenRef.current);
    }

    seenRef.current.add(nextQuestion.id);

    if (seenRef.current.size >= pool.length) {
      seenRef.current = new Set([nextQuestion.id]);
    }

    setCurrent(nextQuestion);
    setFlipKey((k) => k + 1);
    setQuestionCount((n) => n + 1);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Session meta bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-fg/[0.06] px-2.5 py-1 text-[0.6875rem] font-medium text-subtle">
            {GAME_TYPE_LABELS[config.gameType]}
          </span>
          <span className="rounded-full bg-fg/[0.06] px-2.5 py-1 text-[0.6875rem] font-medium text-subtle">
            L{config.level} · {LEVEL_LABELS[config.level]}
          </span>
          <span className="rounded-full bg-fg/[0.06] px-2.5 py-1 text-[0.6875rem] font-medium text-subtle">
            {INTENSITY_LABELS[config.intensity]}
          </span>
        </div>
        <button
          type="button"
          onClick={onReconfigure}
          className="flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-[0.75rem] text-subtle transition-colors duration-150 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Back to setup"
        >
          <Settings className="size-3.5" strokeWidth={1.75} aria-hidden />
          Setup
        </button>
      </div>

      {/* Question card */}
      <QuestionCard question={current} flipKey={flipKey} />

      {/* Controls */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => next("answered")}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[var(--play-accent)] py-4 font-heading text-[1rem] font-medium text-[var(--play-accent-fg)] shadow-lg shadow-[var(--play-accent)]/20 transition-all duration-150 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--play-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--play-bg)]"
        >
          Câu tiếp theo
          <ChevronRight className="size-5" strokeWidth={2} aria-hidden />
        </button>

        <PenaltyReel
          intensity={config.intensity}
          onPenaltyDrawn={() => next("penalized")}
        />
      </div>

      {/* Question counter */}
      <p className="text-center text-[0.6875rem] text-subtle/50">
        Câu hỏi {questionCount} trong phiên này
      </p>
    </div>
  );
}
