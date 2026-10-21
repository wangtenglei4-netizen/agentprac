# Campus Make Club — One-Page Site

**Purpose:** A static, single-page website for a student maker club to share meeting info, projects, and join instructions with classmates. Built as a learning exercise for coding-agent workflows.

**Prerequisites:** None. No Node.js, Python, or build tools required—just a static file server (Python 3 or `npx` included for convenience).

## Quick Start (Localhost Only)

### Option 1: Node.js (npx serve)
```bash
npx serve .
```
Then open the printed URL (e.g., `http://localhost:3000`).

### Option 2: Python 3
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

### Option 3: Any static server
Point any static file server at this directory. The entry point is `index.html`.

## Stop the Server
- **Python / npx serve:** Press `Ctrl+C` in the terminal where the server is running.
- **Background process:** If started via `&` or a process manager, run `pkill -f "http.server"` or `pkill -f "serve"`.

## Project Structure
```
.
├── index.html      # Semantic HTML — header, nav, main, 2 sections, footer
├── style.css       # Mobile-first CSS, theme via [data-theme], 700px breakpoint
├── script.js       # Theme toggle (localStorage + OS preference), no deps
├── AGENTS.md       # Hard constraints for agents/humans
├── .gitignore      # Excludes .env, node_modules/, .DS_Store
└── README.md       # This file
```

## Features
- **Responsive**: Single column < 700px, two-column card grid ≥ 700px.
- **Theme switch**: Button in header toggles light/dark, persists in `localStorage`, respects `prefers-color-scheme` until user chooses.
- **Keyboard accessible**: Skip link, visible focus rings, real `<button>`, `aria-pressed`, `aria-label`.
- **No dependencies**: Zero external requests, inline SVG icons, system fonts.

## Customize
1. Edit `index.html`: replace "Campus Make Club" with your club name, update meeting time/location, contact links.
2. Edit `style.css`: adjust `--accent` color in `:root` for brand color.
3. No build or deploy needed — just serve the folder.

## Verify (Human Check)
Open in a real browser at `http://localhost:XXXX` and confirm:
- [ ] Narrow and wide layouts render without horizontal scroll.
- [ ] Theme toggle works, choice survives reload.
- [ ] Tab-only navigation reaches every link/button; focus ring visible.
- [ ] Skip link jumps to main content.
- [ ] No console errors.
- [ ] Color contrast ≥ 4.5:1 in both themes (use DevTools or contrast tool).

## License
MIT — use freely for your club.