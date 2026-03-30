export function Intro() {
  return (
    <section
      className="animate-fade-up-intro [&_p+p]:mt-[1.35em]"
      aria-labelledby="intro-heading"
    >
      <h2 id="intro-heading" className="sr-only">
        Approach and background
      </h2>
      <figure className="mb-[clamp(1.75rem,4vw,2.5rem)] border-l-2 border-fg/[0.12] pl-4 dark:border-fg/[0.14]">
        <blockquote className="font-heading text-[0.9375rem] font-normal leading-snug tracking-[-0.02em] text-fg/90">
          <p>
            The work that matters rarely arrives fully formed — it shows up as a
            hunch, then asks you to stay with it.
          </p>
        </blockquote>
        <figcaption className="mt-2 font-body text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
          Field notes
        </figcaption>
      </figure>
      <p className="max-w-[52ch] text-[0.9375rem] leading-[1.72] tracking-[-0.011em] text-[var(--text-muted)]">
        I care about software that respects attention: small surfaces, honest
        copy, and systems you can reason about when something breaks at
        midnight. Most days that means shipping, deleting, and learning what
        survived contact with real people.
      </p>
      <p className="max-w-[52ch] text-[0.9375rem] leading-[1.72] tracking-[-0.011em] text-[var(--text-muted)]">
        If you are building something ambitious and a little scary, we probably
        speak the same language. Reach out — the best conversations start with
        &ldquo;what if we tried…&rdquo; and nowhere to hide.
      </p>
    </section>
  );
}
