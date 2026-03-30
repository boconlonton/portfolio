"use client";

import { Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [playFlip, setPlayFlip] = useState(false);
  const flipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerFlip = useCallback(() => {
    setPlayFlip(true);
    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    flipTimerRef.current = setTimeout(() => {
      setPlayFlip(false);
      flipTimerRef.current = null;
    }, 580);
  }, []);

  useEffect(() => {
    return () => {
      if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    };
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-9 w-[4.75rem] shrink-0 rounded-full border border-fg/20 bg-fg/[0.08]"
        aria-hidden
        data-slot="theme-toggle-skeleton"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(isDark ? "light" : "dark");
        triggerFlip();
      }}
      className={cn(
        "group relative isolate h-9 w-[4.75rem] shrink-0 overflow-hidden rounded-full border border-fg/12 bg-gradient-to-r from-amber-500/[0.12] via-fg/[0.06] to-violet-500/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-shadow duration-300 hover:border-fg/20 hover:shadow-[0_0_20px_-4px_rgba(251,191,36,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--fg)_30%,transparent)] active:scale-[0.97] dark:hover:shadow-[0_0_22px_-4px_rgba(167,139,250,0.35)]",
        playFlip && "motion-safe:animate-theme-flip",
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={
        isDark
          ? "Switch to light theme"
          : "Switch to dark theme"
      }
    >
      <Sun
        className="pointer-events-none absolute left-[11px] top-1/2 size-[14px] -translate-y-1/2 text-amber-500/55 opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:text-amber-500 dark:opacity-35"
        aria-hidden
        strokeWidth={2}
      />
      <Moon
        className="pointer-events-none absolute right-[11px] top-1/2 size-[14px] -translate-y-1/2 text-violet-400/70 opacity-40 transition-all duration-300 group-hover:scale-110 dark:opacity-90"
        aria-hidden
        strokeWidth={2}
      />
      {isDark ? (
        <>
          <span className="pointer-events-none absolute right-[15px] top-[7px] size-0.5 rounded-full bg-fg/35" />
          <span className="pointer-events-none absolute right-[22px] top-[11px] size-0.5 rounded-full bg-fg/25" />
          <span className="pointer-events-none absolute right-[18px] top-[18px] size-0.5 rounded-full bg-fg/20" />
        </>
      ) : (
        <Sparkles
          className="pointer-events-none absolute left-[14px] top-[6px] size-2.5 text-amber-500/40"
          aria-hidden
          strokeWidth={2}
        />
      )}
      <span
        className={cn(
          "absolute top-1/2 flex size-[1.875rem] -translate-y-1/2 items-center justify-center rounded-full border border-fg/12 bg-[var(--bg)] text-fg shadow-md transition-[left,transform,box-shadow] duration-300 ease-out group-hover:shadow-lg group-active:scale-95",
          isDark
            ? "left-[calc(100%-1.875rem-0.28rem)]"
            : "left-[calc(0.28rem)]",
        )}
      >
        {isDark ? (
          <Moon
            className="size-3.5 text-violet-400"
            strokeWidth={2.25}
            aria-hidden="true"
          />
        ) : (
          <Sun
            className="size-3.5 text-amber-600 dark:text-amber-500"
            strokeWidth={2.25}
            aria-hidden="true"
          />
        )}
      </span>
    </button>
  );
}
