/**
 * Campus Make Club — script.js
 * Theme toggle with localStorage persistence and OS preference fallback.
 * No dependencies.
 */

(function () {
  "use strict";

  const THEME_KEY = "cmc-theme";
  const TOGGLE_ID = "theme-toggle";
  const HTML = document.documentElement;

  /**
   * Get the initial theme: localStorage > OS preference > light.
   * @returns {"light" | "dark"}
   */
  function getInitialTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  /**
   * Apply theme to document and update toggle button.
   * @param {"light" | "dark"} theme
   */
  function applyTheme(theme) {
    HTML.setAttribute("data-theme", theme);
    const btn = document.getElementById(TOGGLE_ID);
    if (!btn) return;

    const isDark = theme === "dark";
    btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    btn.setAttribute("aria-pressed", String(isDark));
    btn.querySelector(".theme-text").textContent = isDark ? "Light" : "Dark";
  }

  /**
   * Toggle between light and dark, persist to localStorage.
   */
  function toggleTheme() {
    const current = HTML.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  /**
   * Initialize on DOM ready.
   */
  function init() {
    const theme = getInitialTheme();
    applyTheme(theme);

    const btn = document.getElementById(TOGGLE_ID);
    if (btn) {
      btn.addEventListener("click", toggleTheme);
    }

    // Sync with OS preference changes if user hasn't set a preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();