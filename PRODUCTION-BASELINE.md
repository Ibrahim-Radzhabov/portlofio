# Production Golden Baseline — radzhabov-dev.ru

> **OWNER-APPROVED STATE. DO NOT REDESIGN OR "IMPROVE" WITHOUT AN EXPLICIT NEW OWNER REQUEST.**
>
> Fixed on: **2026-07-15**
> Git release commit: **`308518ecfe89418f09654f86521f2485a8c45970`** (`Release homepage interaction corrections`)
> RU-edge release: **`20260715Tbefore-after-308518e`**
> Public URL: **`https://radzhabov-dev.ru/`**

This document defines the owner-approved visual, content and behavioral baseline of the homepage. On 2026-07-15 the owner explicitly approved the Sticky Journey v4 and corrected «До / после» interaction for production. This baseline replaces the homepage baseline at commit `07ef325`; both `07ef325` and the earlier Phase 8 commit `74018e8` remain available as rollback points.

## Critical distinction: production is not the dirty worktree

The local worktree contains unrelated uncommitted layers. **Do not treat the current files on disk as an exact copy of production and do not stage them wholesale.** The byte-exact source of this baseline is release commit `308518ecfe89418f09654f86521f2485a8c45970`.

Use these commands when exact comparison is required:

```bash
git show 308518e:index.html
git diff 308518e -- index.html assets/css/home.css assets/js/home.js assets/js/hero3d.js assets/js/home-motion.js
bash .github/verify-production-baseline.sh --commit
bash .github/verify-production-baseline.sh --production
bash .github/verify-production-baseline.sh --release-commit
```

The deployed whitelist artifact contains **144 files**, including **38 HTML files**; `sitemap.xml` contains **37 URLs**. Its byte-exact inventory is `.github/production-release-308518e.sha256`.

## What is approved on the homepage

### 1. Visual system and composition

- Light editorial/premium theme: cream background, ink text, dark green primary actions, terracotta `#B5623C` as the only warm accent.
- Playfair Display / Outfit / JetBrains Mono typography and the current spacing, sizing, card treatment and responsive behavior.
- Current header, hero, scenario switcher, request path, works, services, journey, bundle simulator, about, FAQ, contact form, footer and sticky contact.
- The current composition is the approved page. `_proto/` remains an idea/archive area and must not be deployed or copied wholesale.

### 2. Hero and three task scenarios

- The three switches are approved: «Сайт или магазин», «AI-ассистент», «Сайт + AI + 1С».
- Each switch updates the H1 copy, description, three process steps, CTA payload and fracture labels as one coherent state.
- A rapid sequence of switch clicks must never leave the selected button and delayed copy out of sync.
- Desktop keeps the interactive fracture; mobile hides the heavy visual and shows a compact readable hero.

### 3. «Излом» and motion layer

- Two black outer nodes converge into one terracotta central node through two thin black segments.
- Exactly eight small terracotta particles move along the two segments on enhanced desktop.
- Three.js is the enhanced layer; lightweight WebGL and static SVG remain valid fallbacks.
- Static and enhanced geometry must remain visually consistent; no duplicated particles or render layers.
- The motion layer stays gated to capable desktop devices and must never become a mobile requirement.

### 4. Navigation and «Работы»

- Desktop starts with the normal navigation and changes after scroll to the five-node route: «Начало → Работы → Услуги → Связка → Контакты» with scroll progress and one active node.
- Mobile/tablet use the regular menu and must not show the desktop route.
- Work filters «Все работы / Сайты / AI / Telegram / 1С» keep at least one relevant result and the contextual recommendation.
- The nonlinear works discovery is approved, including the eight project frames and the dedicated 430×932 mobile assets.
- Reduced-motion users receive the readable project index instead of the nonlinear scroll scene.
- Project detail sheet and Telegram mini-demo remain usable with keyboard and touch.
- The «До / после» control keeps the DOM order «До связки → После связки → range», exposes one labelled ARIA group, supports pointer, touch and keyboard, and records `before_after_drag` once per page view.

### 5. Request route and bundle simulator

