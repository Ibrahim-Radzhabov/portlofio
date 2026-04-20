# ПРОМПТ ДЛЯ CLAUDE CODE — Финализация портфолио Dale McManus

---

## Как использовать

1. Открой Claude Code в директории Portfolio_project
2. Убедись что `dale-portfolio-v2.html` на месте
3. Скопируй весь промпт ниже и отправь

---

## Промпт

```
# КОНТЕКСТ

Ты финализируешь портфолио-сайт для фулстек-разработчика Dale McManus.

Файл: `dale-portfolio-v2.html` — единый HTML-файл с inline CSS и JS.
Состояние: почти готов к продакшену, остались финальные доработки.

Что уже реализовано и НЕ нужно трогать:
- Тёмная тема + золотой акцент (#e8c572)
- Шрифты: Syne, Outfit, JetBrains Mono
- Hero с animated mesh + magnetic button + staggered анимации
- Projects с gradient-mesh плейсхолдерами + hover-эффекты
- Services (bento), Process, Testimonials, About, Contact, Footer
- Scroll-reveal, cursor glow, ripple-эффект
- Мобильный адаптив
- SEO мета-теги, OG, JSON-LD
- Accessibility: aria-labels, focus-visible, prefers-reduced-motion
- Форма с JS-валидацией + анимированная кнопка (loading → success)
- Весь текст на русском языке

# ЗАДАЧИ (выполняй строго по порядку)

## 1. Scroll indicator в hero (пропущен в прошлой итерации)

Добавь внизу hero-секции анимированный индикатор скролла:
- Маленькая вертикальная линия или стрелка вниз
- Плавная bounce-анимация (вверх-вниз)
- Цвет: var(--text-tertiary) или var(--accent) с пониженной opacity
- При скролле вниз (>100px) — плавно исчезает (opacity → 0)
- Позиция: absolute, bottom 32px, center
- Текст рядом не нужен — только визуальный элемент

## 2. Подключить контактную форму к Formspree

Сейчас форма симулирует отправку через setTimeout. Замени на реальную отправку:

### Шаг 1 — Изменить HTML формы:
```html
<form id="contact-form" action="https://formspree.io/f/{ID}" method="POST">
```
Где `{ID}` — плейсхолдер. Оставь комментарий:
```html
<!-- ВАЖНО: замените {ID} на ваш Formspree endpoint -->
<!-- Регистрация: https://formspree.io → Create Form → скопируйте ID -->
```

### Шаг 2 — Изменить JS-обработчик формы:
Замени текущий симулированный fetch на реальный:

```javascript
const form = document.getElementById('contact-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Валидация (оставь текущую логику валидации как есть)
  if (!validateForm()) return;
  
  const btn = form.querySelector('button[type="submit"]');
  const btnText = btn.querySelector('.btn-text');  // адаптируй под текущую структуру
  
  // Loading state
  btn.disabled = true;
  btn.classList.add('loading');
  
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      // Success state
      btn.classList.remove('loading');
      btn.classList.add('success');
      form.reset();
      
      // Вернуть кнопку в исходное состояние через 3 секунды
      setTimeout(() => {
        btn.classList.remove('success');
        btn.disabled = false;
      }, 3000);
    } else {
      throw new Error('Ошибка отправки');
    }
  } catch (error) {
    btn.classList.remove('loading');
    btn.disabled = false;
    // Покажи ошибку пользователю — красный текст под формой
    showFormError('Не удалось отправить. Попробуйте ещё раз или напишите на email.');
  }
});
```

### Шаг 3 — Добавить обработку ошибок:
- Добавь элемент `.form-error` под кнопкой submit
- При ошибке fetch — показывай сообщение красным цветом
- Через 5 секунд — скрывай сообщение

### Шаг 4 — Добавить атрибуты name ко всем полям формы:
Убедись что каждый input/textarea имеет атрибут `name`:
- name="name" (имя)
- name="email" (email)
- name="budget" (бюджет)
- name="message" (сообщение)

Без `name` Formspree не получит данные.

## 3. Подготовить плейсхолдеры для замены контента

### 3.1 Фото в секции About
Найди плейсхолдер фото в секции About и замени на:
```html
<div class="about-image">
  <!-- ЗАМЕНИТЕ: вставьте путь к вашему фото -->
  <!-- Рекомендуемый размер: 600x750px, формат WebP или JPG -->
  <!-- <img src="your-photo.webp" alt="Dale McManus — фулстек-разработчик" loading="lazy"> -->
  
  <!-- Временный плейсхолдер (удалите когда вставите фото): -->
  <div class="about-image-placeholder">
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="30" r="14" stroke="currentColor" stroke-width="1.5"/>
      <path d="M12 68c0-15.464 12.536-28 28-28s28 12.536 28 28" stroke="currentColor" stroke-width="1.5"/>
    </svg>
    <span>Ваше фото</span>
  </div>
