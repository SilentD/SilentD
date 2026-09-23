"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initializeCurrentYear();
  initializeNavigation();
  initializeTheme();
  initializeMobileNavigation();
});

function initializeCurrentYear() {
  const yearElement = document.getElementById("current-year");

  if (!yearElement) {
    return;
  }

  yearElement.textContent = new Date().getFullYear();
}

function initializeNavigation() {
  const navigationLinks = document.querySelectorAll(
    "#portfolioNavigation .nav-link",
  );

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navigationLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function initializeTheme() {
  const themeToggle = document.getElementById("themeToggle");

  const themeIcon = document.getElementById("themeIcon");

  if (!themeToggle || !themeIcon) {
    return;
  }

  const savedTheme = localStorage.getItem("portfolio-theme");

  const systemPrefersLight = window.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;

  const initialTheme = savedTheme || (systemPrefersLight ? "light" : "dark");

  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme || "dark";

    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    localStorage.setItem("portfolio-theme", nextTheme);
  });

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;

    const isLight = theme === "light";

    themeIcon.textContent = isLight ? "☾" : "☀";

    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme",
    );
  }
}
function initializeMobileNavigation() {
  const navigationCollapse = document.getElementById("portfolioNavigation");

  if (!navigationCollapse) {
    return;
  }

  const collapse = bootstrap.Collapse.getOrCreateInstance(navigationCollapse, {
    toggle: false,
  });

  function closeNavigation() {
    if (navigationCollapse.classList.contains("show")) {
      collapse.hide();
    }
  }

  /*
   * Close when clicking/touching outside
   * the navigation area.
   */
  document.addEventListener("pointerdown", (event) => {
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    if (!navigationCollapse.contains(target)) {
      closeNavigation();
    }
  });

  /*
   * Close when focus moves outside
   * the navigation area.
   */
  document.addEventListener("focusin", (event) => {
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    if (!navigationCollapse.contains(target)) {
      closeNavigation();
    }
  });

  /*
   * Close after selecting a navigation link.
   */
  const navigationLinks = navigationCollapse.querySelectorAll(".nav-link");

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeNavigation();
    });
  });
}
