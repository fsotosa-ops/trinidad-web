# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Trinidad is a boutique B2B consultancy site (Spanish, `lang="es"`). The site sells a 60-day diagnostic ("Diagnóstico 3/60") delivered by three fractional C-level profiles (CMO, CPO, CTO). Copy and visual decisions follow a sober, content-dense, European-boutique tone — see README.md for the full brand brief.

## Commands

```bash
npm run dev      # start Next dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint (eslint-config-next, core-web-vitals + typescript)
```

There is no test runner configured.

## Required environment variables

Create `.env.local` at the repo root:

```
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_TOKEN=
CONTENTFUL_ENVIRONMENT=master
```

Without these, the homepage GraphQL fetch fails and the build will fail at request time.

## Architecture

**Next.js 16 App Router + React 19 + Tailwind v4.** React Compiler is enabled in `next.config.ts` (`reactCompiler: true`) — do not write code that relies on memoization side effects that the compiler would invalidate (no manual `useMemo`/`useCallback` patterns that the compiler is meant to replace).

### Directory layout (note the unusual root-level dirs)

- `src/app/` — App Router routes, layouts, `globals.css` (Tailwind v4 via `@import "tailwindcss"`).
- `lib/contentful/` — Contentful integration, **lives at the repo root, not under `src/`**.
  - `client.ts` — official `contentful` SDK client. **Currently unused**; the codebase fetches via GraphQL. Leave it alone unless switching strategies.
  - `fetch.ts` — `contentfulFetch(query, preview)` posts to the GraphQL endpoint with `next: { revalidate: 3600 }` (1h ISR). The `preview` flag swaps the access token for the preview token.
  - `queries.ts` — GraphQL query strings (single `HOMEPAGE_QUERY` today).
  - `homepage.ts` — `getHomepage()` calls `contentfulFetch`, applies post-fetch sorts, and returns a typed `HomepageData`. **All section ordering logic lives here, not in components** (see "Sorting invariants" below).
- `components/sections/` — one file per page section (`hero`, `problem`, `target`, `solution`, `process`, `pricing`, `closing`, plus `header` / `footer`). Composed in order by `src/app/page.tsx`.
- `components/ui/` — primitives (`button`, `container`, `eyebrow`, `rich-text`).
- `types/contentful.d.ts` — TypeScript shapes for every Contentful section + entry referenced in `HOMEPAGE_QUERY`.
- `public/` — static assets including `trinidad-logo-dark.png` / `trinidad-logo-white.png` and founder photos (`founder-cmo.png`, `founder-cpo.jpeg`, `founder-cto.webp`).

### Path alias

`tsconfig.json` defines `@/*` → repo root (not `./src/*`, which is the Next default). So imports look like `@/lib/contentful/homepage` and `@/components/sections/hero` — both `src/` and root-level dirs are reachable from the same prefix. Keep this in mind when adding files.

### Contentful content model

The homepage pulls one entry from each of these collections (via `HOMEPAGE_QUERY` in `lib/contentful/queries.ts`):

| Collection | Key fields | Linked entries |
|---|---|---|
| `sectionHeroCollection` | `tituloEs`, `subtituloEs`, `ctaPrincipalEs`, `ctaSecundarioEs` | — |
| `sectionProblemCollection` | `tituloH2Es`, `cuerpoEs` (rich text) | — |
| `sectionTargetCollection` | `tituloH2Es`, `verticalesEs`, `encajaSiEs` / `noEncajaSiEs` (rich text) | — |
| `sectionSolutionCollection` | `tituloH2Es`, `cuerpoEs` (rich text) | `Founder` (`nombre`, `titulocanonico`, `aristaEs`, `descripcionEs`) |
| `sectionProcessCollection` | `tituloH2Es`, `introEs`, `cierreEs` (rich text) | `Sprint` (`numero`, `nombreEs`, `objetivoEs`, `entregableEs`, `dias`) |
| `sectionPricingCollection` | `tituloH2Es`, `ofertaIrresistibleEs` (rich text) | `Product` (`nombreEs`, `precio`, `descripcionEs`, `hitosPagoEs`) |
| `sectionClosingCollection` | `tituloH2Es`, `ctaTextoEs`, `cuerpoEs` (rich text) | — |

Field-naming convention is Spanish with an `Es` suffix on localized text (`tituloH2Es`, `nombreEs`, `entregableEs`, `cuerpoEs`). When extending the query or adding new content types, mirror that convention so Contentful and code stay aligned. Rich-text fields are queried as `{ json }` and rendered through `components/ui/rich-text`.

### Sorting invariants (`lib/contentful/homepage.ts`)

The shape returned to components is sorted in `getHomepage()`. **Do not re-sort in components** — and if you change these, update both call sites:

- **Founders** are sorted CMO → CPO → CTO via `aristaRank()`, which reads the first 3 chars of `titulocanonico`. Adding a fourth founder requires extending `ARISTA_ORDER`.
- **Sprints** are sorted by numeric `numero` (ascending).
- **Pricing products** put any product whose `nombreEs` matches `/3\s*\/\s*60/` first (the diagnostic), then everything else in fetch order. New continuity products land after the diagnostic automatically.

### Styling: Tailwind v4 theme tokens

`src/app/globals.css` defines custom design tokens via `@theme {}`. Use the generated utility classes — **don't hardcode hex values in components**:

| Token | Class examples | Hex |
|---|---|---|
| `--color-trinidad-black` | `bg-trinidad-black`, `text-trinidad-black` | `#1A1A1A` |
| `--color-trinidad-cream` | `bg-trinidad-cream`, `text-trinidad-cream` | `#F5F0EB` |
| `--color-trinidad-terracota` | `bg-trinidad-terracota`, `text-trinidad-terracota` | `#C4633A` (reserve for CTAs / signature details) |
| `--color-trinidad-gray` | `text-trinidad-gray`, `border-trinidad-gray` | `#888780` (metadata, borders) |
| `--color-trinidad-line` | `border-trinidad-line` | `#E4DDD3` (subtle dividers) |

Inter is wired through `next/font/google` in `src/app/layout.tsx` and exposed as `--font-inter` → `--font-sans`. Body letter-spacing of `0.02em` is applied globally via `--tracking-trinidad`. The `@tailwindcss/typography` plugin is loaded for rich-text rendering.

## Branding (from README)

UI principles: abundant whitespace, text is the protagonist, no colored icons or generic illustrations. Logos are caps + Medium weight + wide tracking. Two logo variants live in `public/`: `trinidad-logo-dark.png` (on cream) and `trinidad-logo-white.png` (on black).

The Founder section in `components/sections/solution.tsx` should give protagonism to CMO / CPO / CTO. Use `www.sumadots/s4i` co-founders section as visual reference.
