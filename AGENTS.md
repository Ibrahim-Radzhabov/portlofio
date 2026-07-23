# AGENTS.md — точка входа для ИИ-агентов (radzhabov-dev.ru)

> **Старт здесь.** Этот файл — карта проекта и маршрутизатор к остальным докам. Прочитай его целиком, затем документы из раздела «Что читать», затем смотри сами файлы на диске. Обновлён: 2026-07-23 (корпоративная почта назначена основным публичным email; production golden baseline после Phase 8).

## PRODUCTION LOCK — обязательное правило

Текущий прод зафиксирован владельцем как **очень хорошее, утверждённое состояние**. Эталон: коммит **`74018e8`**, релиз **`20260710Tphase8-74018e8`**, документ **`PRODUCTION-BASELINE.md`**. Главную, её композицию, «Излом», карточки «Связки», motion и визуальную систему **нельзя редизайнить, перестраивать или “улучшать” без новой прямой команды владельца**.

Локальное рабочее дерево грязное и содержит другие незакоммиченные слои. Оно **не равно production baseline**. Для точного состояния используй `git show 74018e8:<file>` и проверки из `PRODUCTION-BASELINE.md`. Не делай `git add .`; не обновляй baseline-хеши ради прохождения CI. Если задача неоднозначна — остановись и спроси.

**Фактический production:** 31 HTML-файл, 30 URL в sitemap, 126 файлов в deploy-релизе. Полный манифест: `.github/production-release-74018e8.sha256`. Указанные ниже 38 HTML / 37 URL относятся к pending-слою локального worktree и ещё не являются продом.

## Проект в двух строках
Персональный сайт-портфолио **Ибрагима Раджабова (I. Radzhabov)**: сайты + AI-ассистенты + 1С. Домен **`radzhabov-dev.ru`**. Статичный многостраничный сайт, всё инлайн в каждом `.html`, **без фреймворков/сборки/CDN**. Тема — **светлая кремовая**, тёплый акцент только терракота `#B5623C`, бренд-знак «Излом». Язык интерфейса — русский. Сайт **в проде** (RU-edge, релизы + symlink).

## Что читать (в этом порядке)
1. **`PRODUCTION-BASELINE.md`** — утверждённый прод, защищённые файлы и обязательный протокол изменений.
2. **`CLAUDE.md`** — канон по архитектуре, дизайн-системе, бренду «Излом», прелоадеру. Для byte-exact production верить baseline-коммиту, а не грязному worktree.
3. **`AGENT-HANDOFF.md`** — рабочий хендофф: правила честности, состояние, инструменты верификации.
4. **`marketing/GROWTH-PLAN-v4-reality-grounded.md`** — базовая SEO-стратегия и порядок фаз (заменяет старые апрельские роадмапы). `marketing/GROWTH-PLAN-v5-max.md` — backlog/max-план: часть уже закрыта в Phase6-lite, не исполнять целиком без отдельного решения.
5. **`seo-webmaster-setup.md`** — подключение Вебмастера/GSC.
6. Наряды-история (что и как уже делалось): `marketing/EXECUTOR-BRIEF-Phase0.md`, `EXECUTOR-BRIEF-Phase1.md`, `EXECUTOR-BRIEF-reindex.md`.
7. **`marketing/INFRA-INVENTORY-PRIVATE-2026-07-14.md`** — приватная топология и подтверждённая схема корпоративной почты; не деплоить и не переносить секреты в публичные файлы.

