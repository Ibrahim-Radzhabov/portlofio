# SEO: Page Inventory Map для перехода в V3

Дата: 2026-04-05

## 1. Что это за документ

Этот документ раскладывает текущий [dale-portfolio-v2.html](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html) на части и отвечает на 4 вопроса по каждому блоку:

1. Где он находится сейчас.
2. Нужен ли он в V3 вообще.
3. Должен ли он стать shared layout, homepage-only блоком или шаблоном для внутренних страниц.
4. Как именно его переносить.

Это не архитектура “в целом”, а инвентаризация текущей production-страницы перед миграцией.

## 2. Основной вывод

Текущий файл уже содержит почти всё, что нужно для визуальной системы V3, но в одном монолите.

Правильная стратегия переноса:

- `head`, `nav`, `mobile menu`, `footer`, общие кнопки, формы и базовую типографику выносить в shared layout
- heavy-motion homepage-элементы оставлять только на главной
- `work`, `services`, `process`, `testimonials`, `about`, `faq`, `contact` не копировать внутрь service/article pages как есть
- вместо этого из них нужно извлечь reusable patterns:
  - proof
  - FAQ
  - CTA
  - grid cards
  - content sections

## 3. Карта по блокам страницы

### 3.1. `<head>` и SEO-слой

Текущее расположение:

- [dale-portfolio-v2.html:1](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L1)
- [dale-portfolio-v2.html:33](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L33)

Что внутри:

- `title`
- `meta description`
- `og:*`
- `twitter:*`
- `canonical`
- favicon block
- font preload
- JSON-LD `@graph`

Статус в V3:

- `shared layout`, но с page-level данными

Что переносить:

- общую структуру head
- favicon links
- font preload / preconnect
- theme-color
- базовые social meta patterns

Что не переносить как fixed content:

- конкретные `title`
- конкретные `description`
- конкретные `og:title`
- homepage-only schema

Куда в V3:

- `partials/head.njk`
- page frontmatter / data files

Примечание:

- `Person` и `WebSite` должны стать shared entity layer
- homepage-specific `ProfilePage` и `FAQPage` не должны автоматически размножаться на все страницы

### 3.2. Global CSS

Текущее расположение:

- [dale-portfolio-v2.html:227](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L227)

Статус в V3:

- `разделить`

Что идёт в `global.css`:

- CSS variables
- reset / base
- typography
- container
- buttons
- form base styles
- nav / footer base
- accessibility helpers

Что идёт в `components.css`:

- cards
- section headers
- badges
- proof blocks
- faq items
- testimonial cards
- reusable grids

Что остаётся homepage-only:

- hero mesh
- dot-grid canvas styling
- marquee
- preloader
- homepage-specific motion

### 3.3. Reduced motion / noscript / accessibility helpers

Текущее расположение:

- [dale-portfolio-v2.html:1880](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L1880)
- [dale-portfolio-v2.html:1916](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L1916)

Статус в V3:

- `shared layout`

Что переносить:

- `prefers-reduced-motion` policy
- `skip-nav`
- `form-status` live region
- `noscript` fallback logic

Что проверить:

- чтобы внутренние страницы не зависели от homepage-only классов типа `.hero .hero-anim`

### 3.4. Skip-nav

Текущее расположение:

- [dale-portfolio-v2.html:1906](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L1906)

Статус в V3:

- `shared layout`

Как переносить:

- оставить в `base`
- на внутренних страницах `href` должен вести на реальный `main`

### 3.5. Form live region

Текущее расположение:

- [dale-portfolio-v2.html:1926](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L1926)

Статус в V3:

- `shared layout`, если форма остаётся глобальным паттерном

### 3.6. Scroll-to-top button

Текущее расположение:

- [dale-portfolio-v2.html:1929](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L1929)

Статус в V3:

- `optional shared component`

Рекомендация:

- можно оставить глобально
- но визуально ослабить на article pages, если мешает чтению

### 3.7. Preloader

Текущее расположение:

- [dale-portfolio-v2.html:1935](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L1935)

Статус в V3:

- `homepage-only` или `drop`

Рекомендация:

- не переносить на service / article / case pages
- для SEO-страниц он не даёт ценности и может только мешать perceived speed

### 3.8. Dot-grid canvas + custom cursor glow

Текущее расположение:

- [dale-portfolio-v2.html:1939](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L1939)
- JS начинается у canvas logic в script блоке после [dale-portfolio-v2.html:2469](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L2469)

