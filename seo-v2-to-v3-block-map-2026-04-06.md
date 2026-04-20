# V2 -> V3 Migration Map

## Цель

Собрать многостраничную SEO-систему на базе уже сильного визуального языка `V2`, а не развивать `V3` как отдельный, более слабый по подаче продукт.

Источник визуальной истины:
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/dale-portfolio-v2.html`

Текущая целевая кодовая база:
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/`

## Главный принцип

Переносить нужно не весь `V2` целиком, а его систему:
- визуальный язык;
- атмосферу и ритм;
- типографику и плотность;
- treatment карточек и CTA;
- логику premium-подачи.

Не нужно переносить буквально:
- весь single-page порядок секций;
- все декоративные JS-эффекты на каждую страницу;
- тяжёлые hero-эффекты на статьи и service pages;
- весь копирайтинг `V2` без адаптации к multipage SEO.

## Карта переноса по слоям

| V2-источник | V3-цель | Что переносить буквально | Что адаптировать |
|---|---|---|---|
| `:root`, фон, шум, токены в `dale-portfolio-v2.html` | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/global.css` | Цвета, glow, border logic, typography stack, base atmosphere | Упростить то, что мешает читабельности внутренних страниц |
| `<head>` meta, OG, favicon, font preload, theme-color | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/partials/head.njk`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_data/schema.js` | Базовый SEO-слой, canonical discipline, OG image logic, русскоязычную metadata-модель | Развести schema по типам страниц глубже, чем в `V2` |
| Fixed nav из `V2` | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/partials/nav.njk`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/global.css`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/js/global.js` | Blur-on-scroll, плотность, лого, hover-behaviour, mobile toggle feel | Навигацию строить под multipage, а не под one-page anchors |
| Mobile menu из `V2` | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/partials/mobile-menu.njk`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/global.css`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/js/global.js` | Fullscreen/overlay feel, visual language, body lock | Не тащить сложные inline-handlers; оставить чище и проще |
| Footer из `V2` | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/partials/footer.njk`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/global.css` | Ритм, плотность, mini-nav, social area, tone | Перестроить под реальные multipage links и реальные `sameAs` |
| Buttons, cards, pills, input treatment из `V2` | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/components.css` | Primary / secondary button feel, card elevation, input look, proof-card treatment | Сделать систему reusable для home / service / case / article |
| Hero главной из `V2` | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/pages/index.njk`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/page-home.css`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/js/home.js` | Масштаб заголовка, драматургия first screen, premium atmosphere, CTA hierarchy | Copy уже менять под multipage и pain-first логику |
| Правый proof-area hero из `V2` | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/pages/index.njk`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/partials/proof-strip.njk`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/components.css`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/page-home.css` | Метрики, sense of authority, gold-accent composition | На home делать богаче, чем на внутренних страницах |
| Work/project cards из `V2` | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/pages/index.njk`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/components.css`, позже `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/layouts/case-page.njk` | Card framing, hover depth, image-first logic, case prestige | На home это тизеры, а не полноразмерные лендинговые карточки |
| Services block из `V2` | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/pages/index.njk`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/page-home.css` | Bento-like service structure, section pacing, premium contrast | Развернуть под реальные service pages, а не оставить summary block |
| Process block из `V2` | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/pages/index.njk`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/page-home.css` | Numbered steps, visual rhythm, card differentiation | Формулировки должны быть process-led, без generic agency-copy |
| Testimonials / social proof логика из `V2` | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/pages/index.njk`, потенциально новый partial в `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/partials/` | Доверительный слой между services и contact | Делать только после появления реальных отзывов или кейс-цитат |
| About section из `V2` | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/pages/index.njk`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/page-home.css` | Trust block logic, portrait area, concise bio | Убрать single-page “резюме” и усилить business relevance |
| FAQ / Contact финальный блок из `V2` | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/pages/index.njk`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/partials/faq.njk`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/components.css`, `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/page-home.css` | Accordion feel, final CTA pressure, dark luxury treatment | Вопросы и формы должны быть уже multipage / SEO-aware |

## Карта по внутренним шаблонам

### 1. Service pages

Целевые файлы:
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/layouts/service-page.njk`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/page-service.css`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/components.css`

Что брать из `V2`:
- hero-density;
- weight у заголовков;
- treatment CTA;
- premium-card язык для proof / FAQ / related blocks.

Что не копировать:
- слишком тяжёлую hero-анимацию;
- single-page вертикальный rhythm;
- декоративные элементы, которые мешают длинному чтению.

### 2. Case pages

Целевые файлы:
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/layouts/case-page.njk`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/page-case.css`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/components.css`

Что брать из `V2`:
- project-card prestige;
- тёмный premium mood;
- крупные метрики;
- ощущение “дорогого digital-product work”.

Что адаптировать:
- case pages должны быть image-first и proof-first;
- структура должна быть ближе к case study, а не к обычной странице услуги.

### 3. Article pages

Целевые файлы:
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/layouts/article-page.njk`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/page-article.css`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/global.css`

Что брать из `V2`:
- typography;
- palette;
- section-title language;
- аккуратный footer / nav continuity.

Что адаптировать:
- статьи должны быть заметно чище и спокойнее;
- декоративность должна уступать читаемости и editorial rhythm.

## Карта по JS и поведению

| V2 behaviour | V3 target | Переносить? | Комментарий |
|---|---|---|---|
| nav blur on scroll | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/js/global.js` | Да | Уже есть, можно усилить под `V2` feel |
| mobile menu toggle | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/js/global.js` | Да | Держать простым и стабильным |
| form validation / staged feedback | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/js/global.js` | Да, но аккуратно | Сейчас это demo-state; потом подключить реальный endpoint |
| home hero light parallax | `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/js/home.js` | Да | Только для home, без перегруза |
| dot-grid canvas | Новый home-only script, если нужен | Частично | Переносить только если не ломает performance и не спорит с SEO-home |
| custom cursor | Отдельный optional script | Скорее нет на первом этапе | Для multipage SEO-сайта это nice-to-have, не base requirement |
| magnetic buttons | Optional home-only enhancement | Скорее нет на первом этапе | Не критично для релиза |
| heavy card tilt / glass FX | Optional, локально | Частично | Можно вернуть на home и case cards, не на article pages |

## Что нужно перенести в первую очередь

### Волна 1
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/global.css`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/components.css`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/partials/nav.njk`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/partials/footer.njk`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/js/global.js`

Задача волны:
- добиться, чтобы весь `site/` сразу стал ощущаться как часть `V2`, даже без полной переработки контента.

### Волна 2
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/pages/index.njk`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/page-home.css`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/js/home.js`

Задача волны:
- сделать home page естественной multipage-версией `V2`, а не отдельным сайтом.

### Волна 3
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/layouts/service-page.njk`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/page-service.css`

Задача волны:
- сделать service pages premium и читаемыми одновременно.

### Волна 4
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/layouts/case-page.njk`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/page-case.css`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/_includes/layouts/article-page.njk`
- `/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site/src/assets/css/page-article.css`

Задача волны:
- довести внутренние страницы до той же visual family без потери их функциональной роли.

## Итог

Лучший путь сейчас:
- не откатываться к `V2 only`;
- не развивать `V3` в отдельной стилистике;
- а переносить `V2` как visual system на multipage-архитектуру `site/`.

Это сложнее технически, но даёт лучший результат и по бренду, и по SEO, и по ощущению цельного продукта.