- The visible request route explains the sequence from first contact through AI clarification to accounting.
- The bundle simulator supports three situations and every non-empty combination of «Форма или сайт / Telegram or WhatsApp / 1С или таблица».
- It must never allow an empty selection; route, explanation and contact CTA payload must stay synchronized.
- Claims and examples must follow the project honesty rules, especially the limited authorship of the Dag Sport case.

### 6. Form and measurement

- Formspree endpoint `mkolvvep`, consent gate, honeypot `_gotcha`, status/toast feedback and hidden source/scenario payload remain intact.
- Yandex Metrika ID `110282088` and the existing conversion/product goals remain intact.
- Telegram is `t.me/rdvigm`, email is `1cworkac@mail.ru`, and the canonical domain is `radzhabov-dev.ru`.

## Protected implementation

The canonical protected-file manifest is `.github/production-baseline.sha256`. It covers:

- `index.html`
- `assets/css/home.css`
- `assets/js/home.js`
- `assets/js/hero3d.js`
- `assets/js/home-motion.js`

The complete whitelist release is recorded in `.github/production-release-308518e.sha256` (144 files). Historical manifests remain recovery snapshots and are not the active baseline.

## Runtime invariants

- Motion gate: desktop only, `min-width: 969px`, `pointer: fine`, and `prefers-reduced-motion: no-preference`.
- Mobile, tablet/coarse-pointer and reduced-motion modes must not request GSAP or `home-motion.js`.
- No horizontal overflow at 390×844, 768×1024 or 1440×900.
- No console errors, uncaught page errors, local 4xx/5xx responses or CSP violations.
- Meta-CSP must allow the tested Yandex Metrika endpoints, including `mc.yandex.com` and `wss://mc.yandex.com`.
- Formspree, consent, honeypot and Metrika goals must remain intact.
- Cache query versions must change whenever protected CSS or JavaScript bytes change.
- One H1, valid JSON-LD, valid internal links/assets and sitemap consistency remain mandatory.

## Acceptance evidence

The release passed 71/71 automated browser checks plus a separate final tablet visual check on 2026-07-14:

- desktop 1440×900, including all hero scenarios, route navigation, filters, 21 simulator states, modal, demo, slider and mocked form;
- mobile 390×844, including menu, all eight mobile work frames and motion-network gate;
- tablet 768×1024 after the entrance animation;
- desktop reduced motion;
- mobile without JavaScript.

The 2026-07-15 correction pass additionally covered Chromium at 320, 390, 768, 1024 and 1440 px; range values 0/1/25/50/75/99/100; keyboard navigation; pointer and real touch dragging; vertical page scrolling over the comparison; all work filters; reduced motion; no-JS; and motion-pipeline node stability. WebKit was not available in the local Playwright runtime, so this release does not claim a separate WebKit automation pass.

The original homepage acceptance evidence remains under `output/playwright/homepage-release-20260714/`. Correction-pass screenshots are stored under `output/playwright/before-after-correction-review-20260715/`. They are QA evidence and are intentionally excluded from the deploy artifact.

## Mandatory protocol for any future change

1. Obtain an explicit owner request naming the homepage element to change. A generic request such as «улучши дизайн» is not permission to replace the page composition.
2. Read this file, `AGENTS.md`, `CLAUDE.md` and `AGENT-HANDOFF.md` before editing.
3. Start byte-exact comparison from commit `308518e`, not from an assumed clean local tree.
4. Keep the diff surgical; preserve unrelated dirty worktree layers.
5. Do not update `.github/production-baseline.sha256` merely to make CI green. Updating it means the owner explicitly accepted a new golden baseline.
6. Before deploy, show the owner local evidence and obtain an explicit release instruction.
7. Run desktop, mobile, tablet and reduced-motion browser QA; verify console, CSP, overflow and script-loading gates.
8. Stage only named files. Never use `git add .` in this repository.
9. Deploy from an exact commit as a new atomic release and preserve the previous release for rollback.

If a requested change conflicts with this baseline or its scope is unclear: **stop and ask; do not improvise.**
