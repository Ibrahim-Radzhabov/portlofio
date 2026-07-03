# CLAUDE.md — Project Instructions for AI Agents

> Source of truth is the **actual `index.html` on disk**. If this file ever
> disagrees with `index.html`, trust `index.html` and fix this doc.
> No exact line numbers are used here on purpose (they drift) — search by
> id / class / string instead.

> **New agent?** Read `AGENT-HANDOFF.md` first — it has the current multi-page state,
> open TODOs, the honesty constraints, and the verification toolkit for continuing this project.

## Project
**I. Radzhabov — personal portfolio** (Ибрагим Раджабов). Premium, high-conversion,
single-page site. Owner positions as a solo builder of **websites + AI assistants + 1C
integrations** ("сайты · AI-ассистенты · 1С"). Audience: founders, CEOs, product managers.
All user-facing text is **Russian**. Domain: `radzhabov-dev.ru`.

- `<title>`: `I. Radzhabov — сайты, AI-ассистенты и 1С для бизнеса`
- Positioning line: «Системы, которые работают вместе»

## Architecture

**Active entrypoint:** `index.html` — the whole site. **All CSS and JS are inline** in it.

### Hard constraints
- NO separate CSS or JS files. NO build step.
- NO external libraries/frameworks (React, Vue, GSAP, jQuery, Tailwind, …).
- NO CDN/external dependencies, NO Python generators committed to the repo.
- On the homepage, **Playfair Display, Outfit and JetBrains Mono are self-hosted** as WOFF2 subsets in `assets/fonts/`; do not restore render-blocking Google Fonts links there. Supporting pages may still use Google Fonts. Yandex Metrika is the only external runtime script.
- All homepage edits go in `index.html`.

