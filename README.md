# minimal-portfolio

Personal portfolio for limitisthesky.dev — Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, and Vercel AI SDK.

The app is configured for **static HTML export** (`output: "export"`): `pnpm build` writes **`out/`**, which you can upload to **S3 static website hosting** (or any static CDN). `trailingSlash: true` matches S3-style `index.html` per folder.

## Tech stack

- **Framework**: Next.js 15 (App Router), **static export** — `next.config.ts` sets `output: "export"`, `images.unoptimized`, `trailingSlash: true`
- **Language**: TypeScript
- **Styling**: Tailwind CSS — design tokens and animations in `tailwind.config.ts`; SVG cursor and `::after` tooltip in `globals.css`
- **UI**: shadcn/ui for the **chat widget** (Sheet, ScrollArea, Input, Button) and **nav account** patterns (dropdown, sheet); other surfaces are plain Tailwind
- **Auth**: **AWS Cognito** in the browser only — email/password (SRP via `amazon-cognito-identity-js`) and optional **Google** via Cognito hosted UI + **PKCE**. Tokens in **localStorage**; no App Router API routes (compatible with static export). See **`docs/user-module.md`** for setup, env vars, and flows.
- **AI**: Vercel AI SDK (`ai`) in the **client chat widget**; with **`NEXT_PUBLIC_BACKEND_URL`** set it POSTs to **`/api/agent/chat`** on that host. If unset, the sheet still opens but **Send** is disabled with a “Coming soon” tooltip and Enter does not submit. The handler is **not** in the static `out/` bundle unless you front S3 with a CDN that routes `/api/*` to your API (see env vars)
- **Theming**: next-themes — **default dark**, system preference off (`enableSystem={false}`)
- **Package manager**: pnpm

## Environment variables

Copy `.env.example` to `.env.local` and adjust.

| Variable | Purpose |
| -------- | ------- |
| `NEXT_PUBLIC_BACKEND_URL` | Backend **origin** (no trailing slash), e.g. `https://api.example.com`. Widget POSTs to **`/api/agent/chat`** on that host (enable CORS when cross-origin). If **unset**, chat Send is disabled (“Coming soon” tooltip); set this when your API is ready. |
| `OPENAI_API_KEY` | Only on the **backend** that implements the agent chat route — not used by `pnpm build` for the static site. |
| `NEXT_PUBLIC_COGNITO_USER_POOL_ID` | Cognito User Pool ID — required for **`/auth/`** email/password sign-in. |
| `NEXT_PUBLIC_COGNITO_CLIENT_ID` | Cognito app client ID (public client). Also used for hosted **Sign out** redirect when domain is set. |
| `NEXT_PUBLIC_COGNITO_REGION` | Documented in `.env.example`; reserved for future use in this repo. |
| `NEXT_PUBLIC_COGNITO_DOMAIN` | Hosted UI domain (no `https://`). Required for **Google** sign-in and for **Cognito `/logout`** after local sign-out. |
| `NEXT_PUBLIC_COGNITO_REDIRECT_URI` | Full **`/auth/callback`** URL registered in the app client; required for Google OAuth. |

All `NEXT_PUBLIC_COGNITO_*` values are exposed to the browser by design.

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

| Path                 | Purpose |
| -------------------- | ------- |
| `/`                  | Home — Hero, Intro, footer, optional chat widget |
| `/about/`            | Placeholder (“About me” in nav) |
| `/words/`            | Placeholder (“Thoughts” in nav) |
| `/kindness/`         | Placeholder (“Kindness” in nav) |
| `/auth/`             | Sign-in (email/password + optional Google) |
| `/auth/callback/`    | OAuth redirect handler (PKCE code exchange) |
| `/settings/`         | Signed-in-only stub (`RequireSignedIn`, `noindex`) |
| `/play/`             | Party game — Would You Rather, Never Have I Ever, Most Likely To (`noindex`) |
| `/quotes/add/`       | Signed-in-only stub (`RequireSignedIn`, `noindex`) |

Canonical site URL and copy live in `src/lib/site.ts` (`SITE_URL`, `SITE_NAME`, `SITE_DESCRIPTION`).

**Auth note:** Gated pages use **client-side** checks (`getTokens()` in **localStorage**). They are not a substitute for server authorization on a real API.

## Project structure

```
src/app/
  layout.tsx, page.tsx, globals.css, not-found.tsx
  about/, words/, kindness/     — stub pages
  auth/, auth/callback/         — Cognito sign-in + OAuth callback
  play/                         — party game (noindex; `PlayClient` + `play-client.tsx`)
  settings/, quotes/add/       — signed-in stubs (client gates)
  manifest.ts, sitemap.ts, robots.ts, opengraph-image.tsx
src/components/
  nav.tsx, nav-links.tsx        — header, account cluster, theme toggle
  auth-form.tsx                 — /auth UI
  require-signed-in.tsx         — client gate (notFound if no tokens)
  hero.tsx, intro.tsx, site-footer.tsx
  chat-widget.tsx               — POST `${NEXT_PUBLIC_BACKEND_URL}/api/agent/chat` when env set; else Send disabled
  game/                         — setup-view, game-view, question-card, penalty-reel, history-view
  theme-provider.tsx, theme-toggle.tsx
  json-ld.tsx                   — WebSite + Person JSON-LD
  ui/                           — shadcn primitives
src/lib/
  site.ts, utils.ts
  cognito.ts, auth-storage.ts   — Cognito + token / PKCE storage
  game-content.json, game-data.ts, game-engine.ts, game-storage.ts  — party game content + logic
docs/user-module.md             — auth module reference (env, storage, flows)
public/                         — favicon.svg, etc.
out/                            — static export (gitignored); produced by pnpm build
.env.example
```
