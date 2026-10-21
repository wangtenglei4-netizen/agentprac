# AGENTS.md — Project Constraints for Campus Make Club Site

This document records the hard constraints agreed upon for this project.
Any agent or human working on this repo must follow these rules.

## Scope
- Single-page student club site for classmates/club members.
- Topic: Campus Make Club (placeholder — replace with real club name).
- Sections: Intro, Meetings & Projects, How to Join.
- Interaction: Theme switch (light/dark) with localStorage persistence.

## Tech Stack (No Exceptions)
- **Files only**: `index.html`, `style.css`, `script.js`
- **No dependencies**: no npm, no CDN, no frameworks, no build step.
- **No external assets**: icons via inline SVG data URIs, fonts via `system-ui`.
- **Serve only on localhost** (e.g., `npx serve`, `python -m http.server`).

## HTML Requirements
- Semantic elements: `header`, `nav`, `main`, `section`, `footer`, `ul/li`, `a`, `button`.
- One `<h1>` (club name), two `<h2>` (section headings), proper heading order.
- Skip link as first focusable element.
- Theme toggle is a real `<button type="button">` with `aria-label` and `aria-pressed`.
- All links/buttons keyboard-operable; visible `:focus-visible` styles.

## CSS Requirements
- Mobile-first, fluid layout.
- Breakpoint at `700px` (two-column card grid, wider header/main padding).
- Theming via `[data-theme="light|dark"]` on `<html>`; all colors via CSS custom properties.
- No `!important` except reduced-motion/high-contrast media queries.
- `prefers-reduced-motion: reduce` disables transitions/animations.
- `prefers-contrast: high` strengthens borders and focus rings.
- Fluid type via `rem`; no horizontal scroll at any width.

## JavaScript Requirements
- Single IIFE, strict mode, no globals except `THEME_KEY` constant.
- Theme resolution order: `localStorage` → `prefers-color-scheme` → `light`.
- Persist user choice to `localStorage` on toggle.
- Listen for OS preference changes; auto-switch only if no user choice stored.
- Update button `aria-label`, `aria-pressed`, and visible text on change.
- No other behavior (no filtering, no accordions, no fetch).

## Accessibility (WCAG 2.1 AA Target)
- Color contrast ≥ 4.5:1 in both themes (verify with tool).
- Focus indicator visible and ≥ 2px solid (implemented via `box-shadow`).
- Skip link functional.
- All interactive elements reachable and operable by keyboard alone.
- `aria-label` on icon-only button; `aria-pressed` reflects state.
- `rel="noopener"` on external links.

## Version Control
- Do not commit, push, or create PRs unless explicitly asked.
- `.gitignore` must exclude `.env`, `node_modules/`, `.DS_Store`.

## Out of Scope
- Content management, CMS, forms, backend, analytics, deploy configs.
- Additional pages, blog, events calendar, member directory.
- Image assets, web fonts, favicon, PWA manifest.
- Unit tests, linting, CI/CD.

## Human Verification Required (Agent Cannot Do)
- Open `index.html` in a real browser at `http://localhost:XXXX`.
- Verify: narrow/wide layouts, theme toggle persists across reload, keyboard-only navigation, focus styles visible, skip link works, no console errors.
- Check color contrast in both themes with a contrast analyzer.
- Test with screen reader (VoiceOver/NVDA) if possible.