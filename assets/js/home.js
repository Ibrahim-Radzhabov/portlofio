(function() {
  'use strict';

  // === Метрика goal helper (safe) ===
  function __reach(n){ try{ if(typeof ym==='function') ym(110282088,'reachGoal',n); }catch(e){} }

  // === DEBOUNCE UTILITY ===
  function debounce(fn, ms) {
    let t;
    return function() {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), ms);
    };
  }

  // === SECTION TITLE STABILITY ===
  // Previously these headings were being re-written via innerText during scroll,
  // which caused visible layout shifts on narrow viewports. We keep them static
  // and let the existing reveal animation handle the entrance instead.
  document.querySelectorAll('.section-title').forEach(function(title) {
    if (!title.dataset.text) title.dataset.text = title.textContent;
    title.dataset.decoded = "true";
  });

  // === NAV SCROLL ===
  const nav = document.getElementById('nav');
  const handleScroll = debounce(function() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, 10);
  window.addEventListener('scroll', handleScroll, { passive: true });
  nav.classList.toggle('scrolled', window.scrollY > 50);

  // === MOBILE MENU ===
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobile-menu');
  let lastFocused = null;
  const menuLinks = () => mobileMenu.querySelectorAll('a');

  window.toggleMenu = function () {
    const isActive = mobileMenu.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', isActive);
      menuBtn.setAttribute('aria-label', isActive ? 'Закрыть меню' : 'Открыть меню');
      menuBtn.classList.toggle('is-open', isActive);
    }
    if (isActive) {
      lastFocused = document.activeElement;
      const l = menuLinks();
      if (l.length) l[0].focus();
    } else if (lastFocused) {
      lastFocused.focus();
    }
  };

  if (menuBtn) menuBtn.addEventListener('click', toggleMenu);

  document.addEventListener('keydown', function (e) {
    if (!mobileMenu.classList.contains('active')) return;
    if (e.key === 'Escape') { e.preventDefault(); toggleMenu(); return; }
    if (e.key === 'Tab') {
      const l = [...menuLinks()]; if (!l.length) return;
      const first = l[0], last = l[l.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // === SCROLL INDICATOR ===
  const scrollInd = document.getElementById('scrollIndicator');
  if (scrollInd) {
    const hideIndicator = debounce(function() {
      scrollInd.classList.toggle('hidden', window.scrollY > 100);
    }, 10);
    window.addEventListener('scroll', hideIndicator, { passive: true });
  }

  // === SCROLL REVEAL ===
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });

  // === SMOOTH ANCHOR SCROLLING ===
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === HERO PARALLAX ===
  const heroMesh = document.querySelector('.hero-mesh');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroMesh && !prefersReduced) {
    const parallaxHandler = debounce(function() {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroMesh.style.transform = 'translateY(' + (y * 0.3) + 'px)';
      }
    }, 5);
    window.addEventListener('scroll', parallaxHandler, { passive: true });
  }

  // Magnetic button logic moved to global interaction block

  // === WORK DISCOVERY SCROLL ===
  (function() {
    var feature = document.querySelector('[data-work-feature]');
    if (!feature) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var backgrounds = feature.querySelectorAll('[data-work-bg]');
    var cards = feature.querySelectorAll('[data-work-card]');
    var intro = feature.querySelector('[data-work-intro]');
    var introCopy = feature.querySelector('[data-work-intro-copy]');
    var introLeft = feature.querySelectorAll('[data-work-intro-left]');
    var introRight = feature.querySelectorAll('[data-work-intro-right]');
    var introImage = feature.querySelector('[data-work-intro-image]');
    var shade = feature.querySelector('.work-discovery-shade');
    var lines = feature.querySelector('.work-discovery-lines');
    var rail = feature.querySelector('.work-discovery-rail');
    var caption = feature.querySelector('.work-discovery-caption');
    var itemCount = Math.min(backgrounds.length, cards.length);
    var activeIndex = -1;
    var rafId = 0;
    var running = false;
    var targetProgress = 0;
    var renderedProgress = 0;
    var mobileQuery = window.matchMedia('(max-width: 520px)');

    function measureProgress() {
      var rect = feature.getBoundingClientRect();
      var range = feature.offsetHeight - window.innerHeight;
      return range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
    }

    function smoothStep(value) {
      var clamped = Math.min(1, Math.max(0, value));
      return clamped * clamped * (3 - 2 * clamped);
    }

    function setActiveWork(index) {
      if (index === activeIndex || index < 0 || index >= itemCount) return;
      activeIndex = index;
      backgrounds.forEach(function(bg, bgIndex) {
        bg.classList.toggle('is-active', bgIndex === index);
      });
      cards.forEach(function(card, cardIndex) {
        card.classList.toggle('is-active', cardIndex === index);
      });
    }

    function renderWorkFeature(progress) {
      var introEnd = mobileQuery.matches ? 0.28 : 0.24;
      var introFadeEnd = introEnd + 0.12;
      var introOpacity = 1 - smoothStep((progress - introEnd) / (introFadeEnd - introEnd));
      var carouselOpacity = smoothStep((progress - introEnd * 0.78) / (introFadeEnd - introEnd * 0.78));
      var carouselProgress = Math.min(1, Math.max(0, (progress - introEnd) / (1 - introEnd)));
      var phase = carouselProgress * Math.max(1, itemCount - 1);
      var dominantIndex = 0;
      var dominantOpacity = -1;
      var isMobile = mobileQuery.matches;
      var bgShift = isMobile ? -6 : -10;
      var bgBaseScale = isMobile ? 1.055 : 1.08;
      var bgActiveScale = isMobile ? 0.026 : 0.045;
      var introScale = isMobile ? 8.8 : 13.2;
      var imageIn = smoothStep((progress - 0.026) / (introEnd * 0.32));
      var imageScaleProgress = smoothStep((progress - 0.05) / (introEnd * 0.68));
      var splitProgress = smoothStep((progress - 0.03) / (introEnd * 0.72));
      var textFade = smoothStep((progress - introEnd * 0.62) / (introEnd * 0.38));
      var splitDistance = isMobile ? 150 : 520;

      if (intro) {
        intro.style.opacity = introOpacity.toFixed(3);
        intro.style.visibility = introOpacity > 0.01 ? 'visible' : 'hidden';
      }

      if (introCopy) {
        introCopy.style.opacity = Math.max(0, 1 - textFade).toFixed(3);
        introCopy.style.transform = 'translate3d(0, ' + (-18 * textFade).toFixed(2) + 'px, 0)';
      }

      introLeft.forEach(function(word) {
        word.style.transform = 'translate3d(' + (-splitDistance * splitProgress).toFixed(2) + 'px, 0, 0)';
      });

      introRight.forEach(function(word) {
        word.style.transform = 'translate3d(' + (splitDistance * splitProgress).toFixed(2) + 'px, 0, 0)';
      });

      if (introImage) {
        introImage.style.borderRadius = (2 + imageScaleProgress * 18).toFixed(2) + 'px';
        introImage.style.boxShadow = '0 ' + (22 + imageScaleProgress * 30).toFixed(2) + 'px ' + (70 + imageScaleProgress * 80).toFixed(2) + 'px rgba(20, 18, 16, ' + (0.16 + imageScaleProgress * 0.18).toFixed(3) + ')';
        introImage.style.opacity = imageIn.toFixed(3);
        introImage.style.transform = 'translate3d(-50%, -50%, 0) scale(' + (0.32 + imageScaleProgress * introScale).toFixed(4) + ')';
      }

      if (shade) shade.style.opacity = carouselOpacity.toFixed(3);
      if (lines) lines.style.opacity = (0.72 * carouselOpacity).toFixed(3);
      if (rail) rail.style.opacity = carouselOpacity.toFixed(3);
      if (caption) caption.style.opacity = carouselOpacity.toFixed(3);

      backgrounds.forEach(function(bg, bgIndex) {
        var distance = Math.abs(phase - bgIndex);
        var opacity = Math.max(0, Math.min(1, 1 - distance));
        var eased = opacity * opacity * (3 - 2 * opacity);
        if (opacity > dominantOpacity) {
          dominantOpacity = opacity;
          dominantIndex = bgIndex;
        }
        bg.classList.toggle('is-visible', eased > 0.001);
        bg.style.opacity = eased.toFixed(3);
        bg.style.transform = 'translate3d(0, ' + ((bgIndex - phase) * bgShift).toFixed(2) + 'px, 0) scale(' + (bgBaseScale - eased * bgActiveScale).toFixed(4) + ')';
      });

      if (rail) {
        var railTravel = isMobile ? -42 : -96;
        rail.style.transform = 'translate3d(0, calc(-50% + ' + ((progress - 0.5) * railTravel).toFixed(2) + 'px), 0)';
      }

      setActiveWork(dominantIndex);
      feature.style.setProperty('--work-discovery-progress', progress.toFixed(3));
    }

    // Lerp-сглаживание прогресса: rendered "догоняет" target -> плавный зум без библиотек.
    function loop() {
      var diff = targetProgress - renderedProgress;
      if (Math.abs(diff) < 0.0004) {
        renderedProgress = targetProgress;
        renderWorkFeature(renderedProgress);
        running = false;
        rafId = 0;
        return;
      }
      renderedProgress += diff * 0.14;
      renderWorkFeature(renderedProgress);
      rafId = window.requestAnimationFrame(loop);
    }

    function startLoop() {
      if (running) return;
      running = true;
      rafId = window.requestAnimationFrame(loop);
    }

    function requestWorkFeatureUpdate() {
      targetProgress = measureProgress();
      startLoop();
    }

    window.addEventListener('scroll', requestWorkFeatureUpdate, { passive: true });
    window.addEventListener('resize', requestWorkFeatureUpdate);
    targetProgress = measureProgress();
    renderedProgress = targetProgress;
    renderWorkFeature(renderedProgress);
  })();

  // === RIPPLE EFFECT ===
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', function() { ripple.remove(); });
    });
  });

  // === DOT GRID (proximity glow — fullscreen) ===
  (function() {
    var canvas = document.getElementById('dotGrid');
    if (!canvas) return;
    var finePointer = window.matchMedia('(min-width: 641px) and (hover: hover) and (pointer: fine)').matches;
    if (!finePointer) {
      canvas.style.display = 'none';
      return;
    }
    var ctx = canvas.getContext('2d');
    var gap = 28;
    var baseRadius = 1;
    var glowRadius = 160;
    var mx = -9999, my = -9999;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var frameId = 0;

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      requestDraw();
    }

    function draw() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      var scrollY = window.scrollY;
      // Only draw dots visible in viewport (perf optimization)
      var offsetY = scrollY % gap;

      for (var x = gap; x < w; x += gap) {
        for (var y = gap - offsetY; y < h; y += gap) {
          var dx = x - mx;
          var dy = y - my;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var t = Math.max(0, 1 - dist / glowRadius);
          var alpha = 0.12 + t * 0.7;
          var r = baseRadius + t * 1.5;

          var rr = Math.round(163 + t * (26 - 163));
          var gg = Math.round(158 + t * (58 - 158));
          var bb = Math.round(152 + t * (42 - 152));

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + rr + ',' + gg + ',' + bb + ',' + alpha + ')';
          ctx.fill();
        }
      }
    }

    function requestDraw() {
      if (frameId) return;
      frameId = requestAnimationFrame(function() {
        frameId = 0;
        draw();
      });
    }

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', requestDraw, { passive: true });

    if (finePointer && !reducedMotion) {
      document.addEventListener('mousemove', function(e) {
        mx = e.clientX;
        my = e.clientY;
        requestDraw();
      }, { passive: true });
      document.addEventListener('mouseleave', function() {
        mx = -9999;
        my = -9999;
        requestDraw();
      }, { passive: true });
    }

    resize();
  })();

  // === INTERACTION (CURSOR, MAGNETIC, GLASS) ===
  const cursorGlow = document.getElementById('cursorGlow');
  const cursorFollower = document.getElementById('cursorFollower');
  var isPointerFine = window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isPointerFine) {
    var mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    var glowCX = mouseX, glowCY = mouseY, follCX = mouseX, follCY = mouseY;
    var cursorRaf = 0;

    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!cursorRaf) cursorRaf = requestAnimationFrame(animateCursors);
    }, { passive: true });

    // Magnetic elements
    var magnetics = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-links a');
    magnetics.forEach(function(btn) {
      btn.addEventListener('mousemove', function(e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
      });
      btn.addEventListener('mouseleave', function() {
        btn.style.transform = 'translate(0, 0)';
      });
    });

    // Interactive elements trigger .active state
    var interactiveEls = document.querySelectorAll('a, button, .work-card, input, textarea, select');
    interactiveEls.forEach(function(el) {
      el.addEventListener('mouseenter', function() { if (cursorFollower) cursorFollower.classList.add('active'); });
      el.addEventListener('mouseleave', function() { if (cursorFollower) cursorFollower.classList.remove('active'); });
    });

    function animateCursors() {
      // Glow follows slowly
      glowCX += (mouseX - glowCX) * 0.1;
      glowCY += (mouseY - glowCY) * 0.1;
      if (cursorGlow) {
        cursorGlow.style.left = glowCX + 'px';
        cursorGlow.style.top = glowCY + 'px';
      }

      // Follower follows faster for snappier trail
      follCX += (mouseX - follCX) * 0.25;
      follCY += (mouseY - follCY) * 0.25;
      if (cursorFollower) {
        cursorFollower.style.left = follCX + 'px';
        cursorFollower.style.top = follCY + 'px';
      }

      if (Math.abs(mouseX - glowCX) > 0.1 || Math.abs(mouseY - glowCY) > 0.1 ||
          Math.abs(mouseX - follCX) > 0.1 || Math.abs(mouseY - follCY) > 0.1) {
        cursorRaf = requestAnimationFrame(animateCursors);
      } else {
        cursorRaf = 0;
      }
    }
    if (cursorGlow) cursorGlow.style.opacity = '1';
    if (cursorFollower) cursorFollower.style.opacity = '1';
  } else {
    if (cursorGlow) cursorGlow.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
  }

  // === HERO SCENARIOS ===
  var heroScenarioButtons = document.querySelectorAll('.hero-scenario');
  var heroScenarioTitle = document.getElementById('heroScenarioTitle');
  var heroScenarioDescription = document.getElementById('heroScenarioDescription');
  var heroScenarioCopy = document.getElementById('heroScenarioCopy');
  var heroProcess = document.querySelector('.hero-process');

  if (heroScenarioButtons.length && heroScenarioTitle && heroScenarioDescription && heroScenarioCopy) {
    var heroScenarios = {
      layout: {
        title: 'Сайт или магазин,<br><span class="highlight">который продаёт.</span>',
        description: 'Соберу лендинг, сайт или магазин, понятный клиенту: легко найти нужное и оставить заявку или заказ.',
        process: [
          { num: '01', title: 'Понимаю задачу', desc: 'Смотрю, зачем человек пришёл: оставить заявку, выбрать товар, оформить заказ или задать вопрос.' },
          { num: '02', title: 'Собираю структуру', desc: 'Продумываю первый экран, каталог или услуги, доверие, контакты и понятный следующий шаг.' },
          { num: '03', title: 'Готовлю к запуску', desc: 'Собираю аккуратный сайт или магазин, который можно сразу показать клиентам и развивать дальше.' }
        ]
      },
      raw: {
        title: 'AI-ассистент,<br><span class="highlight">всегда на связи.</span>',
        description: 'Настраиваю AI-помощника: отвечает клиентам на частые вопросы и передаёт заявку вам — даже ночью и в выходные.',
        process: [
          { num: '01', title: 'Разбираю вопросы', desc: 'Смотрю, что спрашивают чаще всего, что нужно уточнять и когда подключать человека.' },
          { num: '02', title: 'Настраиваю ответы', desc: 'Логика ответов, границы и передача заявки вам или сразу в работу.' },
          { num: '03', title: 'Проверяю в работе', desc: 'Довожу до состояния, где ассистент помогает, а не мешает: отвечает спокойно и не обещает лишнего.' }
        ]
      },
      task: {
        title: 'Сайт, AI и 1С<br><span class="highlight">в одной<br>системе.</span>',
        description: 'Связываю сайт, AI и 1С: заявка с сайта уходит в ответ клиенту и в 1С — без ручного переноса и потерь.',
        process: [
          { num: '01', title: 'Смотрю путь заявки', desc: 'Разбираю, что происходит от формы или сообщения до ответа клиенту и записи в 1С.' },
          { num: '02', title: 'Собираю связку', desc: 'Соединяю сайт, AI-ответы и 1С в один поток, без ручного переноса.' },
          { num: '03', title: 'Убираю потери', desc: 'Заявки не теряются в переписках и таблицах, а идут по понятному маршруту.' }
        ]
      }
    };
    var heroScenarioSwapTimer = null;
    var currentHeroScenario = null;
    var heroScenarioResizeTimer = null;

    function updateHeroScenarioButtons(key) {
      heroScenarioButtons.forEach(function(btn) {
        var isActive = btn.getAttribute('data-scenario') === key;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }

    function applyHeroScenarioContent(key) {
      heroScenarioTitle.innerHTML = heroScenarios[key].title;
      heroScenarioDescription.textContent = heroScenarios[key].description;
      if (heroProcess && heroScenarios[key].process) {
        var steps = heroScenarios[key].process;
        var html = '';
        steps.forEach(function(step) {
          html += '<div class="hero-proc-step"><div class="hero-proc-num">' + step.num + '</div><div><div class="hero-proc-title">' + step.title + '</div><div class="hero-proc-desc">' + step.desc + '</div></div></div>';
        });
        heroProcess.innerHTML = html;
      }
    }

    function measureHeroScenarioHeight() {
      heroScenarioCopy.classList.remove('is-swapping-out');
      heroScenarioCopy.style.minHeight = '0px';
      var currentHeight = heroScenarioCopy.offsetHeight;
      if (currentHeight > 0) {
        heroScenarioCopy.style.minHeight = currentHeight + 'px';
      }
    }

    function setHeroScenario(key, immediate) {
      if (!heroScenarios[key]) return;
      if (currentHeroScenario === key && !immediate) return;

      updateHeroScenarioButtons(key);

      if (heroScenarioSwapTimer) clearTimeout(heroScenarioSwapTimer);

      if (immediate) {
        heroScenarioCopy.classList.remove('is-swapping-out');
        applyHeroScenarioContent(key);
        currentHeroScenario = key;
        return;
      }

      heroScenarioCopy.classList.add('is-swapping-out');
      if (heroProcess) heroProcess.style.opacity = '0';

      heroScenarioSwapTimer = setTimeout(function() {
        applyHeroScenarioContent(key);
        currentHeroScenario = key;
        heroScenarioCopy.classList.remove('is-swapping-out');
        if (heroProcess) heroProcess.style.opacity = '1';
      }, 200);
    }

    heroScenarioButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        setHeroScenario(btn.getAttribute('data-scenario'));
      });
    });

    var initialHeroScenario = document.querySelector('.hero-scenario.is-active');
    setHeroScenario(initialHeroScenario ? initialHeroScenario.getAttribute('data-scenario') : 'task', true);

    requestAnimationFrame(measureHeroScenarioHeight);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measureHeroScenarioHeight);
    }
    window.addEventListener('resize', function() {
      clearTimeout(heroScenarioResizeTimer);
      heroScenarioResizeTimer = setTimeout(measureHeroScenarioHeight, 120);
    });
  }

  // === FORM VALIDATION ===
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (form) {
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function clearErrors() {
      form.querySelectorAll('.form-group').forEach(function(g) {
        g.classList.remove('error');
        var field = g.querySelector('input, textarea');
        if (field) field.setAttribute('aria-invalid', 'false');
      });
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      clearErrors();

      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');
      let valid = true;

      if (!name.value.trim()) {
        name.closest('.form-group').classList.add('error');
        name.setAttribute('aria-invalid', 'true');
        valid = false;
      }
      if (!validateEmail(email.value.trim())) {
        email.closest('.form-group').classList.add('error');
        email.setAttribute('aria-invalid', 'true');
        valid = false;
      }
      if (!message.value.trim()) {
        message.closest('.form-group').classList.add('error');
        message.setAttribute('aria-invalid', 'true');
        valid = false;
      }

      if (!valid) {
        var firstInvalid = form.querySelector('.form-group.error input, .form-group.error textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var sendArrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;display:inline-block;vertical-align:-4px;margin-left:4px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

      var consent = form.querySelector('.consent input[type="checkbox"]');
      if (consent && !consent.checked) {
        submitBtn.querySelector('.btn-text').textContent = 'Отметьте согласие на обработку данных';
        setTimeout(function(){ submitBtn.querySelector('.btn-text').innerHTML = 'Отправить задачу ' + sendArrow; }, 3000);
        return;
      }

      // === FORMSPREE INTEGRATION ===
      var FORMSPREE_ID = 'mkolvvep';
      var FORMSPREE_URL = 'https://formspree.io/f/' + FORMSPREE_ID;

      if (FORMSPREE_ID === 'YOUR_FORM_ID') {
        submitBtn.classList.add('loading');
        setTimeout(function() {
          submitBtn.classList.remove('loading');
          submitBtn.querySelector('.btn-text').textContent = 'Форма временно не подключена';
          setTimeout(function() {
            submitBtn.querySelector('.btn-text').innerHTML = 'Отправить задачу ' + sendArrow;
          }, 4000);
        }, 600);
        return;
      }

      submitBtn.classList.add('loading');

      var data = new FormData(form);

      fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(function(response) {
        submitBtn.classList.remove('loading');

        if (response.ok) {
          // Успешная отправка
          __reach('form_submit');
          submitBtn.classList.add('success');
          submitBtn.querySelector('.btn-text').textContent = 'Задача отправлена ✓';
          form.reset();

          setTimeout(function() {
            submitBtn.classList.remove('success');
            submitBtn.querySelector('.btn-text').innerHTML = 'Отправить задачу ' + sendArrow;
          }, 4000);
        } else {
          // Ошибка сервера (неверный ID формы, лимит и т.д.)
          return response.json().then(function(data) {
            var msg = (data && data.errors && data.errors[0] && data.errors[0].message)
              ? data.errors[0].message
              : 'Ошибка отправки. Попробуйте ещё раз.';
            submitBtn.querySelector('.btn-text').innerHTML = msg;
            setTimeout(function() {
              submitBtn.querySelector('.btn-text').innerHTML = 'Отправить задачу ' + sendArrow;
            }, 4000);
          });
        }
      })
      .catch(function() {
        // Ошибка сети
        submitBtn.classList.remove('loading');
        submitBtn.querySelector('.btn-text').textContent = 'Нет соединения. Попробуйте позже.';
        setTimeout(function() {
          submitBtn.querySelector('.btn-text').innerHTML = 'Отправить задачу ' + sendArrow;
        }, 4000);
      });
    });

    form.querySelectorAll('input, textarea').forEach(function(input) {
      input.addEventListener('input', function() {
        this.closest('.form-group').classList.remove('error');
        this.setAttribute('aria-invalid', 'false');
      });
    });
  }

  // === SCROLL TO TOP ===
  var footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  var scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    var handleScrollTop = debounce(function() {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, 50);
    window.addEventListener('scroll', handleScrollTop, { passive: true });
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === ACTIVE NAV LINK (highlight current section) ===
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = Array.from(navLinks).map(function(a) {
    var id = a.getAttribute('href').replace('#', '');
    return { link: a, section: document.getElementById(id) };
  }).filter(function(item) { return item.section; });

  var handleNavActive = debounce(function() {
    var scrollY = window.scrollY + 100;
    var current = null;
    sections.forEach(function(item) {
      if (item.section.offsetTop <= scrollY) {
        current = item;
      }
    });
    navLinks.forEach(function(a) { a.classList.remove('nav-active'); });
    if (current) current.link.classList.add('nav-active');
  }, 50);

  window.addEventListener('scroll', handleNavActive, { passive: true });
  handleNavActive();

  // === ARIA LIVE REGION для формы ===
  var formStatus = document.getElementById('form-status');
  var formEl = document.getElementById('contactForm');
  if (formEl && formStatus) {
    // Наблюдаем за изменением текста кнопки submit и транслируем в live region
    var submitBtnEl = document.getElementById('submitBtn');
    if (submitBtnEl) {
      var btnObserver = new MutationObserver(function() {
        var btnText = submitBtnEl.querySelector('.btn-text');
        if (btnText) {
          var txt = btnText.textContent.trim();
          if (txt && txt !== 'Отправить задачу') {
            formStatus.textContent = txt;
          }
        }
      });
      btnObserver.observe(submitBtnEl, { subtree: true, characterData: true, childList: true });
    }
  }

  // === Метрика: клики по Telegram CTA + .btn-primary CTA ===
  document.querySelectorAll('a[href*="t.me/rdvigm"]').forEach(function(a){
    a.addEventListener('click', function(){ __reach('telegram_click'); });
  });
  document.querySelectorAll('.btn-primary:not([type=submit]):not(#submitBtn)').forEach(function(a){
    a.addEventListener('click', function(){ __reach('cta_click'); });
  });

})();

(function () {
  'use strict';
  var lb = document.getElementById('lb'), im = document.getElementById('lb-img');
  if (!lb) return;
  function close() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); im.removeAttribute('src'); }
  document.addEventListener('click', function (e) {
    var z = e.target.closest('[data-zoom]');
    if (z) { im.src = z.getAttribute('src'); im.alt = z.getAttribute('alt') || ''; lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); return; }
    if (e.target === lb || e.target === im) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });
}());
