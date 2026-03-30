# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

The site is a **Next.js 15 App Router** portfolio configured for **`output: "export"`**: `pnpm build` writes static assets to **`out/`** for S3 static website hosting (or any static CDN). The old static `dist/index.html` flow is retired.

## Commands

```bash
pnpm dev            # Start dev server at http://localhost:3000
pnpm build          # Static export → `out/` (S3 / any static host). Not compatible with `next start`.
pnpm preview:static # Serve `out/` locally (after build)
pnpm start          # Next.js server mode only — not used when `output: "export"` is set
pnpm lint           # ESLint
```

## Architecture

**Stack**: Next.js 15 App Router · TypeScript · Tailwind CSS · shadcn/ui (chat only) · Vercel AI SDK (`ai` + `@ai-sdk/openai`) · next-themes · lucide-react (chat icon)

**Routing**: App Router only.

- **`/`** — `page.tsx`: Hero, Intro, `SiteFooter`, `ChatWidget`
- **`/about`**, **`/words`**, **`/kindness`** — real routes with minimal “coming soon” copy and metadata; nav labels: About me, Thoughts, Kindness
- **`not-found.tsx`** — custom 404

**Site constants**: `src/lib/site.ts` — `SITE_URL`, `SITE_NAME`, `SITE_DESCRIPTION` (used for metadata, JSON-LD, sitemap, robots).

**Design system**: Semantic tokens live in `src/app/globals.css` as `--ds-*` (e.g. control surfaces, accent). Tailwind maps them in `tailwind.config.ts` (`canvas`, `text-muted`, `ds-control-track`, `ds-accent`, …). Human index: `src/lib/design-system.ts`.

**SEO / metadata** (App Router conventions):

- Root `metadata` + `viewport` in `layout.tsx` (`metadataBase` = `SITE_URL`)
- Per-route `metadata` on home and stub pages
- `manifest.ts`, `sitemap.ts` (home + `/about/`, `/words/`, `/kindness/` — trailing slashes match `trailingSlash: true`), `robots.ts`
- `opengraph-image.tsx` — default OG image via `next/og` `ImageResponse` (`export const dynamic = "force-static"` for static export)
- `JsonLdWebsite` in `json-ld.tsx` — WebSite + Person structured data

**AI chat**: `src/components/chat-widget.tsx` (client) uses `useChat` against **`${NEXT_PUBLIC_BACKEND_URL}/api/agent/chat`** when `NEXT_PUBLIC_BACKEND_URL` is set (CORS as needed). If unset, Send is disabled with a “Coming soon” `title` tooltip and Enter does not submit. There is **no** App Router API in this repo — implement the handler on the backend (Vercel AI SDK–compatible streaming `POST`); see `.env.example`.

**Styling — two-layer system**:

1. `tailwind.config.ts` — custom tokens (colors, font families, max-width), keyframes/animations (`fadeUp`, staggered delays, `blink`, `statusPulse`, etc.)
2. `src/app/globals.css` — CSS variables (`:root` / `.dark`), global `<a>` base styles, and **deliberate exceptions** not expressed as utilities:
   - SVG data-URI cursor on `a:hover` / `a:focus-visible`
   - `a::after` “coming soon” tooltip (`.nav-brand:hover::after { display: none }` on the brand link)

**Dark mode**: `ThemeProvider` in `layout.tsx` uses `attribute="class"`, **`defaultTheme="dark"`**, **`enableSystem={false}`**, `disableTransitionOnChange`. The `.dark` class on `<html>` drives variable overrides.

**Nav**: `Nav` wraps `NavLinks` (client) for pathname-aware `aria-current` and `ThemeToggle`.

**shadcn/ui scope**: Only `chat-widget.tsx` and `src/components/ui/*` used by it. Do not add shadcn elsewhere without a concrete reason.

**Fonts**: `next/font/google` in `layout.tsx` — `--font-heading` (Archivo), `--font-body` (Space Grotesk); consumed as `font-heading` / `font-body` in `tailwind.config.ts`.

**A11y**: Skip link to `#main-content`; main regions use `id="main-content"` and focus rings where applied in pages.
