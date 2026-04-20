/**
 * PREMIUM UI TOOLKIT (PUI)
 * Vanilla JS for High-End Awwwards-style Web Experiences
 * 
 * Usage: Insert <script src="premium-ui.js"></script> before </body>
 */

(function() {
  'use strict';

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isPointerFine = window.matchMedia('(pointer: fine)').matches;

  // 1. PRELOADER
  window.addEventListener('load', function() {
    const preloader = document.querySelector('.pui-preloader');
    if (preloader) {
      setTimeout(() => preloader.classList.add('hidden'), 1500);
    }
  });

  if (isReducedMotion) return;

  // 2. SCROLL REVEAL OBSERVER
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.pui-reveal').forEach(el => revealObserver.observe(el));

  // 3. TEXT DECODE (SCRAMBLE) EFFECT
  const puiLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789!@#$%^&*()";
  function decodeText(el) {
    const originalText = el.dataset.text || el.innerText;
    if (!el.dataset.text) el.dataset.text = originalText;
    let iterations = 0;
    const interval = setInterval(() => {
      el.innerText = originalText.split("").map((letter, index) => {
        if (letter === " " || letter === "\n") return letter;
        if (index < iterations) return originalText[index];
        return puiLetters[Math.floor(Math.random() * puiLetters.length)];
      }).join("");
      if (iterations >= originalText.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 40);
  }

  const decodeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.decoded) {
        entry.target.dataset.decoded = "true";
        decodeText(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.pui-scramble-text').forEach(t => decodeObserver.observe(t));

  // --- DESKTOP ONLY EFFECTS (FINE POINTER) ---
  if (!isPointerFine) return;

  document.body.classList.add('pui-cursor-enabled');

  // Insert Cursors if not present
  let cursorGlow = document.querySelector('.pui-cursor-glow');
  let cursorFollower = document.querySelector('.pui-cursor-follower');
  
  if (!cursorFollower) {
    cursorGlow = document.createElement('div');
    cursorGlow.className = 'pui-cursor-glow';
    cursorFollower = document.createElement('div');
    cursorFollower.className = 'pui-cursor-follower';
    document.body.appendChild(cursorGlow);
    document.body.appendChild(cursorFollower);
  }

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let glowCX = mouseX, glowCY = mouseY, follCX = mouseX, follCY = mouseY;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // 4. CUSTOM CURSOR RENDER LOOP
  function animateCursors() {
    glowCX += (mouseX - glowCX) * 0.1;
    glowCY += (mouseY - glowCY) * 0.1;
    cursorGlow.style.transform = `translate(${glowCX}px, ${glowCY}px)`;

    follCX += (mouseX - follCX) * 0.25;
    follCY += (mouseY - follCY) * 0.25;
    cursorFollower.style.transform = `translate(${follCX}px, ${follCY}px)`;

    requestAnimationFrame(animateCursors);
  }
  animateCursors();
  cursorFollower.style.opacity = '1';

  // 5. CURSOR HOVER STATES
  const interactiveEls = document.querySelectorAll('a, button, input, textarea, select, .pui-magnetic, .pui-glass-card');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursorFollower.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorFollower.classList.remove('active'));
  });

  // 6. MAGNETIC ELEMENTS
  document.querySelectorAll('.pui-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // 7. GLASSMORPHISM GLOW & 3D TILT
  document.querySelectorAll('.pui-glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      if (card.classList.contains('pui-tilt-card')) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('pui-tilt-card')) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
    });
  });

})();
