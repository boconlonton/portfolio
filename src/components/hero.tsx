import { Globe, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="animate-fade-up-hero mb-[clamp(2.5rem,6vw,4rem)]">
      <div className="mb-[clamp(1.35rem,3.5vw,2rem)] flex flex-wrap items-center gap-x-3 gap-y-2">
        <span
          className="font-mono text-[0.6875rem] tabular-nums tracking-tight text-subtle"
          aria-hidden
        >
          01
        </span>
        <span className="h-px w-10 shrink-0 bg-gradient-to-r from-fg/25 to-transparent dark:from-fg/20" />
        <p className="max-w-[min(100%,34ch)] font-body text-[0.6875rem] font-medium uppercase leading-snug tracking-[0.2em] text-subtle">
          Permission to iterate — then ship the weird version.
        </p>
      </div>

      <h1 className="mb-[clamp(1.25rem,3vw,1.85rem)] font-heading text-[clamp(2.1rem,6.8vw,3.4rem)] font-medium leading-[1.07] tracking-[-0.04em] text-fg">
        <span className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3 sm:gap-y-0">
          <span className="font-light tracking-[-0.03em] text-[var(--text-muted)]">
            limit
          </span>
          <span
            className="hidden text-[0.45em] font-light text-subtle sm:inline"
            aria-hidden="true"
          >
            /
          </span>
          <span>
            is the{" "}
            <span className="font-light tracking-[-0.03em] text-[var(--text-muted)]">
              sky
            </span>
          </span>
        </span>
      </h1>

      <div
        className="mb-[clamp(1.25rem,3vw,1.75rem)] h-px max-w-[5.5rem] bg-gradient-to-r from-fg/20 via-fg/12 to-transparent dark:from-fg/25 dark:via-fg/15"
        aria-hidden="true"
      />

      <div className="space-y-[1.15rem] font-body text-[0.8125rem] leading-relaxed tracking-[-0.01em]">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[var(--text-muted)]">
          <Globe
            className="size-3.5 shrink-0 text-subtle"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <Link
            href="/"
            className="link-real relative cursor-pointer font-medium text-fg no-underline transition-colors duration-200 hover:opacity-80 hover:no-underline focus-visible:text-fg focus-visible:no-underline"
            aria-label="limitisthesky.dev — home"
          >
            limitisthesky.dev
          </Link>
          <span className="text-subtle" aria-hidden="true">
            ·
          </span>
          <span className="text-subtle">builder, tinkerer, permanently curious</span>
        </p>

        <p className="flex gap-2.5 text-subtle">
          <Sparkles
            className="mt-0.5 size-3.5 shrink-0 text-fg/45 dark:text-fg/40"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <span className="max-w-[46ch] leading-[1.65]">
            <span className="text-[var(--text-muted)]">
              Quiet interfaces, loud questions, and side quests that turn
              &ldquo;impossible&rdquo; into &ldquo;Tuesday.&rdquo;
            </span>{" "}
            <span className="text-fg/80">Stay playful. Stay precise.</span>
          </span>
        </p>
      </div>
    </div>
  );
}
