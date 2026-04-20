# SEO: План многостраничной архитектуры

Дата: 2026-04-05

## 1. Зачем нужен этот документ

Сейчас проект живёт как один production-файл:

- [dale-portfolio-v2.html](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html)

Для брендового лендинга это рабочая модель. Для SEO-системы из услуг, кейсов и статей — уже нет.

Задача этого документа:

- зафиксировать целевую архитектуру под RU-first SEO
- понять, как перейти к нескольким URL без потери текущего визуального качества
- не ломать текущий сайт во время перехода

## 2. Главный принцип перехода

Не пытаться превращать текущий single-file напрямую в 10–15 HTML-файлов вручную.

Это создаст проблемы:

- дублирование head / nav / footer / schema
- высокий риск рассинхронизации meta и structured data
- ручное обновление ссылок, sitemap и OG-слоя
- дорогое сопровождение каждой новой страницы

Правильный путь:

- оставить текущий [dale-portfolio-v2.html](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html) как стабильную production-базу V2
- новую SEO-структуру собирать параллельно как `V3 multipage`
- переключаться на неё только после того, как:
  - главная перенесена без потери качества
  - первая service page и supporting article готовы
  - навигация, schema, sitemap и перелинковка уже работают как система

## 3. Рекомендуемая техническая модель

### Вывод

Для этого проекта я рекомендую:

- `11ty (Eleventy)` как основную архитектуру под V3

### Почему не ручные HTML-файлы

- слишком хрупко при 10+ страницах
- неудобно поддерживать единый head, schema, nav и footer
- sitemap, breadcrumbs и перелинковка быстро становятся ручной рутиной

### Почему не Next.js / большой SPA-стек

- для 10–15 SEO-страниц это избыточно
- слишком много сложности без реального SEO-бонуса
- возрастает цена поддержки и вероятность неочевидных поломок

### Почему именно 11ty

- отдаёт статический HTML
- не навязывает client-side runtime
- легко работает с hand-crafted HTML/CSS/JS
- хорошо подходит для service pages, case pages и статей
- проще Astro в проекте, который изначально построен вокруг чистой вёрстки

Если позже понадобится более компонентная система, можно рассмотреть Astro. Но для первой многостраничной итерации 11ty — более прагматичный выбор.

## 4. Что переносим из текущего сайта, а что нет

### Сохраняем обязательно

- общий визуальный язык
- типографику
- цветовую систему
- премиальный тон
- nav
- footer
- contact flow
- trust / proof blocks
- базовые паттерны кнопок, карточек, секций

### Сохраняем выборочно

- scroll reveal
- мягкие hover / magnetic interactions
- FAQ pattern
- форма и её states

### Оставляем только на главной или убираем совсем

- preloader
- fullscreen dot-grid canvas
- тяжелый hero-specific motion
- агрессивные декоративные эффекты на каждой внутренней странице
- homepage-only parallax

Причина:

- на внутренних SEO-страницах важнее скорость, читаемость и стабильность
- не нужно переносить весь visual machinery главной на статьи и service pages

## 5. Целевая структура сайта

На первом этапе разумная структура выглядит так:

- `/`
- `/uslugi/audit-i-redizain-saita-na-konversiyu/`
- `/blog/pochemu-sait-ne-konvertiruet/`
- `/cases/kova-technology-ecommerce/`
- `/uslugi/razrabotka-b2b-saitov-i-veb-interfeisov/`
- `/blog/chto-dolzhno-byt-na-b2b-sajte/`
- `/cases/[b2b-case-slug]/`

На втором этапе:

- `/blog/skolko-stoit-razrabotka-saita-dlya-saas-i-b2b/`
- `/uslugi/razrabotka-saitov-dlya-saas/` только после дополнительного research
- дополнительные case pages

## 6. Рекомендуемая файловая структура V3

Это не команда к немедленной реализации, а целевая схема.

