# minimal-portfolio

Personal portfolio for limitisthesky.dev — Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, and Vercel AI SDK.

## Tech stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS — design tokens and animations in `tailwind.config.ts`; SVG cursor and `::after` tooltip in `globals.css`
- **UI**: shadcn/ui in the AI chat widget only (Sheet, ScrollArea, Input, Button); everything else is plain Tailwind
- **AI**: Vercel AI SDK (`ai` + `@ai-sdk/openai`) — streaming chat with GPT-4o mini
- **Theming**: next-themes — **default dark**, system preference off (`enableSystem={false}`)
- **Package manager**: pnpm

## Environment variables

Create `.env.local` in the project root:

```
OPENAI_API_KEY=your_key_here
```

## Commands

| Command      | Description                                     |
| ------------ | ----------------------------------------------- |
| `pnpm dev`   | Start local dev server at http://localhost:3000 |
| `pnpm build` | Production build                                |
| `pnpm start` | Run the production build locally                |
| `pnpm lint`  | Run ESLint                                      |

## Routes

| Path        | Purpose |
| ----------- | ------- |
| `/`         | Home — Hero, Intro, footer, chat widget |
| `/about`    | Placeholder (“About me” in nav) |
| `/words`    | Placeholder (“Thoughts” in nav) |
| `/kindness` | Placeholder (“Kindness” in nav) |

Canonical site URL and copy live in `src/lib/site.ts` (`SITE_URL`, `SITE_NAME`, `SITE_DESCRIPTION`).

## Project structure

```
src/app/
  layout.tsx, page.tsx, globals.css, not-found.tsx
  about/, words/, kindness/     — stub pages
  api/chat/route.ts             — streaming chat
  manifest.ts, sitemap.ts, robots.ts, opengraph-image.tsx
src/components/
  nav.tsx, nav-links.tsx        — header + links + aria-current
  hero.tsx, intro.tsx, site-footer.tsx
  chat-widget.tsx
  theme-provider.tsx, theme-toggle.tsx
  json-ld.tsx                   — WebSite + Person JSON-LD
  ui/                           — shadcn primitives (chat only)
src/lib/site.ts, utils.ts
public/                         — favicon.svg, etc.
```
