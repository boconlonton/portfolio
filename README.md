# minimal-portfolio

Personal portfolio for limitisthesky.dev — Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, and Vercel AI SDK.

The app is configured for **static HTML export** (`output: "export"`): `pnpm build` writes **`out/`**, which you can upload to **S3 static website hosting** (or any static CDN). `trailingSlash: true` matches S3-style `index.html` per folder.

## Tech stack

- **Framework**: Next.js 15 (App Router), **static export** — `next.config.ts` sets `output: "export"`, `images.unoptimized`, `trailingSlash: true`
- **Language**: TypeScript
- **Styling**: Tailwind CSS — design tokens and animations in `tailwind.config.ts`; SVG cursor and `::after` tooltip in `globals.css`
- **UI**: shadcn/ui in the AI chat widget only (Sheet, ScrollArea, Input, Button); everything else is plain Tailwind
- **AI**: Vercel AI SDK (`ai`) in the **client chat widget**; with **`NEXT_PUBLIC_BACKEND_URL`** set it POSTs to **`/api/agent/chat`** on that host. If unset, the sheet still opens but **Send** is disabled with a “Coming soon” tooltip and Enter does not submit. The handler is **not** in the static `out/` bundle unless you front S3 with a CDN that routes `/api/*` to your API (see env vars)
- **Theming**: next-themes — **default dark**, system preference off (`enableSystem={false}`)
- **Package manager**: pnpm

## Environment variables

Copy `.env.example` to `.env.local` and adjust.

| Variable | Purpose |
| -------- | ------- |
| `NEXT_PUBLIC_BACKEND_URL` | Backend **origin** (no trailing slash), e.g. `https://api.example.com`. Widget POSTs to **`/api/agent/chat`** on that host (enable CORS when cross-origin). If **unset**, chat Send is disabled (“Coming soon” tooltip); set this when your API is ready. |
| `OPENAI_API_KEY` | Only on the **backend** that implements the agent chat route — not used by `pnpm build` for the static site. |

There is no `src/app/api` route in this repo; static export cannot ship App Router Route Handlers.

## Commands

| Command               | Description |
| --------------------- | ----------- |
| `pnpm dev`            | Dev server at http://localhost:3000 |
| `pnpm build`          | Static export → **`out/`** (upload this folder to S3, preserving `_next/`) |
| `pnpm preview:static` | Serve `out/` locally (after build) |
| `pnpm start`          | Next.js **server** mode — not used with `output: "export"`; use `preview:static` instead |
| `pnpm lint`           | ESLint |

## Deploying to S3 (static website)

1. Run `pnpm build`.
2. Upload **all** contents of `out/` to the bucket (including `/_next/`).
3. Enable static website hosting; set **index document** to `index.html` and **error document** to `404.html` (or front the bucket with CloudFront and map 404s as needed).

Public URLs use **trailing slashes** on nested routes (e.g. `/about/`) to match the exported layout.

## Routes

| Path         | Purpose |
| ------------ | ------- |
| `/`          | Home — Hero, Intro, footer, optional chat widget |
| `/about/`    | Placeholder (“About me” in nav) |
| `/words/`    | Placeholder (“Thoughts” in nav) |
| `/kindness/` | Placeholder (“Kindness” in nav) |

Canonical site URL and copy live in `src/lib/site.ts` (`SITE_URL`, `SITE_NAME`, `SITE_DESCRIPTION`).

## Project structure

```
src/app/
  layout.tsx, page.tsx, globals.css, not-found.tsx
  about/, words/, kindness/     — stub pages
  manifest.ts, sitemap.ts, robots.ts, opengraph-image.tsx
src/components/
  nav.tsx, nav-links.tsx        — header + links + aria-current
  hero.tsx, intro.tsx, site-footer.tsx
  chat-widget.tsx               — POST `${NEXT_PUBLIC_BACKEND_URL}/api/agent/chat` when env set; else Send disabled
  theme-provider.tsx, theme-toggle.tsx
  json-ld.tsx                   — WebSite + Person JSON-LD
  ui/                           — shadcn primitives (chat only)
src/lib/site.ts, utils.ts
public/                         — favicon.svg, etc.
out/                            — static export (gitignored); produced by pnpm build
.env.example
```