Статус в V3:

- `homepage-only`

Рекомендация:

- не тащить на внутренние страницы
- если нужен визуальный фон на service pages, использовать более лёгкий static treatment

### 3.9. Main nav

Текущее расположение:

- [dale-portfolio-v2.html:1944](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L1944)

Статус в V3:

- `shared layout`

Что менять при переносе:

- ссылки `#work`, `#services`, `#process` и т.д. больше не могут быть единственной навигацией
- нужно перевести nav на mixed model:
  - `/`
  - `/uslugi/...`
  - `/cases/...`
  - `/blog/...`
  - `/#contact` или `/contact/`, если отдельная страница появится

Что сохранить:

- logo treatment
- desktop / mobile nav pattern
- scrolled state

Что исправить:

- лого сейчас ведёт на `#`, это нужно убрать при переходе

### 3.10. Mobile menu

Текущее расположение:

- [dale-portfolio-v2.html:1964](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L1964)

Статус в V3:

- `shared layout`

Что менять:

- те же вопросы, что и для основного nav
- часть anchor-ссылок останется только на главной
- на внутренних страницах mobile menu должен ссылаться на реальные URL, а не только на home anchors

### 3.11. Hero

Текущее расположение:

- [dale-portfolio-v2.html:1975](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L1975)

Статус в V3:

- `homepage-only hero`

Что сохранить:

- общую композицию
- proof-card idea
- premium tone
- pain-first headline approach

Что не переносить как есть:

- exact hero structure на service/article pages

Что извлечь в reusable patterns:

- `hero-tag`
- `hero-note`
- `hero-proof`
- CTA row

Внутренним страницам нужен другой hero:

- меньше воздуха
- меньше декоративной графики
- больше semantic clarity

### 3.12. Marquee

Текущее расположение:

- [dale-portfolio-v2.html:2030](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L2030)

Статус в V3:

- `homepage-only`

Рекомендация:

- не использовать на service/article pages

### 3.13. Work section

Текущее расположение:

- [dale-portfolio-v2.html:2052](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L2052)

Статус в V3:

- `разделить на два слоя`

Что извлечь:

- grid layout для case cards
- карточку кейса как reusable component

Что не переносить как секцию на все страницы:

- сам раздел `Избранные работы`

Как использовать в V3:

- на главной оставить curated work teaser
- на service pages показывать 1–2 релевантных кейса
- на case pages использовать отдельный layout, а не карточку

Что нужно исправить:

- сейчас карточки ведут на `href="#"`, для V3 это должно стать реальными case URLs
- SVG placeholders нужно заменить на реальные assets или screenshots

### 3.14. Services section

Текущее расположение:

- [dale-portfolio-v2.html:2162](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L2162)

Статус в V3:

- `homepage-only overview` + `service card component`

Что извлечь:

- service card pattern
- short value proposition blocks

Что менять:

- на главной это должен быть обзор с ссылками на реальные service pages
- сами service pages не должны повторять этот блок буквально

### 3.15. Process section

Текущее расположение:

- [dale-portfolio-v2.html:2204](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L2204)

Статус в V3:

- `shared component`, но в адаптированной форме

Как использовать:

- на главной можно оставить полный процесс
- на service pages можно использовать сокращённую 3–5 step version

Не нужно:

- копировать текущий блок 1:1 на каждую внутреннюю страницу

### 3.16. Testimonials section

Текущее расположение:

- [dale-portfolio-v2.html:2237](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L2237)

Статус в V3:

- `shared testimonial card pattern`

Что извлечь:

- карточку отзыва
- author metadata pattern

Как использовать:

- на главной — полноценный блок
- на service pages — 1–2 релевантных отзыва или proof strip

### 3.17. About section

Текущее расположение:

- [dale-portfolio-v2.html:2279](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L2279)

Статус в V3:

- `homepage-only summary`

Что извлечь:

- small bio / authority snippet
- tech stack pills only если уместно

Что не делать:

- не вставлять полный About блок в article pages

Отдельное замечание:

- placeholder photo нужно будет заменить до того, как блок станет серьёзной частью общей системы доверия

### 3.18. FAQ section

Текущее расположение:

- [dale-portfolio-v2.html:2315](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L2315)

Статус в V3:

- `shared FAQ component`, но с page-specific content

Что извлечь:

