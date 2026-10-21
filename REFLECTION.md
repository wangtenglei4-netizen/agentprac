# REFLECTION.md

## Model / Provider
- **Provider:** NVIDIA
- **Model:** Nemotron 3 Ultra Free (via OpenCode)

## One Useful Prompt
> "Help me plan a one-page website about a student club. Ask me at most three short questions about the audience, content, and look. Then propose a small plan. Explain each file you would create. Use only index.html, style.css, and script.js, with no dependencies or CDN. Include a heading, short introduction, two content sections, and one useful interaction, such as filtering project items or switching the color theme. The site must work at narrow and wide browser widths and with a keyboard. Keep all work inside this project. Serve only on localhost. Do not build yet, install packages, create accounts, or deploy anything."

This prompt set clear constraints (3 files, no deps, accessibility, responsive, keyboard) and forced a clarifying Q&A before any code, which kept scope tight and avoided rework.

## One Observed Tool Action
**Tool:** `write` (creating `script.js`)
**Observation:** The agent wrote the entire theme-toggle IIFE in one call—handling `localStorage` persistence, OS `prefers-color-scheme` fallback, `aria-label`/`aria-pressed` updates, and the `matchMedia` change listener—without needing iterative fixes. The strict-mode IIFE pattern and zero globals matched the AGENTS.md constraints on the first pass.

## One Issue / Improvement Checked Before and After a Change
**Issue:** The theme-toggle button used only an icon (inline SVG via CSS `background-image`) with no visible text label in the HTML, risking an inaccessible control for screen-reader users.

**Before (initial draft):** Button contained only `<span class="theme-icon" aria-hidden="true"></span>`.

**After (fixed in final `index.html` + `style.css` + `script.js`):**
- Added a second `<span class="theme-text">Dark</span>` inside the button so visible text exists.
- `script.js` now updates `.theme-text` content ("Dark" ↔ "Light") on every toggle.
- `aria-label` is also updated dynamically ("Switch to light theme" / "Switch to dark theme").
- CSS hides the icon via `aria-hidden="true"` but keeps the text readable.

**Verification:** Tab-to-button announces "Switch to dark theme, button, pressed false" (light mode) and "Switch to light theme, button, pressed true" (dark mode) in VoiceOver/NVDA.

## How the Interaction Works
**Theme Switch (Light ↔ Dark)**
1. On load, `script.js` reads `localStorage.getItem("cmc-theme")`. If absent, it checks `window.matchMedia("(prefers-color-scheme: dark)")`. Default = "light".
2. The resolved theme is applied by setting `document.documentElement.setAttribute("data-theme", theme)`.
3. CSS custom properties (`--bg`, `--fg`, `--accent`, etc.) defined under `:root` (light) and `[data-theme="dark"]` drive all colors—no inline styles.
4. User clicks the header button → `toggleTheme()` flips the value, writes to `localStorage`, calls `applyTheme()`, which:
   - Updates `data-theme` on `<html>`
   - Sets `aria-pressed="true|false"`
   - Swaps `aria-label`
   - Changes visible button text ("Dark" ↔ "Light")
5. A `matchMedia` change listener auto-switches if the user clears storage or never chose—respecting explicit user choice first.

No external requests, no frameworks, ~40 lines of JS. Works at any viewport, keyboard-operable, persists across reloads.