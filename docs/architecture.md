# USRC Learning — Architecture Reference

Permanent reference for agents working in this repo. Read this alongside `CLAUDE.md`.

**Project:** Static landing page for the "Rapid prototyping for healthcare product teams"
learning program — Trinetix pitching to U.S. Renal Care stakeholders.
**Deployed:** `https://usrc-rapid-prototyping-program-trinetix.vercel.app`

---

## Locked decisions

| # | Decision |
|---|---|
| 1 | No CTAs, no forms, no backend, no analytics — proposal page only |
| 2 | Layout: JetBrains Academy anatomy (hero → about → outcomes → accordion → tools → FAQ → footer) |
| 3 | Styling: USRC brand sampled from `usrenalcare.com` (navy `#05538b`, pill radii, warm-clinical tone) |
| 4 | Stack: Next.js 16 App Router + TypeScript + Tailwind v4 — no shadcn, no Storybook |
| 5 | Icons: `@remixicon/react` only |
| 6 | No JetBrains pricing tiers or related-pathways cards |

---

## Folder structure

```
usrc-learning/
├── app/
│   ├── layout.tsx                    # html lang, Geist font vars, metadata
│   ├── page.tsx                      # thin shell — composes all sections
│   ├── globals.css                   # @import "tailwindcss" + @theme tokens
│   ├── icon.png                      # 512×512 favicon (USRC square logo)
│   ├── (landing)/
│   │   ├── _components/              # 13 section components (see map below)
│   │   └── _data/
│   │       └── course.ts             # all typed content — no strings in JSX
│   └── _lib/
│       ├── animations.ts             # useReveal, useStagger, prefersReducedMotion
│       └── cn.ts                     # clsx + tailwind-merge
├── public/
│   ├── usrc-logo.png                 # white USRC logo (preloaded in layout)
│   └── motifs/                       # decorative SVGs
├── docs/
│   └── architecture.md              # this file
├── CLAUDE.md                         # agent skill orchestration
├── AGENTS.md                         # Next.js 16 warning for agents
├── next.config.ts                    # output: "export", images.unoptimized
└── vercel.json                       # outputDirectory: "out"
```

---

## Component map

All 13 components live in `app/(landing)/_components/`. All content sourced from `course.ts`.

| # | Component | Section | Notes |
|---|---|---|---|
| 1 | `SiteHeader` | — | Sticky; scroll-bg via `useEffect`; `@remixicon` hamburger |
| 2 | `Hero` | §1 | Crimson bg; Geist heading; pill meta strip; double-line SVG arc bottom-right |
| 3 | `AudienceOutcome` | §2 | 2-col definition list |
| 4 | `AboutProgram` | §3 | Split prose |
| 5 | `SkillsOutcomes` | §4 | 10 items, 2-col grid |
| 6 | `CourseFacts` | §5 facts | 5 navy tiles; count-up animation |
| 7 | `CourseStructureOverview` | §5 structure | 3 phase cards |
| 8 | `CurriculumAccordion` | §5 phases | Single-open accordion; 3 phases × 11 modules |
| 9 | `ToolsGrid` | §5 Module 9 | 7 AI tools; 4→3→2→1 col grid |
| 10 | `IncludedMaterials` | §6 | Flex-wrap pill row |
| 11 | `FAQ` | §7 | Multi-open accordion; 5 Q&As |
| 12 | `SkillsAfterCourse` | §8 | 2-col numbered cards |
| 13 | `SiteFooter` | §9 | Crimson bg; server component |

---

## Design tokens

Actual values live in `app/globals.css` `@theme`. Key brand values:

| Token | Value | Use |
|---|---|---|
| `--color-usrc-crimson` | `#b90e31` | Primary action color, hero bg, footer bg, module badges |
| `--color-usrc-crimson-deep` | `#8b0a25` | Hover/active on crimson |
| `--color-usrc-navy` | `#05538b` | Phase labels, links, structural accents |
| `--color-usrc-teal` | `#007a87` | Practice/docs resource pills |
| `--color-surface` | `#ffffff` | Page background |
| `--color-surface-subtle` | `#f4f8fb` | Card/panel backgrounds |
| `--color-border` | `#bfd6e7` | All dividers |
| `--radius-pill` | `9999px` | Badges, chips, tags |
| `--radius-lg` | `0.875rem` | Cards |

Fonts: Geist Sans + Geist Mono via `next/font/local` (bundled with Next.js 16).

**Contrast rule:** never use `--color-fg-muted` (`#6a7c8a`) for body text — fails AA at 2.6:1.

---

## CurriculumAccordion — data shape

```ts
type ResourceType = 'article' | 'video' | 'workbook' | 'practice' | 'template' | 'resource' | 'official docs';
type Resource = { type: ResourceType; label: string; url: string; duration?: string };
type Lesson   = { id: string; number: string; title: string; description: string; resources: Resource[]; estimatedTime?: string };
type Module   = { id: string; number: string; title: string; description: string; format: string; duration: string; goal: string; lessons: Lesson[]; workshop?: { title: string; body: string }; outcome: string };
type Phase    = { id: string; number: 1|2|3; name: string; tagline: string; modulesRange: string; duration: string; modules: Module[] };
```

Expand mechanism: CSS `grid-rows-[0fr]` → `grid-rows-[1fr]` transition. GSAP touches only the chevron rotation. `inert` attribute on closed panel content. Single-open state: `const [openId, setOpenId] = useState<string|null>(null)`.

---

## Animation rules

- Library: `gsap` core + `gsap/ScrollTrigger` (both free). `@gsap/react` `useGSAP` hook. **No club plugins.**
- Entrance only. `power2.out`. Duration 0.4–0.5s elements; 0.25s micro.
- Stagger 0.04–0.08s. Never above 0.1s for lists of 10+.
- Y displacement ≤ 12px. No `elastic`/`bounce`.
- `once: true` on every ScrollTrigger.
- Hover effects: CSS only (no GSAP).
- All animation gated: `if (prefersReducedMotion()) return;` — fallback is final CSS state.

---

## A11y patterns

- Landmarks: `<header role="banner">`, `<main>`, `<section aria-labelledby="…">`, `<footer>`.
- Accordions: `aria-expanded`, `aria-controls`, `role="region"`, `inert` on closed panels.
- Decorative SVGs: `aria-hidden="true"`.
- Focus style: `:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 3px }`.
- Target Lighthouse a11y ≥ 95.

---

## Vercel deployment

**Why static export is required:** Vercel's framework detector doesn't recognise Next.js 16 and falls back to `@vercel/static-build`, which generates a catch-all 404 route config with no content. Fix is in `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  output: "export",           // generates out/ instead of .next/
  images: { unoptimized: true }, // required with output: "export"
  turbopack: { root: path.resolve(__dirname) },
};
```

And `vercel.json`:
```json
{ "outputDirectory": "out" }
```

**Deploy sequence:**
```bash
vercel pull --yes --environment production
vercel build --prod
vercel deploy --prebuilt --prod
```

**SSO protection:** The `trinetix` team has Deployment Protection enabled. To allow public access, go to:
`vercel.com/trinetix/usrc-rapid-prototyping-program/settings/deployment-protection`
→ Set "Vercel Authentication" to Preview Deployments Only (or off).

---

## Out of scope

- Backend, API routes, forms, email
- Auth, analytics, cookie banners
- CMS (content stays in `course.ts`)
- i18n, dark mode
- Custom domain (using `*.vercel.app` until requested)
- Pricing tiers, related-pathways (JetBrains pattern excluded)
