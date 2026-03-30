/**
 * Portfolio design system — single reference for where tokens live and how to use them.
 *
 * **Source of truth:** CSS variables in `src/app/globals.css` (`:root` and `.dark`).
 * **Tailwind:** `tailwind.config.ts` → `theme.extend.colors` maps `fg`, `subtle`, `canvas`,
 * `text-muted`, `primary`, `border`, shadcn scales, and `ds-*` semantic tokens.
 *
 * Prefer utilities: `text-fg`, `text-subtle`, `text-primary`, `bg-canvas`, `border-border`,
 * `bg-ds-control-track`, `text-ds-accent`, …
 */
export const designSystem = {
  cssEntry: "src/app/globals.css",
  tailwindConfig: "tailwind.config.ts",
  semanticTokenPrefix: "--ds-",
  tokens: [
    "--ds-control-track",
    "--ds-control-track-hover",
    "--ds-control-track-border",
    "--ds-control-thumb",
    "--ds-control-thumb-border",
    "--ds-accent",
    "--ds-accent-muted",
  ] as const,
} as const;