- accordion UI
- summary/icon pattern
- FAQ schema renderer

Что менять:

- homepage FAQ оставить общим
- service pages должны иметь собственный FAQ
- article pages FAQ использовать только если это действительно помогает интенту

### 3.19. Contact section

Текущее расположение:

- [dale-portfolio-v2.html:2382](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L2382)

Статус в V3:

- `shared CTA / contact component`

Что извлечь:

- contact grid pattern
- form component
- contact info block

Как использовать:

- на главной можно оставить полную форму
- на service pages — либо полная форма, либо сокращённый CTA block с кнопкой
- на article pages лучше использовать компактный CTA, а не полноценную тяжёлую форму в каждом материале

### 3.20. Footer

Текущее расположение:

- [dale-portfolio-v2.html:2436](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L2436)

Статус в V3:

- `shared layout`

Что менять:

- footer nav должен стать URL-based, а не home-anchor-only
- social links нужно заполнить реальными URL
- `FAQ` в footer на multipage-сайте может вести либо на homepage section, либо на отдельную FAQ-страницу, если она появится

## 4. Карта JavaScript по судьбе в V3

### Оставить глобально

Из script блока после [dale-portfolio-v2.html:2469](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html#L2469):

- nav scroll
- mobile menu toggle
- smooth anchor behavior, если нужен
- form validation / states
- active nav logic, если адаптировать под multipage
- scroll-to-top button

### Оставить только на главной

- preloader hide logic
- hero parallax
- dot-grid canvas
- custom cursor glow / follower
- magnetic interactions homepage-wide
- heavy glassmorphism hover logic, если оно завязано на homepage cards

### Перенести выборочно

- reveal animations
- section title decode animation

Рекомендация:

- на service/article pages использовать более лёгкий reveal
- decode animation на внутренних страницах не нужен по умолчанию

## 5. Карта контента по судьбе в V3

### Остаётся на главной

- hero
- marquee
- overview blocks: work / services / process / testimonials / about
- общий FAQ
- full contact section

### Уходит в service pages в новой форме

- proof logic из hero
- process logic
- CTA logic
- FAQ pattern
- релевантные кейсы вместо общего work block

### Уходит в article pages в новой форме

- section heading pattern
- CTA block
- FAQ pattern, если нужно
- compact proof / author trust snippet

### Уходит в case pages в новой форме

- project card content becomes full case narrative
- proof / result framing
- related service CTA

## 6. Что переносить в первую очередь

### Первая очередь

- head architecture
- nav
- mobile menu
- footer
- global typography / colors / buttons
- contact form behavior

### Вторая очередь

- homepage hero
- work card component
- FAQ component
- proof strip
- CTA block

### Третья очередь

- process adaptation
- testimonial adaptation
- secondary motion

### Последняя очередь

- homepage-only effects
- decorative canvas / cursor systems
- preloader

## 7. Минимальный комплект V3 для первого запуска

Чтобы не раздувать миграцию, на первый рабочий запуск достаточно:

- shared `base`
- shared `head`
- shared `nav`
- shared `footer`
- shared `contact CTA`
- shared `FAQ component`
- homepage
- `audit` service page
- `pochemu-sait-ne-konvertiruet` article
- `kova` case page

Если этот минимальный комплект собран качественно, архитектура уже доказана.

## 8. Самые важные риски при переносе

### Риск 1

Перенести весь текущий дизайн как монолит и не разделить его на:

- global
- components
- homepage-only

### Риск 2

Оставить навигацию и footer в anchor-логике после появления реальных URL.

### Риск 3

Размножить homepage SEO/schema на внутренние страницы без разделения по типам.

### Риск 4

Сделать внутренние страницы визуально слишком тяжёлыми из-за копирования homepage effects.

## 9. Практический вывод

Если упростить inventory map до одного рабочего решения:

- `nav`, `mobile menu`, `footer`, `head`, `form`, `faq UI`, `proof UI`, `buttons`, `grids` становятся shared
- `hero`, `marquee`, `dot-grid`, `preloader`, heavy motion остаются homepage-only
- `work`, `services`, `process`, `testimonials`, `about`, `contact` превращаются из секций в набор reusable patterns и content sources

## 10. Что делать следующим шагом

После этого документа наиболее полезен уже не новый анализ, а:

1. `implementation brief` для V3-каркаса
2. либо реальная сборка V3-каркаса в отдельной папке `site/`