### Files in the directory
- `index.html` — **the site. Source of truth.**
- **Sub-pages** (each standalone, same inline pattern, all in `sitemap.xml` — 28 URLs): `services/{landing,telegram-bot,ai-assistant,integraciya-1c,nastrojka-1c}.html`, `cases/{baby-massage,dag-sport,decorapp}.html`, `niches/{sajt-dlya-avtoservisa,sajt-dlya-massazhista,sajt-dlya-barbershopa,sajt-dlya-cvetochnogo-magazina,sajt-dlya-klininga,sajt-dlya-okonnoj-kompanii,sajt-dlya-servisnogo-centra,sajt-dlya-magazina-avtozapchastej}.html`, `cities/{mahachkala,kaspijsk,derbent}.html`, `blog/` (hub + `kak-svyazat-sajt-s-1c`, `chto-dolzhno-byt-na-lendinge`, `ai-konsultant-na-sajte`, `telegram-bot-vmesto-sajta`), `tools/kalkulyator-lendinga.html`, `legal/{privacy,soglasie}.html`. NB: `services/nastrojka-1c.html` deliberately has **no price** («оценка после разбора») — do not add one.
- **Geo (owner-confirmed 2026-07-02):** city = **Махачкала**; hybrid strategy — Webmaster region + «работаю удалённо по всей России» text + `/cities/`. Homepage Person JSON-LD carries `address` (Махачкала, Дагестан). Never claim CLIENT geography (dag-sport / baby-massage) — it is not confirmed.
- **Agent/owner docs (NOT deployed):** `AGENT-HANDOFF.md` (continuation brief), `seo-webmaster-setup.md` (owner's Вебмастер/GSC guide).
- `favicon.svg`, `favicon-16/32/48/180.png`, `apple-touch-icon.png`, `favicon.ico`, `og-image.png` — brand icons/share image (see "Brand assets").
- `robots.txt`, `sitemap.xml`, `llms.txt`, `404.html` — SEO/infra.
- `preloader-spec-v2.md`, `preloader-demo.html` — reference for the preloader (the live version now **extends** this spec — see below).
- `_archive/` — **legacy template leftovers + scratch**, moved out of the deploy root (`dale-*.html`, `_site/`, `site/`, `logo-concepts/`, `strateg-seo/`, `preloader-demo.html`, `*.bak`). Forked from a "Dale" template; contains foreign content (Dale McManus / "Kova Technology") and a stale telegram. **Do NOT deploy, use, or reference.**

## Design System

### Theme
**Light / warm ("кремовая") — NOT dark.** No dark mode, no theme toggle.
Decorative layers that still exist from the template, re-themed:
- Noise overlay: `body::before`, SVG feTurbulence, `z-index: 9999`, `opacity ~0.025`.
- Dot-grid canvas (`#dotGrid`), `position: fixed`, `z-index: 0` — all content must sit above it.
- Custom cursor: `body { cursor: none }` + `.cursor-glow` / `.cursor-follower`. Any new interactive element needs `cursor: none`.
- Hero mesh blobs (`.hero-mesh-blob`).

### CSS variables (`:root` — search `--bg-primary`)
| Variable | Value | Usage |
|---|---|---|
| `--bg-primary` | `#F5F0E8` | Page background (cream) |
| `--bg-secondary` | `#EAE4D8` | Alt/sunken surfaces |
| `--bg-card` | `#FBF8F3` | Cards |
| `--bg-card-hover` | `#FFFDF9` | Card hover |
| `--border` | `rgba(36,28,20,0.09)` | Default borders |
| `--border-hover` | `rgba(36,28,20,0.16)` | Hover borders |
| `--text-primary` | `#141210` | Headings / body (ink) |
| `--text-secondary` | `#6B655F` | Muted text |
| `--text-tertiary` | `#8A847D` | Labels/captions |
| `--accent` | `#1A3A2A` | Green accent (primary) |
| `--accent-dim` / `--accent-text` | `#2D5A45` | Darker green |
| `--accent-warm` | `#B5623C` | **Terracotta** accent (the brand's single warm pop) |
| `--accent-glow` / `--accent-warm-glow` | rgba greens / `rgba(181,98,60,0.07)` | Glow fills |
| `--color-error` / `--color-success` | `#A8443B` / `#2D5A45` | Form states |

Do not introduce new accent colors. The palette is **ink + cream + green, with terracotta as the only warm accent.**

### Typography
- Display / headings: `var(--font-display)` = **Playfair Display** (serif).
- Body: `var(--font-body)` = **Outfit** (sans).
- Mono (labels, tags, contacts, "tech" voice): `var(--font-mono)` = **JetBrains Mono**.
- Loaded weights: Playfair 500/600, Outfit 400/500/600, JetBrains 400/500.

### Easing
- `--ease-out-expo`: `cubic-bezier(0.16, 1, 0.3, 1)` — entrances / most transitions.
- `--ease-out-quart`: `cubic-bezier(0.25, 1, 0.5, 1)` — line draws / exits.

## Brand mark — «Излом» (the node chevron)

The logo is an abstract **three-node chevron**: two ink nodes + connectors meeting at a
**terracotta core** (the "AI" node). Concept: сайт → AI → 1С converge into one sign. It is
also exactly what the preloader chain assembles into.

**Color rule:** strokes + outer nodes use `currentColor` (so they inherit ink, or invert);
the **core is hardcoded `#B5623C`**. Two contexts:

- **Open mark** (on light surfaces — nav, preloader, og): `viewBox="0 0 48 48"`, no background.
  ```html
  <path d="M17 12 L31 24" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M31 24 L17 36" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>
  <circle cx="17" cy="12" r="5.5" fill="currentColor"/>
  <circle cx="31" cy="24" r="6.6" fill="#B5623C"/>   <!-- core -->
  <circle cx="17" cy="36" r="5.5" fill="currentColor"/>
  ```
- **Filled tile** (favicons / app-icon — reads on any tab bg): ink rounded square + cream mark + terracotta core. This is the content of `favicon.svg`.

**Where it lives (keep all in sync if the mark ever changes):**
- Nav: `svg.nav-logo-mark` (`viewBox 0 0 48 48`); inner classes `.nlm-link` ×2, `.nlm-node` ×2, `.nlm-core`. Hover/focus scales the core: `.nav-logo:hover .nlm-core { transform: scale(1.18) }`.
- Preloader brand block: the same open mark with classes `.pl-mk-link`(+`.pl-mk-link2`), `.pl-mk-na`, `.pl-mk-core`, `.pl-mk-nc` (these drive the assemble animation — see below).
- `favicon.svg` + raster icons + `og-image.png` (filled-tile / open variants).

## Preloader — «Pipeline» v2 + assemble morph

A full-screen overlay (`#preloader`) shown on load. The chain `сайт → AI → 1С` builds, then
**converges to centre and the brand sign draws itself in** (lines → nodes → warm core last),
then the wordmark/tagline rise. `index.html` is **ahead of `preloader-spec-v2.md`** — it adds:
terracotta arrowheads, click/Esc skip, brand-only reduced motion, hero hand-off, the «Излом»
mark, and the assemble morph. Treat the live code as canonical.

**Structure:** `#preloader > .pl-stage > { .pl-chain (.pl-node ×3 + .pl-arrow ×2 with
.pl-arrow-shaft/.pl-arrow-head), .pl-brand#pl-brand (the mark svg + .pl-wordmark + .pl-tagline) }`.

**JS** (its own IIFE at the very end of `<body>`, after the main script). Config:
`SEEN_KEY='plr_seen_v2'`, `FAILSAFE=3000`, `FAST_SHOW=480`, `FULL_END=1950`, `REDUCED`, `IS_IOS`.

Full first-visit timeline (ms): `200` сайт · `370` arrow1 · `480` AI · `600` arrow2 · `680` 1С ·
`880` `.pl-chain.pl-collapse` (fade + scale 0.5) · `1040` `.pl-brand` gets `pl-visible` **and**
`pl-morph` (sign assembles via `@keyframes plDraw/plPop/plRise`) · `1950` `exit()` → 0.35s fade →
DOM removal (+380ms).

Branches (do NOT break these):
- **Repeat visit** (`sessionStorage[SEEN_KEY]`): everything shown complete, no morph, exit ~480ms.
- **Reduced motion**: chain hidden, **only the brand shown static**, exit ~700ms. The mark/text must stay static (reduced block forces `animation:none; stroke-dashoffset:0; transform:none`).
- **Skip**: `pointerdown/touchstart/wheel/Escape` exit early; armed after a 250ms grace; `exit()` is idempotent (`done` flag).
- **Failsafe**: 3000ms guaranteed exit + scroll unlock + `body.pl-done`.
- `pl-morph` is added **only on the full first visit**.

**Hero hand-off:** `exit()` and the failsafe add `body.pl-done`. The hero stagger is gated:
`@media (prefers-reduced-motion: no-preference){ body.pl-done .hero .hero-anim { animation: heroStagger … } }`
(reduced-motion users get the static hero rule in the reduced block). Base `.hero .hero-anim` is `opacity:0`.

Other: `#preloader { z-index: 100000 }` (above the noise overlay's 9999); `@media print { #preloader{display:none} }`;
`<noscript>` hides `#preloader` so no-JS users see content.

## Sections (DOM order — open `index.html` and read the section before editing)
`#preloader` → `#nav` (+ `#mobile-menu`, `toggleMenu()`) → `header.hero#main-content`
→ marquee (`.marquee-*`, balanced across сайты/AI/1С) → `#work` (cards + a `data-work-intro`
"discovery" interaction — separate from the preloader) → `#services` → `#process` → `#format`
→ `#about` (has `.about-image-placeholder` — photo still a placeholder) → `#faq`
(`<details>/<summary>`, FAQPage schema) → `#contact` (form, Formspree) → `<footer>` (`.footer-inner`).

## JavaScript
Two IIFEs, both `'use strict'`:
1. **Main script** (debounce; section-title stability; nav `.scrolled` on scroll; `toggleMenu()` mobile menu; scroll-reveal `.reveal`→`.visible`; smooth anchor scroll; dot-grid canvas; cursor glow/follower; hero parallax/mesh; marquee; work "discovery" intro; back-to-top `#scrollTopBtn`; **Formspree form**).
2. **Preloader script** (see above) — last in `<body>`.

`toggleMenu()` is global (`window.toggleMenu`) — used by inline `onclick` in the mobile menu.

## Brand assets / icons
All regenerated to the «Излом» mark:
- `favicon.svg` — filled ink tile + cream mark + terracotta core (works on any tab bg). Referenced in `<head>` along with `favicon-32.png`, `favicon-16.png`, `apple-touch-icon.png` (opaque square), `favicon.ico`.
- `og-image.png` (1200×630) — cream, mark + name + «Системы, которые работают вместе» + domain. **Domain now corrected to `radzhabov-dev.ru`** (patched in place, rest of the bitmap unchanged). Still uses DejaVu as a stand-in for Playfair/Outfit; for pixel-perfect typography, drop `PlayfairDisplay.ttf` + `Outfit.ttf` and re-render.
- Raster icons are rasterized from the mark (e.g. Pillow/ImageMagick **outside** the repo — do not commit a generator). The canonical geometry is the mark above; keep all icons consistent if it changes.

## Responsive
Breakpoints around `≤968px` (nav → hamburger, grids → 1-col) and `≤640px` (padding shrinks,
single-col, smaller type). Preloader also has `≤480px` and `≤340px` rules. Test at 375px, 768px, desktop.

## Accessibility
`aria-label` on nav/footer/menu/social/icon-only controls; `aria-expanded` on the menu button;
`aria-hidden="true"` on decorative SVG/canvas/overlays; visible `focus-visible` outlines;
`@media (prefers-reduced-motion: reduce)` static fallbacks (incl. the preloader brand-only state);
skip-nav + ARIA live region for the form.

## SEO / structured data
- Russian `<title>` + keyword-rich `<meta name="description">`; Open Graph + Twitter `summary_large_image`.
- JSON-LD `@graph` (Person/ProfilePage/WebSite/services/FAQ). **Already on-brand and three-pillar** —
  jobTitle «Соло-разработчик сайтов, AI-ассистентов и 1С-связок», 5 `makesOffer` services.
- **Real contacts already in JSON-LD** (don't invent/replace): email `1cworkac@mail.ru`,
  `sameAs` = `github.com/Ibrahim-Radzhabov`, `t.me/rdvigm`. Keep on-page text and structured data consistent.

## Development
```bash
python3 -m http.server 8000   # then open http://localhost:8000/
```
Quick checks after edits: extract the preloader `<script>` and run `node --check`; run an HTML
tag-balance parse; verify at 375px for horizontal overflow.

## Known TODOs (need the owner's real data — do NOT fabricate)
> Stale items removed 2026-07-02: Formspree is live (`mkolvvep` on all forms + consent checkbox) and the «Излом» mark is unified across all pages — see `AGENTS.md` for the current state.
1. **About photo** — `.about-image-placeholder` is still a placeholder; needs a real portrait.
2. **og-image fonts (optional)** — domain fixed to `radzhabov-dev.ru` ✓. Bitmap still uses a DejaVu stand-in; provide `PlayfairDisplay.ttf` + `Outfit.ttf` for a pixel-perfect re-render.
3. **Client geography** — dag-sport / baby-massage client cities are unconfirmed; ask the owner before adding any «работал с местным бизнесом» claims to `/cities/`.
4. **Off-page (owner executes):** push + Webmaster region (Махачкала) + reindex; then backlinks per `marketing/backlink-kit.md` (profiles → client footers → Habr/VC article; article placeholders need the owner's real facts). Current open list in `AGENTS.md` §«Что открыто».

## Done / locked (don't redo without reason)
Brand «Излом» across nav + preloader + all icons + og; preloader v2 + assemble morph (all branches verified);
marquee balanced across the three pillars; JSON-LD three-pillar with real links; robots/sitemap/llms/404; FAQ;
multi-page SEO/GEO build (4 services + 2 cases + 5 niches + calculator + legal, type-matched JSON-LD + internal linking);
legacy moved to `_archive/`; meta titles/descriptions trimmed to SERP limits;
Phase 0 (legal + consent + Formspree `mkolvvep` + Metrika goals); Phase 1 (5 niches, «Излом» unified);
Phase 2 (geo line + `/cities/` Махачкала/Каспийск/Дербент + `/blog/` hub + 3 pillar articles, sitemap 22 URLs);
micro-CRO pass over services verified 2026-07-02 — «для кого / что входит / сроки / CTA» already present, no bloat added.

## Common pitfalls
- Keep the brand mark consistent everywhere (nav `.nlm-*`, preloader `.pl-mk-*`, `favicon.svg`, icons). Core is always terracotta `#B5623C`; rest is `currentColor`/ink.
- Don't reintroduce a `.pl-brand > svg *` "freeze" rule — it would block the assemble morph. The mark stays static in non-morph branches via resting state + the reduced-motion block.
- `#preloader` is `z-index: 100000`; noise overlay `body::before` is `9999`; dot grid is `0`. Keep this order.
- Custom cursor `cursor: none` is global — add it to any new interactive element.
- Update **both** `@media (prefers-reduced-motion: reduce)` (static fallback) and, for hero/preloader, the `no-preference` gating when adding animations.
- `.footer-inner` drives the footer flex layout — don't remove it.
- Marquee has **two identical tracks** for the infinite loop — edit both.

## When editing
1. Read the relevant section/markup in `index.html` first.
2. Keep everything inline in `index.html`; Russian for all user-facing text.
3. Respect the light/warm palette; terracotta is the only warm accent. No new accent colors without asking.
4. Add `prefers-reduced-motion` fallbacks + `cursor: none` + `aria-label` for anything new.
5. Test 375 / 768 / desktop; re-check the preloader branches if you touch it.
6. Don't fabricate the owner's facts (bio, stack, numbers, links) — ask.
