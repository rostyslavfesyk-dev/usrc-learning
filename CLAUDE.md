@AGENTS.md
@docs/architecture.md

# CLAUDE.md — USRC Learning Landing Page

This file tells every agent run in this directory which skills to invoke and when.
The agent MUST invoke the listed skills via the `Skill` tool at the start of each
phase before writing or editing files. Missing skill = pause and report.

## Project summary

Static evaluation landing page for the "Rapid prototyping for healthcare product
teams" learning program (Trinetix → U.S. Renal Care).

Stack: Next.js 16 · TypeScript · Tailwind v4 · GSAP v3 · `@remixicon/react`.
No backend. No CTAs. No forms.

Content source of truth: [USRC-Landing-Course-v2.md](USRC-Landing-Course-v2.md).
All copy lifted verbatim into `app/(landing)/_data/course.ts` — do not paraphrase.

## Breakpoints

Mobile-first Tailwind. Three explicit targets:
- 320px+ — base
- 744px+ — `md:`
- 1280px+ — `lg:`

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
