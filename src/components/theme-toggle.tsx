"use client";

import { Moon, Sun } from "lucide-react";
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
        className="h-9 w-[4.75rem] shrink-0 rounded-full border border-ds-control-track-border bg-ds-control-track"
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
        "group relative isolate h-9 w-[4.75rem] shrink-0 overflow-hidden rounded-full border border-ds-control-track-border bg-ds-control-track transition-[background-color,border-color,box-shadow] duration-200 hover:border-border hover:bg-ds-control-track-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas active:scale-[0.97]",
        playFlip && "motion-safe:animate-theme-flip",
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={
        isDark ? "Switch to light theme" : "Switch to dark theme"
      }
    >
      <Sun
        className="pointer-events-none absolute left-[11px] top-1/2 size-[14px] -translate-y-1/2 text-subtle opacity-55 transition-[opacity,transform,color] duration-200 group-hover:opacity-80 dark:opacity-30"
        aria-hidden
        strokeWidth={2}
      />
      <Moon
        className="pointer-events-none absolute right-[11px] top-1/2 size-[14px] -translate-y-1/2 text-subtle opacity-35 transition-[opacity,transform,color] duration-200 group-hover:opacity-70 dark:opacity-55"
        aria-hidden
        strokeWidth={2}
      />
      <span
        className={cn(
          "absolute top-1/2 flex size-[1.875rem] -translate-y-1/2 items-center justify-center rounded-full border border-ds-control-thumb-border bg-ds-control-thumb text-ds-accent shadow-sm transition-[left,transform,box-shadow,border-color] duration-300 ease-out group-hover:border-border group-hover:shadow-md group-active:scale-95",
          isDark
            ? "left-[calc(100%-1.875rem-0.28rem)]"
            : "left-[calc(0.28rem)]",
        )}
      >
        {isDark ? (
          <Moon className="size-3.5" strokeWidth={2.25} aria-hidden="true" />
        ) : (
          <Sun className="size-3.5" strokeWidth={2.25} aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
