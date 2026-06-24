# macOS Desktop Portfolio — Claude Context

## What this project is

A fake macOS desktop rendered entirely in the browser. The portfolio belongs to **Joshua Arnaez** (joshuaarnaez22@gmail.com) — a full-stack / AI engineer based in Bacolod City, Philippines.

## Tech

- **Vite 8 + React 19** — no CSS framework, no UI library, no router
- Zero runtime dependencies beyond React itself
- Fonts: Inter + JetBrains Mono via Google Fonts

## Key files

| File | Purpose |
|---|---|
| `src/data.js` | All static content: jobs, skills, education, projects, dock items, `WALLPAPERS`. Edit content here. Projects carry optional `featured` + `live` fields. |
| `src/useWindowManager.js` | Single hook that owns all window state (open/min/max/x/y/z/animIn/animOut/animMin), drag logic, clock, bouncing set, **and localStorage persistence** (`STORAGE_KEY = 'desktop-state-v1'`). |
| `src/App.jsx` | Shell. **Renders `<Mobile>` below 768px (reactive to resize); desktop otherwise.** Owns wallpaper state (persisted to `localStorage` `desktop-wallpaper`) + the right-click wallpaper context menu. |
| `src/components/Mobile.jsx` | Phone layout (<768px): home screen (avatar header + 4-col app icon grid) → tap opens an app full-screen with a `‹ Home` bar. Reuses the same window content components. |
| `src/appIcons.jsx` | Shared SVG app icon map (`ICONS`), keyed by dock id / external label. Used by both Dock and Mobile. |
| `src/index.css` | Global reset + @keyframes (blink, bounce, popIn, popOut, minOut) + traffic-light `.tl` styles incl. the invisible `::after` hit-zone. |
| `src/components/Window.jsx` | Generic window chrome: traffic lights with group-hover (×/−/+) + 24px hit-zone, inactive-gray state, drag handle, title. |
| `src/components/MenuBar.jsx` | Top bar. **, File, Edit, View, Window, Help are working click/hover dropdowns** (built from `actions` passed by App). SVG WiFi/battery, live clock. |
| `src/components/Dock.jsx` | Bottom dock with app tiles (SVG icons from `appIcons`), running-dot indicators, separator, GitHub + Resume external links. |
| `src/windows/Terminal.jsx` | Static CV output + interactive prompt (history, ↑/↓ nav). Includes an **in-memory filesystem** (`mkdir`/`touch`/`rm`/`tree`, reflected in `ls`) held in component state. |
| `src/windows/Projects.jsx` | Finder window. Single shared filter (`sel`, e.g. `view:github` / `tag:AI`) across Favorites + Tags. Cards link to repo or live site; green dot = has live URL. |
| `src/windows/About.jsx` | Light TextEdit window with bio paragraphs. |
| `src/windows/Contact.jsx` | Dark contact card with clickable rows (email, phone, GitHub, LinkedIn). |

## Window manager state shape

```js
wins[id] = {
  open: bool,    // is the window in the DOM as visible
  min: bool,     // minimized (hidden, dock dot stays)
  max: bool,     // maximized to near-fullscreen
  x: number,     // left offset in window layer (px)
  y: number,     // top offset in window layer (px)
  z: number,     // z-index (incremented on focus)
  animIn: bool,  // playing popIn spring animation
  animOut: bool, // playing popOut animation before open→false
  animMin: bool, // playing minOut animation before min→true
}
```

## Animations

All window animations are pure CSS keyframes triggered via inline `style.animation`:

- **popIn** `0.34s cubic-bezier(0.34,1.56,0.64,1)` — scale 0.84→1 + translateY 10→0 + opacity 0→1 (spring overshoot)
- **popOut** `0.22s ease-in` — scale 1→0.84 + opacity 1→0
- **minOut** `0.24s ease-in` — scale 1→0.45 + translateY +80px + opacity 1→0

Dock tiles use `@keyframes bounce` for 700ms when an app opens.

## Traffic light rules

- Inactive window (not focused): all three dots are `#4d4d4d`
- Active window: red `#ff5f57`, yellow `#febc2e`, green `#28c840`
- Hover over `.tl-group`: `.tl-symbol` (×, −, +) fade in via CSS `.tl-group:hover .tl-symbol { opacity: 1 }`

## Adding a new command to the Terminal

In `src/windows/Terminal.jsx`, add a case in the `runCommand` switch:

```js
case 'mycommand': return { output: 'hello' };
// or JSX:
case 'mycommand': return { output: <MyComponent /> };
// or clear:
case 'clear': return { clear: true };
// with a side effect:
case 'mycommand': return { output: 'done', side: () => doSomething() };
```

## Adding a new dock app

1. Add entry to `DOCK_ITEMS` in `src/data.js`
2. Create `src/windows/MyWindow.jsx`
3. Add the window to `App.jsx` (import + `<Window>` in the window layer)
4. Add initial state in `useWindowManager.js` `INITIAL` object
5. Add to `WIN_DIMS` in `data.js`
6. Add to `WIN_TITLES` in `data.js`
7. Add an SVG icon under the matching key in `src/appIcons.jsx` (`ICONS`)
8. Register the component in the `APPS` map in `src/components/Mobile.jsx` so it opens on phones

> Note: bumping the persisted state shape? Change `STORAGE_KEY` in `useWindowManager.js` so old saved layouts don't break new windows.

## Mobile

Below 768px `App` returns `<Mobile>` instead of the desktop (the `isMobile` check is reactive to `resize`). The phone layout reuses the four window content components full-screen; there are no draggable windows, dock, or menu bar on mobile.

## SEO / head / a11y

- `index.html` holds all meta: description, OG/Twitter tags, JSON-LD `Person`, theme-color, and a `<noscript>` block (name/role/contact) since the app is JS-rendered.
- OG/Twitter card image is `public/og-image.png` (1200×630, rasterized from `/tmp/og.svg` via `rsvg-convert`). **TODO:** once the production domain is final, make `og:image`/`twitter:image` **absolute** URLs and add `og:url` — social scrapers require absolute image URLs.
- **Fonts are self-hosted** variable woff2 in `public/fonts/` (Inter + JetBrains Mono, latin subset), declared via `@font-face` in `index.css` and `<link rel=preload>`ed in `index.html`. No third-party font request. To add weights/subsets, re-pull from the Google Fonts css2 endpoint with a modern-browser UA.
- `index.css` has a `prefers-reduced-motion` block that neutralizes all animations/transitions.
- Icon-only controls (traffic lights, dock tiles, mobile home icons) carry `aria-label`s.

## Dev commands

```bash
npm run dev    # start dev server
npm run build  # production build
npm run lint   # oxlint
```