```text
/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project
  /site
    /.eleventy.js
    /src
      /_data
        site.js
        navigation.js
      /_includes
        /layouts
          base.njk
          service-page.njk
          article-page.njk
          case-page.njk
        /partials
          head.njk
          nav.njk
          footer.njk
          contact-cta.njk
          proof-strip.njk
          faq.njk
      /assets
        /css
          global.css
          components.css
          page-home.css
          page-service.css
          page-article.css
        /js
          global.js
          home.js
      /pages
        index.njk
      /uslugi
        audit-i-redizain-saita-na-konversiyu.md
        razrabotka-b2b-saitov-i-veb-interfeisov.md
      /blog
        pochemu-sait-ne-konvertiruet.md
        chto-dolzhno-byt-na-b2b-sajte.md
      /cases
        kova-technology-ecommerce.md
        b2b-case-slug.md
    /public
      og-image.png
      favicon.svg
      favicon.ico
      apple-touch-icon.png
      robots.txt
      llms.txt
```

## 7. Контентная модель

Чтобы не дублировать руками meta и schema, каждой странице нужен единый набор полей.

### Для service page

- `title`
- `metaTitle`
- `metaDescription`
- `h1`
- `slug`
- `summary`
- `ogImage`
- `schemaType`
- `faq`
- `relatedCases`
- `relatedArticles`
- `ctaType`

### Для article

- `title`
- `metaTitle`
- `metaDescription`
- `h1`
- `slug`
- `excerpt`
- `datePublished`
- `dateModified`
- `ogImage`
- `faq`
- `relatedService`
- `relatedCase`

### Для case page

- `title`
- `metaTitle`
- `metaDescription`
- `h1`
- `slug`
- `clientName`
- `industry`
- `summary`
- `results`
- `services`
- `datePublished`
- `ogImage`
- `relatedService`

## 8. Обязательные шаблоны

### 1. `base.njk`

Содержит:

- `<html lang="ru">`
- shared head
- canonical
- og / twitter
- font preload / favicon / theme-color
- nav
- footer
- global scripts

### 2. `service-page.njk`

Содержит:

- hero
- body content
- proof block
- FAQ
- internal links to case + article
- CTA block
- Service / WebPage / BreadcrumbList schema

### 3. `article-page.njk`

Содержит:

- article hero
- body
- FAQ при необходимости
- in-article CTA
- final CTA
- Article / BreadcrumbList schema

### 4. `case-page.njk`

Содержит:

- result-oriented hero
- context / problem / solution / result
- screenshots
- related service CTA
- CreativeWork или Article + BreadcrumbList schema

## 9. Что вынести в shared partials

В shared partials должны жить:

- head
- nav
- footer
- social links
- contact CTA
- proof strip
- FAQ renderer
- breadcrumbs

Не нужно делать partial'ом весь hero или весь контент страницы.

У внутренних страниц должны быть свои шаблонные рамки, но содержание должно оставаться гибким.

## 10. Что делать с текущим CSS и JS

### CSS

Текущий inline CSS из [dale-portfolio-v2.html](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html) нужно не копировать вслепую, а разделить:

- `global.css`
  - reset
  - variables
  - typography
  - nav
  - footer
  - buttons
  - form basics
- `components.css`
  - cards
  - proof blocks
  - FAQ
  - badges
  - grids
- `page-home.css`
  - hero-specific visuals
  - homepage-only effects
- `page-service.css`
  - service hero
  - content sections
  - proof / FAQ / CTA
- `page-article.css`
  - article typography
  - list styles
  - quote / note blocks

### JS

Разделить по тому же принципу:

- `global.js`
  - mobile menu
  - nav scroll
  - smooth anchor behavior, если нужно
  - form behavior
- `home.js`
  - homepage-only effects
  - dot-grid
  - heavy hero interactions

Статьи и service pages не должны тащить homepage-specific JS.

## 11. SEO-слой в новой архитектуре

### На каждой странице обязательно

- уникальный `title`
- уникальный `meta description`
- canonical
- `og:title`
- `og:description`
- `og:url`
- `og:image`
- twitter card
- schema
- breadcrumbs

### Schema по типам страниц

- главная: `ProfilePage`, `Person`, `WebSite`
- service page: `Service`, `WebPage`, `BreadcrumbList`
- article: `Article`, `WebPage`, `BreadcrumbList`
- case page: `CreativeWork` или `Article`, `WebPage`, `BreadcrumbList`

Важно:

- `Person` и `WebSite` не надо дублировать руками на каждой странице как новые сущности
- лучше ссылаться на них через один и тот же `@id`

