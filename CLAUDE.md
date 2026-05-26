# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md
@docs/architecture.md

## Project summary

Static landing page for the "Rapid prototyping for healthcare product teams"
learning program (Trinetix → U.S. Renal Care). Proposal page only — no backend,
no CTAs, no forms, no analytics.

Stack: Next.js 16 App Router · TypeScript · Tailwind v4 · GSAP v3 · `@remixicon/react`.
Deployed as static export to Vercel (`output: "export"` in `next.config.ts`).

Content source of truth: [USRC-Landing-Course-v2.md](USRC-Landing-Course-v2.md).
All copy lifted verbatim into `app/(landing)/_data/course.ts` — do not paraphrase.

## Commands

```bash
npm run dev          # Start dev server (turbopack)
npm run build        # Static export → out/
npm run lint         # ESLint (flat config, eslint-config-next)
```

Deploy (requires `vercel` CLI + login):
```bash
vercel pull --yes --environment production
vercel build --prod
vercel deploy --prebuilt --prod
```

No test runner is configured. No Prettier — formatting follows ESLint rules only.

## Architecture

**Static export:** `next.config.ts` sets `output: "export"` + `images: { unoptimized: true }`.
Vercel doesn't recognise Next.js 16 — `vercel.json` points `outputDirectory` to `"out"`.

**Next.js 16 warning:** APIs and conventions may differ from training data. Read
`node_modules/next/dist/docs/` before writing Next.js code. Heed deprecation notices.

**Content layer:** All page text lives in `app/(landing)/_data/course.ts` (typed exports).
Components import from there — no hardcoded strings in JSX except structural labels.

**Page composition:** `app/page.tsx` is a thin shell that composes section components
from `app/(landing)/_components/`. Each section is a standalone client or server component.

**Utilities:** `app/_lib/cn.ts` (clsx + tailwind-merge), `app/_lib/animations.ts`
(useReveal, useStagger, prefersReducedMotion helper).

**Path alias:** `@/*` maps to project root (tsconfig paths).

**Fonts:** Geist Sans + Geist Mono via `next/font/local` (bundled with Next.js 16).

## Styling

Tailwind v4 only — tokens defined via `@theme` block in `app/globals.css`.
**No `tailwind.config.js`.** No shadcn/ui.

**Contrast rule:** never use `--color-fg-muted` (`#6a7c8a`) for body text — fails
WCAG AA at 2.6:1 contrast ratio.

## Breakpoints

Mobile-first Tailwind. Three explicit targets:
- 320px+ — base
- 744px+ — `md:`
- 1280px+ — `lg:`

## Animation constraints

- `gsap` core + `gsap/ScrollTrigger` only — **no club plugins**.
- `@gsap/react` `useGSAP` hook for lifecycle management.
- Entrance-only animations: `power2.out`, 0.4–0.5s, Y ≤ 12px, `once: true`.
- Stagger 0.04–0.08s. No `elastic`/`bounce`.
- All animation gated by `prefersReducedMotion()` from `app/_lib/animations.ts`.
- Hover effects: CSS only (no GSAP).

## Skill orchestration

This file also tells agents which skills to invoke per phase.
The agent MUST invoke the listed skills via the `Skill` tool at the start of each
phase before writing or editing files. Missing skill = pause and report.

## Phase 0 — Scaffold + git + Vercel CLI

Invoke: `context7-mcp` (verify current `create-next-app`, Tailwind v4 `@theme`,
`@gsap/react`, `vercel` CLI commands). Then `vercel-plugin:vercel-cli`.

Steps: `git init -b main`, `npm install -g vercel`, write CLAUDE.md, commit `phase 0: scaffold`.

## Phase 1 — Tokens & globals.css

Invoke in order:
1. `high-end-visual-design`
2. `design-taste-frontend`
3. `ui-design:visual-design-foundations`
4. `ui-design:design-system-patterns`

Output: single `@theme` block in `app/globals.css` with USRC tokens (navy `#05538b`,
red `#C8102E`, yellow `#F5B82E`, teal `#007A87`, neutrals, radii pill-first,
type scale, easings). Inter + JetBrains Mono via `next/font/google`.

## Phase 2 — Section/component build

Invoke per component:
1. `frontend-design` (plugin)
2. `ui-design:web-component-design`
3. `ui-design:responsive-design`
4. `emil-design-eng`

Components live in `app/(landing)/_components/`. Content from `app/(landing)/_data/course.ts`.

## Phase 3 — Motion (GSAP)

Invoke: `emil-design-eng` → `ui-design:interaction-design` → `context7-mcp`
(GSAP v3 / `@gsap/react`).

Scope: `gsap` core + `gsap/ScrollTrigger` only. No club plugins. Respect
`prefers-reduced-motion`. Shared hooks in `app/_lib/animations.ts`.

## Phase 4 — Copy review

Invoke `avoid-ai-writing` on all `course.ts` strings and component-rendered text.

## Phase 5 — A11y + visual review

Invoke in order:
1. `ui-design:accessibility-compliance`
2. `design:accessibility-review`
3. `design:design-critique`
4. `vercel-plugin:agent-browser-verify` — render at 1280 / 744 / 375

## Phase 6 — Final pass

Invoke `simplify` on every file touched in this session.

## Phase 7 — Deploy

Invoke in order:
1. `vercel-plugin:vercel-cli`
2. `vercel-plugin:deployments-cicd`
3. `vercel-plugin:deploy`

Run: `vercel login` → `vercel link` → `vercel` (preview) → `vercel --prod`
(after user OK). Tag `v0.1.0` after production push.

## Hard rules (re-read each session)

- Commit at the end of each phase: `phase N: <what>`. No `git push` without an
  explicit remote from the user.
- NO shadcn/ui. NO Storybook.
- NO CTAs / buttons (accordion triggers are the only interactive controls).
- NO pricing / no related-pathways sections (skip JetBrains' versions).
- Tailwind v4 only — `@theme` in `globals.css`; no `tailwind.config.js`.
- Icons: `@remixicon/react` only.
- Motion: `gsap` core + `gsap/ScrollTrigger` only. No club plugins.
- All copy lifted verbatim from `USRC-Landing-Course-v2.md`.
- All content flows through `app/(landing)/_data/course.ts`. No hardcoded
  strings in JSX except structural labels (eyebrow tags, anchor labels).

## Skills NOT to invoke (noise filter)

The Vercel-plugin hook auto-suggests many skills based on filename patterns.
These are NOT relevant to this static landing page and should NOT be invoked
unless the user asks:

- `bootstrap` — only for repos with Vercel-linked resources (databases, auth)
- `next-upgrade` — only when upgrading Next.js versions
- `next-cache-components` — only when implementing PPR / `use cache`
- `observability` — only when instrumenting analytics / OTel drains
- `turbopack` — only when configuring custom Turbopack rules
- `workflow` — only when building durable backend workflows
- `vercel-queues` / `ai-sdk` / `ai-elements` / `ai-gateway` — no AI/queues here
- `verification` / `investigation-mode` — only on real "why is this broken" loops
