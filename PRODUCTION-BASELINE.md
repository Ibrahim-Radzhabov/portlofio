# Production Golden Baseline — radzhabov-dev.ru

> **OWNER-APPROVED STATE. DO NOT REDESIGN OR "IMPROVE" WITHOUT AN EXPLICIT NEW OWNER REQUEST.**
>
> Fixed on: **2026-07-10**
> Git commit: **`74018e8c1f894eafebd02459f9dbdeae68007b0c`** (`Ship Phase 8 fracture and journey cards`)
> RU-edge release: **`20260710Tphase8-74018e8`**
> Public URL: **`https://radzhabov-dev.ru/`**

This document defines the current production homepage as the **golden visual and behavioral baseline**. It overrides old Phase 8 prototype briefs and subjective improvement suggestions. The owner explicitly considers this production state very good and wants it preserved.

## Critical distinction: production is not the dirty worktree

The local worktree contains several layers of unrelated, uncommitted work. **Do not treat the current files on disk as an exact copy of production and do not stage them wholesale.** The byte-exact production source is commit `74018e8`.

Use these commands when exact comparison is required:

```bash
git show 74018e8:index.html
git diff 74018e8 -- index.html assets/css/home.css assets/js/home.js assets/js/hero3d.js assets/js/home-motion.js
bash .github/verify-production-baseline.sh --commit
bash .github/verify-production-baseline.sh --production
bash .github/verify-production-baseline.sh --release-commit
```

The deployed release contains **126 files**, including **31 HTML files**; `sitemap.xml` contains **30 URLs**. The lower inventories in `AGENTS.md` / `CLAUDE.md` may describe pending, uncommitted pages and must not be mistaken for live production.

## What is approved on the homepage

### 1. Existing homepage composition stays intact

- Light editorial/premium theme: cream background, ink text, dark green primary actions, terracotta `#B5623C` as the only warm accent.
- Playfair Display / Outfit / JetBrains Mono typography and current sizing/weights.
- Current header, hero copy, three offer switches, CTA, right-side three-step explanation, preloader, «Работы», discovery carousel, services, cases, about, FAQ, contacts and sticky contact.
- The full `_proto/phase8-izlom-system.html` layout is **not approved for production**. It is only an idea source. Do not copy its navigation, page grid, X-ray section or other composition.

### 2. Approved Phase 8 «Излом» only

The hero keeps the production layout but uses the Phase 8 fracture treatment:

- two black outer nodes on the left and one terracotta central node on the right;
- two thin, visually uniform black segments converging into the central node;
- exactly eight small terracotta particles moving along the two segments on desktop;
- particles move along the path without random lateral wobble, halos or duplicated render layers;
- a restrained soft elliptical shadow below the lower part of the mark;
- Three.js is the enhanced desktop layer; lightweight WebGL and static SVG remain valid fallbacks;
- static fallback geometry must visually match the enhanced geometry;
- no thick-at-start connector bug, no duplicate «Излом», no duplicated particles.

Protected implementation: `index.html`, `assets/css/home.css`, `assets/js/hero3d.js`, `assets/js/home-motion.js`.

### 3. Approved cards in «Связка»

Three cards appear progressively with the existing request-path scroll progress:

1. **Первый контакт** — form data and task context.
2. **AI-квалификация** — assistant clarifies the request and hands it to a person when needed.
3. **Учёт и склад** — data is fixed in the accounting system as an order draft.

Desktop: three equal columns. Mobile: one column. The current stage receives a thin terracotta border; inactive cards remain quiet. With `prefers-reduced-motion: reduce`, all cards are immediately visible and do not animate.

Protected implementation: `index.html`, `assets/css/home.css`, `assets/js/home.js`.

## Runtime invariants

- Motion gate: desktop only, `min-width: 969px`, `pointer: fine`, and `prefers-reduced-motion: no-preference`.
- Mobile and reduced-motion modes must not request GSAP/Three/home-motion vendor scripts.
- No horizontal overflow at 390x844, 768px or 1440x900.
- No console errors, uncaught page errors or CSP violations.
- Meta-CSP must continue to allow the tested Yandex Metrika endpoints, including `mc.yandex.com` and `wss://mc.yandex.com`.
- Formspree, honeypot `_gotcha`, consent gates and Metrika goals must remain intact.
- Asset cache versions must be bumped when protected CSS/JS really changes.

## Visual references

These captures are evidence of the accepted production state, not new design targets:

- `docs/production-baseline/2026-07-10-desktop-hero.webp`
- `docs/production-baseline/2026-07-10-desktop-cards.webp`
- `docs/production-baseline/2026-07-10-mobile-cards.webp`

## Protected-file hashes

The canonical SHA-256 manifest is `.github/production-baseline.sha256`. It covers:

- `index.html`
- `assets/css/home.css`
- `assets/js/home.js`
- `assets/js/hero3d.js`
- `assets/js/home-motion.js`

The production bytes and commit `74018e8` were verified to match all five hashes on 2026-07-10.

The byte-exact inventory of the complete deployed artifact is stored in `.github/production-release-74018e8.sha256` (126 files). It is a recovery/audit snapshot, not a ban on future owner-approved content releases.

## Mandatory protocol for any future change

1. Obtain an explicit owner request naming the exact homepage element to change. A generic request such as «улучши дизайн» is not permission to replace the page composition.
2. Read this file, `AGENTS.md`, `CLAUDE.md` and `AGENT-HANDOFF.md` before editing.
3. Start comparison from commit `74018e8`, not from an assumed clean local tree.
4. Keep the diff surgical. Do not import the full Phase 8 prototype.
5. Do not update `.github/production-baseline.sha256` merely to make CI green. Updating it means the owner explicitly accepted a new golden baseline.
6. Before deploy, show the owner local screenshots and receive approval.
7. Run desktop 1440x900, mobile 390x844 and reduced-motion browser QA; verify console, CSP, overflow and script-loading gates.
8. Stage only named files. Never use `git add .` in this repository.
9. Deploy as a new atomic release and preserve the previous release for rollback.

If a requested change conflicts with this baseline or its scope is unclear: **stop and ask; do not improvise.**
