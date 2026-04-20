const homeHero = document.querySelector(".home-hero");

if (homeHero && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  window.addEventListener("scroll", () => {
    const shift = Math.min(window.scrollY * 0.08, 28);
    homeHero.style.transform = `translateY(${shift * -0.15}px)`;
  }, { passive: true });
}