## Pending-состояние worktree (не считать задеплоенным)
**Страницы (38 HTML):** `/` (index) · `/404.html` · услуги `/services/{landing,telegram-bot,ai-assistant,integraciya-1c,nastrojka-1c,podderzhka-bitrix}.html` · кейсы `/cases/` (hub + `/cases/{baby-massage,dag-sport,decorapp}.html`) · ниши `/niches/{sajt-dlya-avtoservisa,sajt-dlya-massazhista,sajt-dlya-barbershopa,sajt-dlya-cvetochnogo-magazina,sajt-dlya-klininga,sajt-dlya-okonnoj-kompanii,sajt-dlya-servisnogo-centra,sajt-dlya-magazina-avtozapchastej}.html` · города `/cities/{mahachkala,kaspijsk,derbent}.html` · блог `/blog/` + 11 статей (`kak-svyazat-sajt-s-1c`, `chto-dolzhno-byt-na-lendinge`, `konstruktor-ili-ruchnaya-verstka`, `ai-konsultant-na-sajte`, `telegram-bot-vmesto-sajta`, `podgotovka-sajta-i-1c-k-integracii`, `telegram-mini-app-ili-bot`, `pochemu-dubliruyutsya-zakazy-v-1c`, `podderzhka-sajta-na-1c-bitrix`, `baza-znanij-dlya-ai-konsultanta`, `pochemu-lending-ne-prinosit-zayavki`) · инструмент `/tools/kalkulyator-lendinga.html` · legal `/legal/{privacy,soglasie}.html`.
**Инфра:** `sitemap.xml` (37 URL, `/404.html` не входит) · `robots.txt` (пускает поисковые + AI-краулеры) · `llms.txt` (позиционирование + гео + ниши + статьи + кейсы + Bitrix-услуга). `lastmod` отражает дату последнего релиза URL; 7 новых статей и хаб блога имеют дату `2026-07-10`.
**Phase 3 (2026-07-03, исполнитель по наряду `marketing/EXECUTOR-BRIEF-Phase3-content.md`, принято ревьюером):** кейс DecorApp/GlowDecor + 3 новые ниши под живые демо (Rihau/FixLab/АвтоМаг) + услуга «Настройка и доработка 1С» (цены на странице НЕТ — только «оценка после разбора») + 4-я статья + карточки организаций в `marketing/backlink-kit.md`.
**Регион (решено владельцем 2026-07-02):** город — **Махачкала** (подтверждён), стратегия — **гибрид**: регион в Вебмастере = Махачкала + текст «работаю удалённо по всей России» + `/cities/` по Дагестану. Гео-строка на главной (about/контакты/футер), `address` в JSON-LD Person, FAQ-пункт про географию. Географию КЛИЕНТОВ (dag-sport, baby-massage) нигде не утверждаем — не подтверждена.

**Сделано:**
- Бренд «Излом» везде (nav+footer всех страниц), фавиконки, og-image (домен исправлен на radzhabov-dev.ru).
- Легаси Dale-шаблона вынесено в `_archive/` (не деплоить, не ссылаться).
- Яндекс.Метрика **110282088** на всех страницах + цели `telegram_click`, `cta_click`, `form_submit`, `calculator_open`. На главной `tag.js` загружается по interaction/idle; Webvisor/ecommerce отключены.
- Формы: Formspree ID **`mkolvvep`** на всех страницах с формой (главная + landing + baby-massage + 5 ниш + калькулятор), у каждой — чекбокс согласия, гейтящий отправку.
- Legal: `privacy.html` + `soglasie.html` (оператор — **физлицо**), ссылки в подвале всех страниц.
- Подтверждение: GSC — через **DNS TXT**; Яндекс.Вебмастер — мета-тег `yandex-verification=1e2895c9cc7530b7`. Sitemap отдан, переобход главной + 5 ниш запрошен.
- 5 нишевых страниц под **реальные демо** с уникальным (не doorway) текстом.

**Демо-проекты (реальные примеры, на них ссылаются ниши и блок «Работы»):** `pdr / flora / barber / qlean / rihau / fixlab / avtozap`.radzhabov-dev.ru + `baby-massage05.ru`. Это копии боевых клиентских сайтов (напр. barber → throne-barbershop.ru). Хостятся на отдельном Foreign VPS (был сбой, восстановлен — если демо отдают 502, это инфра, не контент).