## 12. Внутренняя перелинковка как часть архитектуры

Это должно быть встроено в шаблоны, а не оставлено “на потом”.

### Главная

Ссылается на:

- все service pages
- кейсы
- статьи

### Service page

Ссылается на:

- релевантный case
- релевантную article
- contact CTA

### Article

Ссылается на:

- supporting service
- supporting case
- contact CTA

### Case page

Ссылается на:

- supporting service
- при необходимости на article

## 13. Маршрут миграции

### Этап 0. Не ломать текущий V2

До окончания миграции:

- текущий [dale-portfolio-v2.html](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html) остаётся рабочей версией
- не смешивать “новую архитектуру” с ручным наращиванием HTML-файлов в корне

### Этап 1. Подготовить каркас V3

Сделать:

- шаблон `base`
- shared head / nav / footer
- shared SEO-data layer
- asset pipeline для стилей и скриптов

### Этап 2. Перенести главную

Сделать:

- homepage template
- сохранить визуальный язык
- вынести homepage-only эффекты в отдельный JS/CSS слой

### Этап 3. Собрать первый кластер

Сделать:

- `audit-i-redizain-saita-na-konversiyu`
- `pochemu-sait-ne-konvertiruet`
- `kova-technology-ecommerce`

Задача:

- проверить всю архитектуру на одном рабочем кластере

### Этап 4. Собрать второй кластер

Сделать:

- `razrabotka-b2b-saitov-i-veb-interfeisov`
- `chto-dolzhno-byt-na-b2b-sajte`
- supporting case

### Этап 5. Добавить pricing и следующие кейсы

Сделать:

- pricing article
- дополнительные кейсы
- только потом возвращаться к SaaS cluster

### Этап 6. Переключение production

Переключаться на V3 только после проверки:

- индексируемости
- schema
- sitemap
- redirects
- внутренних ссылок
- mobile sanity check

## 14. Что делать с sitemap, robots и llms

### `sitemap.xml`

Должен генерироваться автоматически из коллекции страниц.

### `robots.txt`

Можно оставить в `public`, но обновить при появлении новых URL и возможных технических зон.

### `llms.txt`

После перехода на multipage его тоже нужно расширить:

- добавить ключевые service pages
- добавить ключевые articles
- добавить cases

## 15. Что делать с главной сейчас

Главную не нужно переписывать первой.

Нужно:

- сохранить её как визуальный эталон
- использовать её как источник design system и shared patterns
- не превращать её в “страницу обо всём” после появления service pages

После запуска внутренних страниц роль главной должна стать ещё яснее:

- бренд
- позиционирование
- доверие
- маршрутизация в ключевые кластеры

## 16. Что будет ошибкой

### Ошибка 1

Пытаться в первой итерации перенести вообще всё:

- все эффекты
- все страницы
- весь контент

Правильнее:

- сначала каркас
- потом один рабочий кластер

### Ошибка 2

Делать многостраничность вручную без шаблонов.

### Ошибка 3

Пытаться сразу поддерживать RU и EN.

Сначала нужно довести до результата `RU-first`.

### Ошибка 4

Дублировать на внутренних страницах главную по тону и структуре.

Service page, article и case должны решать разные задачи.

## 17. Короткая рекомендация

Если формулировать решение в одной фразе:

`Оставьте текущий single-file как стабильную V2-витрину и собирайте V3 как статический многостраничный сайт на 11ty, начиная с audit-кластера.`

Это самый прагматичный путь:

- без потери текущего дизайна
- без ручного ада из 10 HTML-файлов
- с нормальной SEO-архитектурой под услуги, кейсы и статьи

## 18. Что делать следующим шагом

После этого документа логично подготовить одно из двух:

1. `implementation brief` для V3-каркаса
2. `page inventory map`, где будет расписано, какие куски текущего [dale-portfolio-v2.html](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html) идут в shared layout, а какие остаются только у homepage

Связанный документ:

- [seo-page-inventory-map-2026-04-05.md](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/seo-page-inventory-map-2026-04-05.md)
- [seo-v3-implementation-brief-2026-04-05.md](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/seo-v3-implementation-brief-2026-04-05.md)
