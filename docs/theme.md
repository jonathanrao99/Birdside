# Birdside Design System (Senior-Level v2)

Use this before shipping new UI. Stack: **Next.js** + **Brasa** Webflow export (`public/vendor/brasa-template.shared.*.min.css`) + Birdside overrides in `app/styles/` and `components/site/`.

**Principles guide every decision** — tokens, type, layout, and components follow them, not the reverse.

---

## Design principles (non-negotiable)

1. **Bold over subtle** — High contrast, loud visuals, no soft UI.
2. **Food is the hero** — Imagery beats UI decoration.
3. **Instant clarity** — Users should know what to do in under 2 seconds (e.g. Order Now).
4. **Consistency over creativity** — Reuse patterns; do not invent one-offs.
5. **Speed over aesthetics** — Performance and responsiveness win over extra polish.

---

## Token system (intent-based)

Canonical definitions live in **`app/styles/globals-tokens.css`** on `:root`. **Prefer these names in new code**; legacy `--brand-red` / `--surface-black` remain aliases for existing styles.

```css
:root {
  /* Core */
  --color-bg: #000;
  --color-text: #fff;
  --color-primary: #e30119;

  /* Surfaces */
  --color-surface: #101010;
  --color-muted: rgba(255, 255, 255, 0.7);

  /* Borders */
  --border-light: rgba(255, 255, 255, 0.16);

  /* Effects */
  --shadow-soft: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-strong: 0 10px 30px rgba(0, 0, 0, 0.7);

  /* Legacy aliases (keep for Brasa overrides + existing CSS) */
  --brand-red: var(--color-primary);
  --surface-black: var(--color-surface);
}
```

**Notes**

- **`--color-primary`** is the only marketing red — never substitute Brasa **`--primary--red`** (`#dd2825`).
- Footer dividers and similar rules align with **`--border-light`**.
- **`theme-color`** in `app/layout.tsx` matches **`--color-primary`**.

### Brasa vendor palette (reference only)

Template still ships neutrals/accent vars (`--primary--beige`, greys, script font, etc.). Birdside **defaults to black / white / `--color-primary`**. Use vendor vars only when unpicking CMS HTML or template classes.

### Color usage rules (enforced)

| Use red (`--color-primary`) for | Do **not** use red for |
|----------------------------------|-------------------------|
| CTA buttons (primary accent) | Body copy or long paragraphs |
| Highlights and key accents | Replacing black backgrounds |
| Hamburger lines, strong nav accents | Small text without contrast check |

| Use black (`--color-bg`) for | Use white (`--color-text`) for |
|------------------------------|--------------------------------|
| Page and section backgrounds | Primary text on dark UI |
| Nav bar | Headlines on red heroes (large/bold) |

**Never** mix template marketing red (`#dd2825`) with Birdside red.

---

## Typography system

Brasa loads faces via vendor CSS. CSS variables:

- **`--_typography---font-family--primary`:** `"OMG Sans", Impact, sans-serif`
- **`--_typography---font-family--secondary`:** Space Grotesk (`next/font/google` → `--font-space-grotesk`), then `system-ui`, sans-serif
- **`--_typography---font-family--detail`:** `"Batuphat Script", Arial, sans-serif`

### Display (hero only)

- **Font:** OMG Sans (`var(--_typography---font-family--primary)`)
- **Case:** Uppercase
- **Weight:** 800–900 where emphasis is needed
- **Tracking:** `0.04em`–`0.06em`
- **Usage:** Home video CTA headline, full-bleed hero statements — not body blocks

**Implementation reference:** `components/site/home-hero-video.css` (uppercase, tracking, text-shadow on video).

### Headings (sections, cards)

- **Font:** OMG Sans
- **Case:** Uppercase for marketing headings
- **Usage:** Section titles, menu carousel title, card titles — follow existing `clamp()` sizes in section CSS

**Reference:** `components/site/menu-page/menu-page.module.css` (e.g. weight 900, tracking `0.05em`).

### Body

- **Font:** Space Grotesk 400 / `system-ui` fallback (`var(--_typography---font-family--secondary)`); **500** small UI labels; **600** nav, buttons, uppercase CTAs
- **Case:** Normal (sentence case)
- **Rhythm:** ~**1.4** line-height, **0.02em–0.04em** letter-spacing on supporting text
- **Max width:** ~**60ch** for long reading columns when you control the container