**Публичные контакты текущего сайта (не выдумывать, не заменять без отдельной команды):** email `work@radzhabov-dev.ru`, Telegram `t.me/rdvigm`, GitHub `github.com/Ibrahim-Radzhabov`.

**Корпоративная почта:** `work@radzhabov-dev.ru` принимает письма через ImprovMX и отправляет через Gmail + Brevo SMTP; настройка протестирована. 2026-07-23 владелец назначил её основной публичной почтой сайта: использовать в видимом тексте, `mailto`, JSON-LD, legal и новых материалах. Получатель формы Formspree настраивается отдельно в кабинете Formspree и не определяется HTML-кодом сайта. Операционная схема и правила: `marketing/INFRA-INVENTORY-PRIVATE-2026-07-14.md` § «Corporate email».

## Что открыто (после Phase 6-lite)
1. **Вебмастер/GSC: ожидание данных.** На 2026-07-13 владелец подтвердил: хаб `/blog/` и семь новых статей от 2026-07-10 отправлены на индексацию в GSC и в переобход Яндекс.Вебмастера. Не переотправлять их без существенных изменений. Регион **Махачкала** включить в Вебмастере, если настройка станет доступна.
2. **Бэклинки (владелец, материалы готовы):** `marketing/backlink-kit.md` — тексты bio для профилей, строка для подвалов клиентов, чек-лист публикации. Habr/VC-статья ждёт 4 реальных факта от владельца (плейсхолдеры в `marketing/article-dag-sport-habr.md`).
3. **Дождаться данных** GSC/Вебмастера (2–4 недели): смотреть показы по городам/статьям/Bitrix-услуге, масштабировать только то, что даёт клики/заявки. Кандидаты на расширение: `llms-full.txt`, новые материалы только по данным.
4. **Факт-вопросы владельцу (не блокируют):** dag-sport и baby-massage — клиенты из Дагестана? (если да — можно честно усилить страницу Махачкалы); фото для «Обо мне»; шрифты для og-image.
5. **Опционально:** вычистить из публичного репо старую апрельскую seo-серию `git rm --cached` (сейчас она видна на GitHub); микро-CRO услуг проверен 2026-07-02 — «для кого/что входит/сроки/CTA» уже есть на всех 4 услугах, ничего добавлять не потребовалось.
6. **Phase 4 «Моушен и запоминаемость» (2026-07-07):** главная получила отдельный desktop-only motion layer по `marketing/EXECUTOR-BRIEF-Phase4-motion.md`: self-hosted GSAP core + ScrollTrigger, Lenis и Three.js core в `assets/js/vendor/`, код в `assets/js/home-motion.js`. Жёсткий гейт: `min-width:969px` + `pointer:fine` + `prefers-reduced-motion:no-preference`; mobile/reduced не должны запрашивать vendor. Vendor budget ≤250 KB gzip; всё грузится после `window.load` + idle + `body.pl-done`. `_proto/` не деплоить.
7. **Phase 5 дизайн-полировка + security (2026-07-07):** дизайн-часть `marketing/EXECUTOR-BRIEF-Phase5-design-security.md` выполнена ранее: индивидуальные OG-картинки в `assets/og/`, browser-frame для скриншотов, form toast, tertiary-контраст, 404-пасхалка, SVG-схемы в двух статьях, точечные `&nbsp;`, единые линейные SVG-иконки для niche `feature-icon`. Security-часть выполнена сейчас: honeypot `_gotcha` во всех формах Formspree, meta-CSP на `index.html` (консоль чистая), создан `marketing/security-owner-checklist.md`.
8. **Phase 6-lite SEO (2026-07-07):** добавлена услуга `services/podderzhka-bitrix.html`, FAQPage на `services/landing.html`, видимые breadcrumbs на внутренних страницах, TL;DR в 4 статьях, HowTo schema в двух статьях, FAQ «Оплата и договор» на главной, `marketing/position-log.md`, расширен `marketing/backlink-kit.md`, обновлены `sitemap.xml`/`llms.txt`. Затем отдельным SEO date patch все sitemap `lastmod` и blog `dateModified` синхронизированы на `2026-07-07`; изменения задеплоены на RU-edge.

