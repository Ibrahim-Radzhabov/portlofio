const nav = document.getElementById("siteNav");
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (nav && window.scrollY > 50) {
  nav.classList.add("is-scrolled");
}

window.addEventListener("scroll", () => {
  if (!nav) return;
  nav.classList.toggle("is-scrolled", window.scrollY > 50);
});

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", expanded ? "false" : "true");
    if (expanded) {
      mobileMenu.classList.remove("is-open");
      mobileMenu.hidden = true;
      document.body.classList.remove("menu-open");
    } else {
      mobileMenu.hidden = false;
      mobileMenu.classList.add("is-open");
      document.body.classList.add("menu-open");
    }
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("is-open");
      mobileMenu.hidden = true;
      document.body.classList.remove("menu-open");
    });
  });
}

const normalizePath = (value) => {
  const path = value.replace(/\/+$/, "");
  return path || "/";
};

const currentPath = normalizePath(window.location.pathname);

document.querySelectorAll(".nav-links a, .footer-nav a").forEach((link) => {
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#")) return;

  const url = new URL(href, window.location.origin);
  if (normalizePath(url.pathname) === currentPath) {
    link.classList.add("nav-active");
    link.setAttribute("aria-current", "page");
  }
});

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  const status = form.querySelector("[data-form-status]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      if (status) {
        status.textContent = "Заполните имя, email и описание задачи.";
      }
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      if (status) {
        status.textContent = "Введите корректный email.";
      }
      return;
    }

    if (status) {
      status.textContent = "Форма пока не подключена к отправке. Используйте hello@dalemcmanus.dev.";
    }
    form.reset();
  });
});
