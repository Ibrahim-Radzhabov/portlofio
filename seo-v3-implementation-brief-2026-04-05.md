# SEO V3: Implementation Brief

Дата: 2026-04-05

## 1. Что это за документ

Это рабочий implementation brief для перехода от текущего single-file сайта к многостраничной V3-версии.

Он отвечает на вопросы:

- что именно создавать
- в каком порядке это собирать
- что входит в минимальный рабочий релиз
- по каким критериям считать V3 готовой

Этот документ опирается на:

- [seo-multipage-architecture-plan-2026-04-05.md](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/seo-multipage-architecture-plan-2026-04-05.md)
- [seo-page-inventory-map-2026-04-05.md](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/seo-page-inventory-map-2026-04-05.md)
- [seo-project-recommendations-2026-04-05.md](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/seo-project-recommendations-2026-04-05.md)

## 2. Цель V3

Собрать статический многостраничный сайт, который:

- сохраняет визуальный уровень текущей V2
- даёт отдельные SEO-URL под услуги, статьи и кейсы
- поддерживается шаблонами, а не вручную
- готов к масштабированию в рамках `RU-first` стратегии

## 3. Что считается первым релизом V3

Минимальный рабочий релиз:

- главная страница
- первая service page: `audit-i-redizain-saita-na-konversiyu`
- первая article page: `pochemu-sait-ne-konvertiruet`
- первая case page: `kova-technology-ecommerce`
- рабочие shared layout и navigation
- базовый SEO-слой на всех страницах
- sitemap, robots, llms, favicon-pack

Важно:

- B2B-кластер и остальные материалы не обязательны для самого первого запуска V3
- сначала нужно доказать архитектуру на одном кластере

## 4. Рекомендуемая рабочая директория

Новая реализация должна жить отдельно от текущей production V2.

Рекомендуемая папка:

```text
/Users/ibragimibragimov/Documents/Мои проекты/Portfolio_project/site
```

Текущий [dale-portfolio-v2.html](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html) при этом не трогаем как основную production-базу.

## 5. Базовый стек

Рекомендуемый стек:

- `11ty`
- статический HTML на выходе
- `Nunjucks` layouts/includes
- markdown + frontmatter для контента
- обычный CSS
- обычный JS без frontend-framework runtime

## 6. Целевая структура V3

```text
/site
  package.json
  .eleventy.js
  /src
    /_data
      site.js
      navigation.js
      social.js
      schema.js
    /_includes
      /layouts
        base.njk
        home.njk
        service-page.njk
        article-page.njk
        case-page.njk
      /partials
        head.njk
        nav.njk
        mobile-menu.njk
        footer.njk
        contact-cta.njk
        proof-strip.njk
        faq.njk
        breadcrumbs.njk
    /assets
      /css
        global.css
        components.css
        page-home.css
        page-service.css
        page-article.css
        page-case.css
      /js
        global.js
        home.js
    /pages
      index.njk
    /uslugi
      audit-i-redizain-saita-na-konversiyu.md
    /blog
      pochemu-sait-ne-konvertiruet.md
    /cases
      kova-technology-ecommerce.md
  /public
    robots.txt
    llms.txt
    favicon.svg
    favicon.ico
    favicon-16.png
    favicon-32.png
    favicon-48.png
    favicon-180.png
    apple-touch-icon.png
    og-image.png
```

## 7. Контентные источники для первого релиза

### Главная

Источник:

- [dale-portfolio-v2.html](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html)

### Service page

Источник:

- [seo-draft-audit-page-2026-04-05.md](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/seo-draft-audit-page-2026-04-05.md)

### Article page

Источник:

- [seo-draft-article-pochemu-sait-ne-konvertiruet-2026-04-05.md](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/seo-draft-article-pochemu-sait-ne-konvertiruet-2026-04-05.md)

### Case page

Источник:

- временно на основе блока `Kova Technology` из [dale-portfolio-v2.html](/Users/ibragimibragimov/Documents/Мои%20проекты/Portfolio_project/dale-portfolio-v2.html)
- затем усилить отдельным кейс-текстом и реальными скриншотами

## 8. Порядок реализации

### Этап 1. Scaffold

Сделать:

- создать папку `site/`
- инициализировать `package.json`
- подключить 11ty
- завести `src/`, `_includes/`, `_data/`, `assets/`, `public/`

Результат:

- проект собирается
- есть пустой base layout

### Этап 2. Shared data layer

Сделать:

- `site.js`
  - домен
  - название сайта
  - базовые meta defaults
- `navigation.js`
  - primary nav
  - footer nav
- `social.js`
  - соцссылки
- `schema.js`
  - shared `@id` для `Person` и `WebSite`

Результат:

- больше нет хардкода одних и тех же ссылок и сущностей в нескольких местах

### Этап 3. Shared partials

Сделать:

- `head.njk`
- `nav.njk`
- `mobile-menu.njk`
- `footer.njk`
- `breadcrumbs.njk`
- `faq.njk`
- `proof-strip.njk`
- `contact-cta.njk`

Результат:

- общие блоки готовы для нескольких типов страниц

### Этап 4. Base layout

Сделать:

- `base.njk`

Должен включать:

- `<html lang="ru">`
- shared head
- skip-nav
- nav
- mobile menu
- `main`
- footer
- global scripts

Результат:

- любая страница рендерится через единый layout

### Этап 5. CSS decomposition

Сделать:

- перенести variables, typography и base styles в `global.css`
- вынести reusable cards / faq / buttons / proof / grids в `components.css`
- вынести homepage-специфику в `page-home.css`
- подготовить `page-service.css`, `page-article.css`, `page-case.css`

Результат:

- стили разделены по ответственности
- внутренние страницы не тащат все homepage-only эффекты

### Этап 6. JS decomposition

Сделать:

- `global.js`
  - mobile menu
  - nav scroll state
  - scroll-to-top
  - form logic
- `home.js`
  - preloader
  - hero-only motion
  - dot-grid
  - cursor glow

Результат:

- внутренние страницы получают только нужный JS

### Этап 7. Homepage template

Сделать:

- `home.njk`
- `pages/index.njk`

Перенести:

- hero
- marquee
- work teaser
- services overview
- process
- testimonials
- about
- FAQ
- contact

Но:

- не копировать blindly весь V2 DOM
- очистить homepage-only логику от лишних inline зависимостей

Результат:

- главная выглядит как V2 по духу и качеству
- но уже живёт в шаблонной архитектуре

### Этап 8. Service template

Сделать:

- `service-page.njk`
- `uslugi/audit-i-redizain-saita-na-konversiyu.md`

Подключить:

- page-level SEO data
- breadcrumbs
- FAQ
- related case
- related article
- CTA block
- Service schema

Результат:

- первая коммерческая service page работает как отдельный SEO URL

### Этап 9. Article template

Сделать:

- `article-page.njk`
- `blog/pochemu-sait-ne-konvertiruet.md`

Подключить:

- article typography
- related service CTA
- optional FAQ
- Article schema
- breadcrumbs

Результат:

- первая supporting article работает как самостоятельная SEO-страница

### Этап 10. Case template

Сделать:

- `case-page.njk`
- `cases/kova-technology-ecommerce.md`

Подключить:

- context / problem / solution / result
- screenshots
- related service CTA
- CreativeWork or Article schema
- breadcrumbs

Результат:

- кейс уже не карточка-заглушка, а полноценный trust asset

### Этап 11. System wiring

Сделать:

- внутреннюю перелинковку
- sitemap generation
- robots copy
- llms copy
- canonical
- og:url
- absolute image handling

Результат:

- V3 можно валидировать как связанную SEO-систему

## 9. Что должно быть в frontmatter первой service page

Пример полей:

```yaml
layout: layouts/service-page.njk
title: Аудит и редизайн сайта на конверсию
metaTitle: Аудит и редизайн сайта на конверсию
metaDescription: Разбираю, где сайт теряет доверие, внимание и заявки. Аудит, точки роста и план редизайна под конверсию.
h1: Аудит и редизайн сайта на конверсию
slug: audit-i-redizain-saita-na-konversiyu
summary: Если сайт получает трафик, но не превращает его в заявки, проблема редко бывает только в дизайне.
ogImage: /og-image.png
schemaType: Service
relatedCases:
  - kova-technology-ecommerce
relatedArticles:
  - pochemu-sait-ne-konvertiruet
faq:
  - question: ...
    answer: ...
```

## 10. Что должно быть в shared site data

### `site.js`

Минимум:

- `siteName`
- `siteUrl`
- `language`
- `defaultOgImage`
- `authorName`
- `authorEmail`
- `personId`
- `websiteId`

### `navigation.js`

Минимум:

- главная
- услуги
- кейсы
- статьи
- контакты

### `social.js`

Минимум:

- GitHub
- LinkedIn
- X / Twitter

Если реальных ссылок пока нет:

- не оставлять `#`
- либо временно не выводить блок

## 11. Что можно временно упростить в первой версии V3

Чтобы не раздувать проект, в первой версии допустимо:

- оставить один общий `og-image`
- не делать уникальные OG-изображения для каждой страницы
- не переносить preloader
- не переносить custom cursor на внутренние страницы
- не делать сразу B2B и pricing pages
- не делать pagination, теги и архивы для блога

Это не критично для первого релиза.

## 12. Что нельзя упростить

Нельзя выпускать V3 без:

- уникальных `title` и `description`
- canonical на каждой странице
- нормальной nav / footer URL-структуры
- связанной перелинковки
- работающего mobile menu
- schema по типу страницы
- sitemap
- реальных ссылок вместо `#`

## 13. Acceptance criteria для первого релиза

Первый релиз V3 считается готовым, если:

### Структура

- есть 4 рабочих страницы: home, service, article, case
- все страницы собираются без ручных вставок в head и footer

### SEO

- каждая страница имеет свой `title`, `description`, canonical, og data
- schema валидна и соответствует типу страницы
- sitemap содержит все URL первого релиза

### UX

- nav и mobile menu работают на всех страницах
- формы и CTA логичны
- article page читается легко
- service page выглядит как premium page, а не как generic template

### Performance / visual

- homepage сохраняет дух V2
- внутренние страницы не перегружены homepage effects
- mobile версия не ломается

## 14. Что тестировать перед переключением на V3

Минимальный тест-чеклист:

1. Все ссылки кликаются и ведут на реальные URL.
2. Нет `href="#"` в production templates.
3. Все canonical и `og:url` абсолютные.
4. Все страницы отдаются как отдельные HTML URL.
5. Schema проходит Rich Results / validator check.
6. Sitemap содержит все страницы.
7. Внутренние страницы читаемы на mobile.
8. Главная не потеряла visual quality.

## 15. Порядок после первого релиза

После рабочего V3 rel.1:

1. Добавить B2B service page
2. Добавить B2B article
3. Добавить supporting B2B case
4. Добавить pricing article
5. Только затем возвращаться к SaaS long-tail implementation

## 16. Самый практичный следующий шаг

Если переходить от документов к реальной реализации, следующий шаг такой:

`создать каркас /site на 11ty и собрать в нём shared base + homepage skeleton`

Не сразу весь контент, а именно каркас.