## Жёсткие правила (нарушение = брак)
- **Не выдумывать** отзывы, клиентов, цифры, офисы, регион, гарантии. Ниши — только под реальное демо (стоматология/салон красоты — нет примера, не делать).
- **dag-sport:** сам сайт делал НЕ он — только интеграция 1С УТ + AI-консультант. Не приписывать разработку сайта.
- Домен только `radzhabov-dev.ru` (нет `radzhabov.dev`); Telegram только `rdvigm` (нет `radzhabov_dev`).
- Без фреймворков/сборки/CDN. Главная: `index.html` + `assets/css/home.css` + `assets/js/home.js`; внутренние страницы пока инлайн. Главная self-hosts шрифты из `assets/fonts/`; на внутренних страницах пока допустим Google Fonts. Из runtime-внешнего — Яндекс.Метрика. Палитра/бренд/позиционирование не менять без подтверждения.
- `_archive/` не трогать и **не деплоить**. Русский для всего пользовательского текста.
- Спрашивать до крупной/неоднозначной работы; не «чинить» регрессы вслепую — докладывать.

## Верификация после правок (всегда)
tag-balance (`html.parser` → 0/0) · JSON-LD `json.loads` валиден · граф внутренних ссылок без сирот/битых · title ≤60, description ≤155 · все ассеты резолвятся · консистентность (`radzhabov-dev.ru`/`rdvigm`/`work@radzhabov-dev.ru`, нет старого домена и старой почты) · локально `python3 -m http.server 8000`, проверить 375/768/desktop.

## Деплой
Деплоить только боевой сайт: `index.html`, `404.html`, `services/`, `cases/`, `niches/`, `cities/`, `blog/`, `tools/`, `legal/`, `assets/`, фавиконки, `og-image.png`, `robots.txt`, `sitemap.xml`, `llms.txt`. IndexNow key-файл `7b0ac3a0284c609d4a87150540ffc2c8a7aebb4d39819252.txt` тоже включать в deploy artifact. **НЕ деплоить:** `_archive/`, `marketing/`, `output/`, `scripts/`, `tz/`, все `.md`-доки.
GitHub Pages workflow (`.github/workflows/jekyll-gh-pages.yml`) собирает артефакт по этому же whitelist (2026-07-02 добавлены `cities/`, `blog/`, `legal/` — legal раньше отсутствовал в артефакте). Внутренние доки и `marketing/` дополнительно закрыты через `.gitignore` (репозиторий публичный).

## Карта доков: актуальные vs устаревшие
**Актуальные (доверять):** `CLAUDE.md`, `AGENT-HANDOFF.md`, `AGENTS.md` (этот), `marketing/GROWTH-PLAN-v4-reality-grounded.md`, `marketing/EXECUTOR-BRIEF-*.md`, `marketing/DESIGN-DIRECTION-v2.md`, `_proto/hero.html` (утверждённый дизайн-эталон, не для прода), `seo-webmaster-setup.md`, `llms.txt`, `sitemap.xml`, `robots.txt`.
**Устаревшие / исторические (НЕ использовать как источник истины):** вся серия `seo-*-2026-04-05/06*.md`, `seo-geo-roadmap.md`, `homepage-solo-structure-*.md`, `claude-code-final-prompt.md`, `DEPLOY_AGENT_BRIEF-*.md`, `tz/*`, `preloader-spec-v2.md` (только референс), `marketing/MOCKUP-BRIEF.md`. Это следы более ранних фаз и старого тёмного дизайна — они противоречат текущему состоянию.