</div>
```
Стилизуй плейсхолдер: иконка-силуэт + текст, центрированные, цвет var(--text-tertiary).

### 3.2 Скриншоты проектов
В каждой карточке проекта оставь текущие gradient-mesh плейсхолдеры, но добавь комментарий:
```html
<!-- ЗАМЕНИТЕ: вставьте скриншот проекта -->
<!-- Рекомендуемый размер: 1200x825px, формат WebP -->
<!-- <img src="project-name.webp" alt="Название проекта" loading="lazy"> -->
```

### 3.3 Отзывы
В каждом отзыве добавь комментарий:
```html
<!-- ЗАМЕНИТЕ: замените текст на реальный отзыв клиента -->
```

## 4. Подготовить к деплою

### 4.1 Добавь favicon
Вставь inline SVG favicon в `<head>`:
```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
```

### 4.2 Добавь README-комментарий в начало файла
Сразу после `<!DOCTYPE html>` добавь:
```html
<!--
  Dale McManus — Portfolio
  
  ПЕРЕД ЗАПУСКОМ:
  1. Зарегистрируйтесь на https://formspree.io
  2. Создайте форму → скопируйте endpoint ID
  3. Найдите в этом файле "{ID}" и замените на ваш endpoint
  4. Замените плейсхолдеры фото и скриншотов (ищите "ЗАМЕНИТЕ" в коде)
  5. Задеплойте на Vercel / Netlify / GitHub Pages
  
  Деплой на Vercel (самый быстрый способ):
  - Установите: npm i -g vercel
  - В папке с файлом: vercel --prod
  
  Деплой на Netlify:
  - Перетащите файл на https://app.netlify.com/drop
  
  Деплой на GitHub Pages:
  - Создайте репозиторий → загрузите файл как index.html → Settings → Pages → Deploy
-->
```

### 4.3 Финальная проверка
После всех изменений пройдись по чек-листу:
- [ ] Scroll indicator появляется и исчезает при скролле
- [ ] Форма отправляет через fetch (проверь что нет ошибок в console при submit)
- [ ] Все input имеют атрибут name
- [ ] Сообщение об ошибке появляется если fetch провалится
- [ ] Фото-плейсхолдер в About выглядит аккуратно
- [ ] Комментарии "ЗАМЕНИТЕ" на месте
- [ ] Favicon отображается во вкладке
- [ ] README-комментарий в начале файла
- [ ] Адаптив не сломался (320px, 768px, 1200px)
- [ ] Нет ошибок в console браузера

# ПРАВИЛА РАБОТЫ

- Редактируй ТОЛЬКО файл `dale-portfolio-v2.html` напрямую
- НЕ создавай Python-скрипты, генераторы или вспомогательные файлы
- Используй str_replace / edit для правок
- Весь CSS и JS остаётся inline в HTML
- НЕ меняй существующий дизайн, цвета, шрифты, анимации — только дополняй
- НЕ удаляй и не переписывай то, что уже работает
- Сохрани результат как `dale-portfolio-v2.html` (перезапиши)
- После завершения — открой файл в браузере и проверь все пункты чек-листа
```

---

## Что дальше (после выполнения этого промпта)

Твои действия руками:

1. **Formspree**: зайди на https://formspree.io → регистрация → Create Form → скопируй ID → найди `{ID}` в HTML и замени
2. **Фото**: сделай/найди качественное фото → сохрани как `photo.webp` → раскомментируй `<img>` в секции About
3. **Скриншоты проектов**: сделай скриншоты своих лучших работ (1200x825px) → замени плейсхолдеры
4. **Отзывы**: попроси реальных клиентов написать 2-3 предложения → вставь вместо плейсхолдеров
5. **Деплой**: самый быстрый — перетащи файл на https://app.netlify.com/drop
