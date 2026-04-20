# CLAUDE.md — Project Instructions for AI Agents

## Project
Dale McManus Portfolio Redesign (Production V2) — premium, high-conversion single-file HTML portfolio.
Target audience: startup founders, CEOs, product managers (high-ticket clients).
Language: Russian (all UI text, meta tags, OG data, JSON-LD).
Domain: `dalemcmanus.dev`

## Architecture

**Single-file only:** everything lives in `dale-portfolio-v2.html` (~2200 lines) — HTML, CSS (`<style>` lines 20–1385), JS (`<script>` lines 1845–2205).

### Hard constraints
- NO separate CSS or JS files.
- NO external libraries or frameworks (no React, Vue, GSAP, jQuery, Tailwind, etc.).
- NO Python generators (previously used `gen_*.py` scripts were deleted).
- NO CDN links or external dependencies.
- ALL edits must be direct replacements inside `dale-portfolio-v2.html`.
- The ONLY external resource is Google Fonts (Syne, Outfit, JetBrains Mono) via `<link>`.

### Other files in the directory
- `dale-portfolio-redesign.html` — old prototype, do NOT edit.
- `premium-ui.css`, `premium-ui.js` — legacy files, not used, do NOT reference.
- `claude-code-final-prompt.md` — reference prompt, not code.

## Design System

### CSS Variables (`:root`, line 23)
| Variable | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0a0a0b` | Page background |
| `--bg-secondary` | `#111113` | Input/alt backgrounds |
| `--bg-card` | `#161618` | Cards |
| `--bg-card-hover` | `#1c1c1f` | Card hover |
| `--border` | `#222225` | Default borders |
| `--border-hover` | `#333338` | Hover borders |
| `--text-primary` | `#ededef` | Headings, body text |
| `--text-secondary` | `#8a8a8e` | Descriptions, muted |
| `--text-tertiary` | `#5a5a5e` | Labels, captions |
| `--accent` | `#e8c572` | Gold accent |
| `--accent-dim` | `#c9a84e` | Darker gold |
| `--accent-glow` | `rgba(232,197,114,0.12)` | Glow backgrounds |
| `--accent-glow-strong` | `rgba(232,197,114,0.25)` | Strong glow |

### Typography
- Display (headings): `'Syne'` — `var(--font-display)`
- Body: `'Outfit'` — `var(--font-body)`
- Mono (tags, labels, code): `'JetBrains Mono'` — `var(--font-mono)`

### Easing
- `--ease-out-expo`: `cubic-bezier(0.16, 1, 0.3, 1)` — used for most transitions
- `--ease-out-quart`: `cubic-bezier(0.25, 1, 0.5, 1)`

### Theme
- Dark only. No light mode. No theme toggle.
- Noise overlay via `body::before` (SVG feTurbulence, `z-index: 9999`, `opacity: 0.025`).
- Custom cursor — `body { cursor: none; }` on desktop.

## Sections (in DOM order)

| # | Section | id/class | Lines (approx) | Notes |
|---|---|---|---|---|
| 0 | Preloader | `#preloader` | 1388–1392 | Animated gold progress bar, fades after 1.5s |
| 1 | Nav | `#nav` | 1398–1415 | `position: fixed`, blur on scroll, `.scrolled` class |
| 2 | Mobile Menu | `#mobile-menu` | 1418–1425 | Fullscreen overlay, `toggleMenu()` global fn |
| 3 | Hero | `<header class="hero">` | 1428–1474 | Mesh blobs + dot grid canvas + staggered animations + scroll indicator |
| 4 | Marquee | `.marquee-section` | 1477–1492 | Skewed infinite scroll, `-2deg` transform |
| 5 | Work | `#work` | 1494–1602 | 3 project cards with SVG placeholders, glassmorphism overlays, 3D tilt |
| 6 | Services | `#services` | 1604–1643 | 3-column bento grid |
| 7 | Process | `#process` | 1646–1677 | 4-column grid with numbered steps |
| 8 | Testimonials | `#testimonials` | 1679–1719 | 3-column grid, quote cards |
| 9 | About | `#about` | 1721–1756 | 2-col grid: photo placeholder + bio + tech stack pills |
| 10 | Contact | `#contact` | 1758–1810 | 2-col grid: info + form with validation |
| 11 | Footer | `<footer>` | 1812–1843 | `.footer-inner` flex container, mini-nav, social links |

