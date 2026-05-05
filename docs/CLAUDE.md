# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (uses Turbopack)
npm run build        # Production build
npm run start        # Serve production build locally
npm run lint         # ESLint
npm test             # Unit tests (Vitest, run-once)
npm run test:watch   # Vitest in watch mode
npm run test:e2e     # Playwright end-to-end tests (requires dev or prod server running)
npm run analyze      # Bundle analysis (ANALYZE=true next build)

# Content extraction — run after Webflow HTML changes:
npm run extract:our-menu      # Parses site-content.json → our-menu.json
npm run extract:menu-lead     # Parses menu page lead section into menu-page-lead.json
npm run sync:sauce-lab        # Syncs sauce-lab public assets
```

To run a single unit test file: `npx vitest run lib/__tests__/split-page-html.test.ts`

## Architecture

### Webflow-to-Next.js hybrid

The site is a **Next.js 16 App Router** app that wraps HTML exported from Webflow. The core pattern: raw Webflow HTML lives in `content/generated/site-content.json`, and each page pulls its content from that JSON at build time via `lib/site-content.ts`. Pages render legacy HTML through `dangerouslySetInnerHTML` inside `PageShell`, which provides the shared `SiteNavbar` + `SiteFooter` wrapper.

### Content pipeline

```
Webflow export → content/generated/site-content.json
                       ↓
              scripts/extract-our-menu.mjs → content/generated/our-menu.json
              scripts/extract-menu-page-lead.mjs → content/generated/menu-page-lead.json
```

- `lib/site-content.ts` — reads `site-content.json`; exposes `getRouteContent`, `getProductContent`, `getLocationContent`, `getProductSlugs`, `getLocationSlugs`
- `lib/our-menu-data.ts` — reads `our-menu.json`; hot-reloads in dev, cached in prod
- `lib/split-page-html.ts` — surgically splits Webflow HTML strings to splice in React components at specific class-name markers (e.g. `section_home-menu`, `section_home-about`)

### Page rendering

- `components/site/PageShell.tsx` — the universal page wrapper. Accepts either `mainHtml` (raw Webflow HTML) or `mainSlots` (ordered mix of HTML strings and React nodes). Most pages use `mainSlots`.
- `components/site/RoutePage.tsx` — thin wrapper for simple routes that need no extra components; calls `getRouteContent` and delegates to `PageShell`.
- Dynamic segments (`/product/[slug]`, `/locations/[slug]`) use `generateStaticParams` to enumerate keys from `site-content.json`.

### Motion / animation stack

- **Lenis** — smooth scroll, initialized in `components/site/SmoothScroll.tsx` (`'use client'`). Exposes instance via `LenisProvider` in `components/site/lenis-context.tsx`.
- **GSAP + ScrollTrigger** — registered lazily in `lib/gsap/`; Lenis `scroll` event drives `ScrollTrigger.update` to keep them in sync.
- **Motion** (`motion` package) — used for page/component-level transitions.
- **DotLottie** (`@lottiefiles/dotlottie-react`) — Lottie animations for nav CTAs and interactive icons.
- **HomePreloader** — letter-by-letter intro animation on first session visit (keyed by `sessionStorage`).
- **PageTransitionChrome** (`components/site/PageTransitionChrome.tsx`) — client component wrapping the entire app; manages `PageLoader` overlay between route navigations and `HomePreloader` on `/`.

### Asset layout (`public/assets/`)

Defined in `lib/public-asset-layout.ts`:
- `brand/` — logos and wordmarks
- `home/preloader/letter-*.png` — preloader letter PNGs; other `home/` hero and about imagery
- `menu/covers/` — tab cover art; `menu/items/` — product photography keyed by `content/generated/our-menu.json`
- `menu/` root — banners and illustration strip for the `/menu` route
- `sauce-lab/fonts/`, `sauce-lab/images/` — Sauce Lab route assets (`lib/sauce-lab-data.ts`, `npm run sync:sauce-lab`)
- `lottie/` — DotLottie/JSON animations
- `video/hero-desktop.mp4`, `video/hero-mobile.mp4` — full-bleed hero videos
- `public/vendor/` — shared Webflow CSS (`brasa-template.shared.*.min.css`) loaded once in `app/layout.tsx` with immutable cache headers

### Environment variables

Only one env var is required:
- `NEXT_PUBLIC_SITE_URL` — canonical site URL used for `metadataBase` and Open Graph (no trailing slash). Set in `.env.local`.

Hero videos are committed directly to `public/assets/video/` — no env var needed.

### CSS strategy

- `app/globals.css` + `app/styles/globals-tokens.css` — design tokens and global styles
- `app/styles/globals-home-nav.css` — home page nav overrides
- `public/vendor/brasa-template.shared.*.min.css` — the Webflow-generated stylesheet loaded via `<link>` in `<head>` (bypasses Next.js CSS pipeline; filename is content-hashed)
- Module CSS (`.module.css`) used for feature-specific components: `menu-page/menu-page.module.css`, `sauce-lab/sauce-lab-page.module.css`
- Component-scoped global CSS: `home-hero-video.css`, `home-menu-overrides.css`, `header-pill-cta.css`

### Testing

- **Vitest** — unit tests live in `lib/__tests__/`. Focus on pure functions in `lib/` (HTML splitting, URL helpers, path matching).
- **Playwright** — E2E smoke tests in `tests/e2e/smoke.spec.ts`. Tests require the site to be running (`npm run dev` or `npm start`).