### Labels / UI chrome

- **Case:** Uppercase
- **Tracking:** `0.06em`–`0.12em`
- **Usage:** Pills, footer labels, nav CTAs, metadata rows

**Header pill CTAs:** weight **800**, uppercase, tracking **`0.06em`** (`header-pill-cta.css`).

---

## Layout system

- **Max content width:** **1200px–1280px** for readable marketing columns (template uses wide containers; tighten new bespoke sections to this band when designing “article-like” content).
- **Section padding:** **`clamp(3rem, 6vw, 6rem)`** as the default mental model — match adjacent sections in code today, then converge new work toward this rhythm.
- **Alignment**
  - **Marketing / heroes:** center-aligned headlines and primary CTAs where the template does today.
  - **Info / long content:** left-align for scanability (~60ch).
- **Page rhythm (marketing)**

  **Hero → checker divider → content → CTA → footer**

  Checker strip: **`2.5rem`** B/W tile grid (`app/styles/globals-home-nav.css`, `.pattern-strip.black`).

**Rhythm note:** Back-to-back black sections can feel flat — use **spacing**, **checker**, or **red band** to vary cadence (see UI audit).

---

## Component system

### Buttons (primary pattern)

| Variant | Background | Text | Shape | Weight | Notes |
|---------|------------|------|-------|--------|--------|
| **Primary (accent)** | `var(--color-primary)` | `var(--color-text)` | Pill `9999px` | **800** | Accent pill + shadow offset on hover |
| **Secondary (light)** | `var(--color-text)` | `var(--color-surface)` | Pill `9999px` | **800** | “Ghost” shadow uses red underlay |

**Rules**

- **Max one primary CTA per section** (Order Now wins).
- **Always uppercase** for these chrome CTAs.
- **Hover:** translate + shadow shift (see `.header-pill-cta-wrap` in `header-pill-cta.css`).
- **Unify** navbar Order CTAs and hero CTAs under **`HeaderPillCta`** + shared classes — avoid divergent button styling.

**Files:** `components/site/HeaderPillCta.tsx`, `components/site/header-pill-cta.css`.

### Cards (menu items)

- **Image:** square aspect (e.g. **`10rem`** desktop in home menu overrides; scales down on breakpoints).
- **Title:** bold, uppercase (template + overrides).
- **Price / meta:** secondary, smaller or muted tone.
- **Hover:** slight scale + shadow where implemented; keep motion subtle.

**Rules:** Tight spacing, **food-forward** — do not crowd with chrome.

**Files:** `components/site/home-menu/home-menu-overrides.css`.

### Navigation

- **Background:** `var(--color-bg)`
- **Links:** `var(--color-text)`; **hover:** underline **`scaleX`** (white bar, ~`0.32s`, `cubic-bezier(0.33, 1, 0.32, 1)`).
- **CTA:** pill **Order** actions via the shared header pill pattern.

**Rules:** Minimal chrome; **no heavy dropdown clutter** unless product requires it.

**Files:** `app/styles/globals-template.css` (navbar), `components/site/SiteNavbar.tsx`.

### Hero

**Variants**

1. **Video hero (home)** — full-bleed video, CTA stack, display type (`home-hero-video.css`).
2. **Red hero (sections)** — `var(--color-primary)` band, white type (locations, product, contact patterns in `globals-template.css`).

**Rules**

- Always surface a **clear CTA**.
- Prefer **≤ 2 lines** of headline on marketing heroes.
- **Strong contrast** — if type sits on video, strengthen **shadow** and/or **overlay** (see audit).

---

## Interaction system

| State | Behavior |
|-------|-----------|
| **Hover — links** | Underline grow (`scaleX`), not color-only |
| **Hover — buttons** | Shadow + slight lift (header pill wrap translate) |
| **Click / active** | Slight press — e.g. **`scale(0.98)`** on controls where appropriate |
| **Transitions** | Prefer **fade + translate** only for enter/exit |

**Durations:** **`0.2s`–`0.4s`**

**Easing**

- **Smooth:** `cubic-bezier(0.33, 1, 0.32, 1)` — underlines, page shell fades.
- **Snappy:** `cubic-bezier(0.16, 1, 0.3, 1)` — panel pops (e.g. CTA reveal).

**Avoid:** Heavy motion, long delay-based chains.