## JavaScript Features (lines 1845–2205)

All JS runs inside a single IIFE — `(function() { 'use strict'; ... })()`.

| Feature | Lines | Details |
|---|---|---|
| Debounce utility | 1850–1856 | Used by scroll handlers |
| Preloader | 1858–1864 | Hides after `load` event + 1.5s delay |
| Text decode animation | 1866–1891 | Matrix-style scramble on `.section-title` via IntersectionObserver |
| Nav scroll | 1893–1898 | Adds `.scrolled` class when `scrollY > 50` |
| Mobile menu | 1901–1909 | `toggleMenu()` toggles `.active`, locks body scroll |
| Scroll indicator | 1911–1918 | Hides hero scroll line after 100px scroll |
| Scroll reveal | 1920–1931 | IntersectionObserver adds `.visible` to `.reveal` elements |
| Smooth anchor scroll | 1933–1944 | `scrollIntoView` on `a[href^="#"]` |
| Hero parallax | 1946–1956 | Translates `.hero-mesh` at 0.3x scroll speed |
| Ripple effect | 1960–1974 | Click creates expanding circle on buttons |
| **Dot grid** | 1976–2066 | Fullscreen Canvas, gold proximity glow, touch support, scroll parallax offset |
| Cursor glow + follower | 2068–2150 | Radial gradient glow (600px) + 12px gold dot with `mix-blend-mode: difference` |
| Glassmorphism cards | 2082–2102 | `--mouse-x/--mouse-y` + 3D tilt on `.project-card`, `.bento-card` |
| Magnetic elements | 2104–2116 | `.btn-primary`, `.btn-secondary`, `.nav-links a` follow cursor at 0.3x |
| Cursor `.active` state | 2118–2123 | Expands follower to 64px on interactive elements |
| Form validation | 2152–2202 | Name, email (regex), message required. 3-stage button: default → loading (animated dots) → success |

## CSS Animations & Keyframes

| Name | Purpose |
|---|---|
| `meshFadeIn` | Fades hero blobs in |
| `meshFloat1/2/3` | Slow floating motion for hero blobs |
| `heroStagger` | Staggered fade-up for hero content |
| `rippleAnim` | Button click ripple |
| `scrollLine` | Scroll indicator pulse |
| `marqueeScroll` | Infinite horizontal scroll |
| `loaderDot` | Submit button loading dots bounce |
| `preloaderFill` | Preloader progress bar fill |

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `≤968px` | Nav collapses → hamburger. Cards single-col. Services/Process/About/Contact reflow to 1-col. Testimonials 1-col. |
| `≤640px` | Section padding shrinks. Process/form grids go 1-col. Footer centers vertically. Stats font smaller. |

## Accessibility
- `aria-label` on nav, footer nav, menu button, social links.
- `aria-expanded` on mobile menu button.
- `aria-hidden="true"` on decorative elements (mesh, dot grid, scroll indicator, avatars).
- `focus-visible` outlines on interactive elements.
- `@media (prefers-reduced-motion: reduce)` — disables all animations, shows static states, hides custom cursor.

## SEO
- `<title>`: Russian, includes name + role + experience.
- `<meta name="description">`: Russian, keyword-rich.
- Open Graph: `og:title`, `og:description`, `og:type`, `og:image`, `og:url`.
- Twitter Card: `summary_large_image`.
- JSON-LD: `Person` schema with `name`, `jobTitle`, `url`, `knowsAbout`.

