import { Globe, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative mb-[clamp(2.5rem,6vw,4rem)]">
      {/* Soft accent drift — motion-safe only */}
      <div
        className="pointer-events-none absolute -right-4 top-[-10%] h-[min(220px,45vw)] w-[min(220px,45vw)] rounded-full bg-primary/[0.07] blur-3xl motion-safe:animate-hero-glow dark:bg-primary/[0.11]"
        aria-hidden
      />

      <div className="relative">
        {/* Eyebrow */}
        <div className="motion-safe:animate-hero-in-0 mb-[clamp(1.35rem,3.5vw,2rem)] flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            className="font-mono text-[0.6875rem] tabular-nums tracking-tight text-subtle"
            aria-hidden
          >
            01
          </span>
          <span
            className="relative flex h-2 w-2 shrink-0 motion-safe:animate-hero-drift motion-reduce:animate-none"
            aria-hidden
          >
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary/35 motion-safe:animate-ping motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary ring-2 ring-primary/25 ring-offset-2 ring-offset-[var(--bg)] dark:ring-primary/30" />
          </span>
          <span className="inline-flex h-px w-10 shrink-0 items-center" aria-hidden>
            <span className="motion-safe:animate-hero-line motion-reduce:scale-x-100 block h-px w-full origin-left bg-gradient-to-r from-fg/30 to-transparent dark:from-fg/25" />
          </span>
          <p className="min-w-0 max-w-full text-pretty font-body text-[0.6875rem] font-medium uppercase leading-snug tracking-[0.18em] text-subtle sm:max-w-[min(100%,36ch)] sm:tracking-[0.2em]">
            Permission to iterate — then ship the weird version.
          </p>
        </div>

        {/* Headline */}
        <h1 className="mb-[clamp(1.25rem,3vw,1.85rem)] font-heading text-[clamp(2.1rem,6.8vw,3.4rem)] font-medium leading-[1.07] tracking-[-0.04em] text-fg">
          <span className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3 sm:gap-y-0">
            <span className="motion-safe:animate-hero-in-1 font-light tracking-[-0.03em] text-[var(--text-muted)]">
              limit
            </span>
            <span
              className="motion-safe:animate-hero-in-2 hidden text-[0.45em] font-light text-subtle sm:inline"
              aria-hidden="true"
            >
              <span className="motion-safe:animate-hero-slash motion-reduce:animate-none inline-block">
                /
              </span>
            </span>
            <span className="motion-safe:animate-hero-in-3">
              <span className="text-fg/90">is the </span>
              <span className="font-light tracking-[-0.03em] text-primary">
                sky
              </span>
            </span>
          </span>
        </h1>

        <div
          className="motion-safe:animate-hero-in-4 mb-[clamp(1.25rem,3vw,1.75rem)]"
          aria-hidden="true"
        >
          <div className="motion-safe:animate-hero-line motion-reduce:scale-x-100 h-px max-w-[6.5rem] origin-left bg-gradient-to-r from-primary/50 via-fg/15 to-transparent dark:from-primary/45 dark:via-fg/20" />
        </div>

        <div className="motion-safe:animate-hero-in-5 space-y-[1.15rem] font-body text-[0.8125rem] leading-relaxed tracking-[-0.01em]">
          <p className="group flex flex-wrap items-center gap-x-2 gap-y-1 text-[var(--text-muted)]">
            <Globe
              className="size-3.5 shrink-0 text-subtle transition-transform duration-300 motion-safe:group-hover:-rotate-12 motion-safe:group-hover:text-primary/80"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <Link
              href="/"
              className="link-real relative cursor-pointer font-medium text-fg no-underline transition-[color,opacity,transform] duration-200 hover:opacity-80 hover:no-underline focus-visible:text-fg focus-visible:no-underline motion-safe:hover:translate-x-0.5"
              aria-label="limitisthesky.dev — home"
            >
              limitisthesky.dev
            </Link>
            <span className="text-subtle" aria-hidden="true">
              ·
            </span>
            <span className="text-subtle transition-colors duration-200 group-hover:text-[var(--text-muted)]">
              builder, tinkerer, permanently curious
            </span>
          </p>

          <p className="group flex gap-2.5 text-subtle">
            <Sparkles
              className="motion-safe:animate-hero-sparkle motion-reduce:animate-none mt-0.5 size-3.5 shrink-0 text-primary/70 transition-colors duration-300 motion-safe:group-hover:text-primary dark:text-primary/60"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span className="max-w-[46ch] leading-[1.65]">
              <span className="text-[var(--text-muted)]">
                Quiet interfaces, loud questions, and side quests that turn
                &ldquo;impossible&rdquo; into{" "}
                <span className="font-medium text-fg/85 decoration-primary/40 underline decoration-dotted underline-offset-[0.2em] transition-colors duration-300 motion-safe:group-hover:text-primary motion-safe:group-hover:decoration-primary/60">
                  Tuesday.
                </span>
              </span>{" "}
              <span className="text-fg/80">Stay playful. Stay precise.</span>
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
