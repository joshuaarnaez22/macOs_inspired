# Joshua Arnaez — macOS Desktop Portfolio

A macOS-style interactive desktop portfolio built with **Vite + React**. Zero UI library dependencies — pure React state, inline styles, and CSS keyframes.

## Live experience

- **Draggable windows** — grab any title bar to reposition; positions persist across refresh
- **macOS traffic lights** — red closes, yellow minimizes, green maximizes; large invisible hit-zones so they're easy to click
- **Spring animations** — `popIn` / `popOut` / `minOut` on open/close/minimize
- **Working menu bar** — , File, Edit, View, Window, Help are real click/hover dropdowns (open apps, switch wallpaper, reset desktop, etc.) + live clock, WiFi/battery icons
- **Right-click the desktop** — change the wallpaper (5 gradients); the choice persists
- **Interactive terminal** — type real commands, incl. an in-memory filesystem (`mkdir`/`touch`/`rm`/`tree`)
- **Finder** — filterable project grid (single filter across Favorites + Tags), collapsible sidebar, repo + live-site links
- **Dock** — SVG app icons, click to open/restore/focus, running-dot indicators, hover lift
- **Mobile layout** — below 768px the desktop is replaced by a phone-style home screen with full-screen apps
- **Persistence** — open windows, positions, focus order, and wallpaper are saved to `localStorage`

## Terminal commands

| Command | Output |
|---|---|
| `help` | list all commands |
| `whoami` | identity card |
| `ls` | app directory tree (+ files you created) |
| `skills` / `experience` / `education` / `projects` | CV sections |
| `open <app>` | open `terminal` / `projects` / `about` / `contact` |
| `mkdir <name>` / `touch <name>` / `rm <name>` / `tree` | in-memory filesystem |
| `date` · `echo <text>` · `pwd` · `uname` | shell basics |
| `git log` · `neofetch` | fake commit history / system info panel |
| `clear` | wipe history |
| `cat resume.pdf` | open CV in browser |
| ↑ / ↓ arrows | navigate command history |

## Stack

- **Vite 8** + **React 19** — no other runtime deps
- **Self-hosted fonts** — Inter + JetBrains Mono variable woff2 (latin subset) in `public/fonts/`, no third-party request
- All styling: inline style objects + a small `index.css` (global reset, `@font-face`, keyframes, `prefers-reduced-motion`)
- SEO: meta + Open Graph/Twitter tags, JSON-LD `Person`, `<noscript>` fallback, `public/og-image.png` (1200×630)

## Dev

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production build to dist/
npm run lint    # oxlint
```

## Structure

```
public/
  favicon.svg          # JA monogram
  og-image.png         # social share card (1200×630)
  fonts/               # self-hosted variable woff2 (Inter, JetBrains Mono)
src/
  data.js              # all static content (jobs, skills, projects, dock items, wallpapers)
  useWindowManager.js  # window state + drag + animation + localStorage persistence
  appIcons.jsx         # shared SVG app-icon map (Dock + Mobile)
  App.jsx              # shell — renders desktop, or <Mobile> below 768px
  index.css            # reset + @font-face + @keyframes + reduced-motion
  components/
    Window.jsx          # generic chrome (traffic lights + drag handle)
    MenuBar.jsx         # top bar with working dropdown menus
    Dock.jsx            # bottom dock
    Mobile.jsx          # phone home screen + full-screen apps
  windows/
    Terminal.jsx        # interactive zsh-style CV + command input + fs
    Projects.jsx        # Finder grid with filters + collapsible sidebar
    About.jsx           # TextEdit light window
    Contact.jsx         # dark contact card
```