**Performance:** Animate **`transform`** and **`opacity`** where possible; respect **`prefers-reduced-motion`** (already used across nav, menu tabs, hero video, header pills, CTA).

---

## Sub-brand: Sauce Lab

**Purpose:** Experimental / premium sauce exploration — visually richer than the core site.

**Differences from main UI**

- Glassmorphism: **`backdrop-filter: blur(12px)`**, translucent surfaces.
- **Yellow accent** **`#f2df0d`** for highlights (e.g. nutrition labels).
- Full-bleed imagery and immersive layout.

**Rules**

- **Isolated** — display face `SauceDisplay` (Supernett) in `sauce-lab-page.module.css`; body/UI there uses the same Space Grotesk stack as the rest of the site.
- Own module CSS; keep bundle scoped to the route.

**Files:** `components/site/sauce-lab/sauce-lab-page.module.css`, `SauceLabPageClient.tsx`.

---

## Motion & performance

- **Duration:** `0.2s`–`0.4s` (see Interaction).
- **Easing:** smooth vs snappy curves above.
- **Animate:** `transform`, `opacity` first.
- **`prefers-reduced-motion`:** shorten or disable motion; do not rely on motion for meaning.

**LCP / bundle:** Prefer component-level CSS modules for new UI; avoid growing global CSS without need; optimize hero media.

---

## Accessibility

- **Focus:** **`2px`** outline + **`3px`** offset (match pills / focus-visible patterns in repo).
- **Touch targets:** minimum **44px** (align nav CTAs and icon hit areas to this).
- **Contrast:** White on **`--color-primary`** — reserve for **large / bold** display type; test smaller copy.
- **Always:** Meaningful **alt text** on food/marketing images; full **keyboard** paths for nav, menus, and modals.

---

## Dev rules

1. **Never hardcode theme colors** — use **`var(--color-*)`** / **`var(--border-light)`** / shadows (legacy **`--brand-red`** OK in old files until migrated).
2. **Prefer CSS modules** (or colocated CSS) for component-specific styling.
3. **Global CSS** — layout shells, route wrappers, Brasa overrides, tokens only.
4. **Reuse** `HeaderPillCta`, nav/footer patterns, and section classes **before** new primitives.
5. **Performance:** watch bundle size and LCP; lazy-load heavy below-the-fold media where sensible.

---

## Breakpoints & z-index (implementation)

| Approx | Role |
|--------|------|
| `479px` | Small phone |
| `767px` | Mobile / template split |
| `991px` | Nav / hero / CTA shifts |
| `992px` | Desktop CTA track |
| `1024px` | Large layouts, Sauce Lab |
| `1280px` | Menu / Sauce Lab |

**Z-index:** boot splash `10001`, home preloader `10002`, page loader `10000`, home nav stack `25` over hero — coordinate new overlays with these.

---

## UI audit (current site)

### What’s working

- Strong **hero** (video + bold type).
- **Clear primary CTA** path.
- Consistent **black / red / white** system.
- **Menu cards** read clean and food-first.

### What to tighten

1. **CTA consistency** — Navbar vs hero CTAs should feel identical; **strictly unify** under the button system (`HeaderPillCta` + shared tokens).
2. **Text over video** — Headlines like “THIS AIN’T REGULAR CHICKEN” may need **stronger text-shadow** or a **light overlay** for readability on all clips.
3. **Section rhythm** — Adjacent **black → black** bands can blur together; use **spacing**, **checker**, or **contrast shifts** to create cadence.
4. **Menu density** — Tighten **vertical rhythm** and align gaps so the grid feels more **premium** and consistent.

---

## File map

| Concern | Files |
|---------|--------|
| Tokens & route shells | `app/styles/globals-tokens.css` |
| Home hero, about, checker | `app/styles/globals-home-nav.css` |
| Locations, product, contact, CTA, nav/footer, loaders | `app/styles/globals-template.css` |
| Home menu | `components/site/home-menu/home-menu-overrides.css` |
| Header CTAs | `header-pill-cta.css`, `HeaderPillCta.tsx` |
| Video hero type | `components/site/home-hero-video.css` |
| `/menu` | `components/site/menu-page/menu-page.module.css` |
| Sauce Lab | `components/site/sauce-lab/sauce-lab-page.module.css` |
| Vendor `:root` | `public/vendor/brasa-template.shared.*.min.css` |

---

*Re-scan `globals-*.css` and vendor `:root` when the Brasa export changes.*