## Development

```bash
# Start local server
python3 -m http.server 8000
# Open: http://localhost:8000/dale-portfolio-v2.html
```

## Known TODOs

### ⚡ Ждут данных от владельца (без них не доделать)
1. **Социальные ссылки** — в HTML (`<footer>`) и в JSON-LD (`sameAs: []`) стоят заглушки `#`. Нужны реальные URL:
   - GitHub: `https://github.com/???`
   - LinkedIn: `https://linkedin.com/in/???`
   - Twitter/X: `https://x.com/???`
   - После получения: заменить `href="#"` в трёх `<a>` тегах footer и заполнить `"sameAs": []` в JSON-LD `<script>` в `<head>`.

2. **Formspree ID для формы** — форма написана и подключена, но письма не уходят. Нужно:
   - Зарегистрироваться на [formspree.io](https://formspree.io)
   - Создать форму с email `hello@dalemcmanus.dev`
   - Получить ID вида `xpwzabcd`
   - Вставить в JS: найти `var FORMSPREE_ID = 'YOUR_FORM_ID'` и заменить.

3. **Фото в секции About** — сейчас показывает `[ Ваше фото ]`. Нужно профессиональное портретное фото.
   - Заменить `.about-image-placeholder` на `<img>` с реальным фото.

4. **Скриншоты проектов** — карточки в Work используют SVG-заглушки. Нужны реальные изображения проектов (Kova Technology, Outdoor Photography Portfolio, SaaS Dashboard).

### ✅ Уже сделано (не трогать)
- `og-image.png` — сгенерирован (1200×630, Pillow)
- `robots.txt` — все AI-краулеры разрешены (GPTBot, OAI-SearchBot, anthropic-ai, ClaudeBot, PerplexityBot и др.)
- `sitemap.xml` — создан
- `llms.txt` — создан для AI-систем
- `favicon.svg` / `favicon-32.png` / `favicon.ico` / `apple-touch-icon.png` — созданы
- JSON-LD расширен до 10 сущностей (`@graph`: ProfilePage, Person, WebSite, 3×CreativeWork, 3×Review, FAQPage)
- FAQ секция — добавлена между About и Contact (6 вопросов, `<details>/<summary>`, FAQPage schema)
- Marquee — переведён на русский
- Кнопка "Наверх" — появляется после 400px скролла
- Активная ссылка в nav — подсвечивается при скролле
- Skip-nav + ARIA live region для формы — доступность
- `noscript` fallback — контент виден без JS
- Font preload, theme-color meta — перформанс

## Common Pitfalls
- The footer layout depends on `.footer-inner` for flexbox — do not remove it.
- Dot grid canvas uses `position: fixed` and `z-index: 0` — all content must have higher z-index.
- Noise overlay is `z-index: 9999` — do not place content above it.
- Custom cursor `cursor: none` is set on `body` and all interactive elements — if adding new interactive elements, add `cursor: none` too.
- The `prefers-reduced-motion` block (line ~1367) must be updated when adding new animations.
- Hero blob colors: blob 1 = gold, blob 2 = deep purple `rgba(147,112,219,0.06)`, blob 3 = emerald `rgba(46,204,113,0.05)`.
- `toggleMenu()` is a global function (assigned to `window`) — needed by inline `onclick` on mobile menu links.

## When Editing
1. Read the relevant section before making changes.
2. Keep ALL code inside `dale-portfolio-v2.html`.
3. Test at mobile (`<640px`), tablet (`<968px`), and desktop widths.
4. Respect the gold + dark theme. Do not introduce new accent colors without asking.
5. Add `prefers-reduced-motion` overrides for any new animations.
6. Add `cursor: none` to any new interactive elements.
7. Add `aria-label` to any new interactive elements without visible text.
8. All user-facing text must be in Russian.
