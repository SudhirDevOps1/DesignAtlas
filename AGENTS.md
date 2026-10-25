# AGENTS.md

Zero-build static site: 6 HTML pages + `css/` + `js/`. No `package.json`, no git, no bundler, no linter, no test runner. Do not hunt for npm scripts or CI — there are none.

## Run

```powershell
cd D:\designalts
python -m http.server 8912 --bind 127.0.0.1
```

Serve over HTTP. `file://` breaks clipboard copy and some loaders.

## Verify — run `node verify.js` after every change

`verify.js` is a **zero-dependency suite, 108 checks, exit code 1 on failure**. It is the only automated test in the repo, and it covers exactly the invariants that have already bitten this project:

- syntax of every `js/*.js` **and** of the 12 inline `<script>` blocks in the HTML — `node --check` never sees the inline ones, which is where the real breakage hides
- data integrity: unique ids, required fields, 4-colour palettes, `cssClass === style-<id>`
- **`css/styles.css` and `js/data.js` staying in sync in both directions** (103 engines ↔ 103 records, no orphans either way). It strips CSS comments first, because `styles.css` documents itself with a `.style-x` placeholder that a naive scan counts as a 104th engine.
- `buildDetailedPrompt()` returns a ≥3000 char brief for all 103 styles, with the expected section markers, and never throws; it also guards that the universal brief is **stack-agnostic** (STACK ADAPTATION / ACCEPTANCE CHECKLIST / PROTECTION present, no HTML-only deliverable), that `{stack:'react'}` narrows it, that the contrast advice always resolves ('WCAG AA pass' or a `--color-ink-strong` fallback), and that ROLE carries the detect-or-ask `[project]` rule
- wiring: no orphan `js/*.js`, no dead `<script src>`/`<link href>`
- load order, CSP meta and service-worker wiring on all 6 pages
- `window.STYLES_DATA` never reappearing in HTML or in any js source

It mutates nothing. If you add a file, extend the wiring checks.

Low-level equivalent: `node --check js\*.js` (18 files). Inline blocks need a separate parse — a re-runnable checker lives at `C:\Users\NATIONAL COMPUTER\AppData\Local\Temp\opencode\check-inline.js`.

**Browser:** read the console after loading a page. All 6 pages should be at **0 errors** (1 known warning: the Tailwind production notice — see below, it is not a defect).

**Structural bar that `verify.js` cannot reach** (needs a DOM): every one of the **103 styles must open** and render 8 sections + footer + hero + 4 visible table rows + 5 pagination buttons + a prompt of ≥3000 chars.

## Tailwind is self-hosted, not the CDN

`js/tailwind-browser.js` (398 KB) is a **byte-identical local copy of the Play CDN bundle**, checked in on purpose so the site makes zero third-party requests and works offline.

- It still compiles utilities at runtime by scanning the DOM, so it must stay in `<head>` **before** the markup it styles.
- It makes **no runtime network calls at all** — no `fetch`, no `XMLHttpRequest`, no `document.currentScript`, no `importScripts` — so serving it from the repo is behaviour-identical. That is also why it can be moved or renamed safely.
- It logs `cdn.tailwindcss.com should not be used in production...` once per page. That is a `console.warn` baked into the vendor bundle, **not a real defect — do not chase it.**
- The preflight still ships `* { padding: 0 }`. Button/input sizing therefore still must be declared explicitly in `features.css` — nothing is inherited.
- `favorites.js` and `token-exporter.js` emit HTML pointing at `https://cdn.tailwindcss.com` **on purpose**: an exported standalone file must not depend on a file that only exists in this repo.

## Content Security Policy

Every page has a `<meta http-equiv="Content-Security-Policy">` on **line 6**, before everything it governs:

```
default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self';
script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:;
connect-src 'self'; manifest-src 'self'; worker-src 'self'
```

- `'unsafe-inline'` in `script-src` is **load-bearing**: `index.html` carries ~31 inline `onclick=` handlers and all 6 pages have inline scripts. Nonces are impossible here because the server is `python -m http.server` and cannot inject per-response tokens. Removing `'unsafe-inline'` blanks the site.
- No `'unsafe-eval'`, and none is needed — neither the Tailwind bundle nor anything in `js/` uses `eval`/`new Function`.
- `frame-ancestors`, `report-uri` and `sandbox` are deliberately **absent**: browsers ignore them when delivered via `<meta>` *and log a console warning*, which would break the zero-error bar.
- Verified to genuinely enforce: injecting an external `<script>` or `<img>` is blocked in the console.

## Service worker — this is why CSS stays fresh

`sw.js` + `js/sw-register.js`, wired on all 6 pages immediately after `util.js`.

The repo is served by `python -m http.server`, which sends **no `Cache-Control`**, so the browser heuristic-caches `css/`/`js/` and can hand back stale assets after an edit. The worker fixes it properly:

- every same-origin GET is answered **network-first** via `fetch(req, { cache: 'no-cache' })` — a conditional request, so unchanged files come back as cheap 304s and changed files are always fresh
- the response is cached and used **only** when the network fails (offline, server down)
- navigations that fail outright fall back to `index.html` instead of the browser error page
- cross-origin requests (Google Fonts) are not intercepted at all

When touching it:

- bump `VERSION` in `sw.js` to hard-drop every cached copy
- there is deliberately **no `skipWaiting()`** — a new worker waits for the next navigation so assets never swap out under a running page
- registration is triple-guarded (no navigator / no API / non-http protocol) and swallows failures; the site must behave identically with the worker absent

## Generated artwork (palette → offline SVG)

All imagery is generated at runtime from each style's palette — **no image files, no network requests**. The generators live in `js/demo-showcase.js`, exposed on `window.DemoShowcase`:

- `makeArt(style, variant, label)` returns a **`data:image/svg+xml` URI**, safe for `<img src>`. Variants: `'avatar'` (96px initials), `'tile'` (640×480), `'band'` (800×240, text-free — added for the gallery cards), and the default hero/poster.
- `tile`/`band`/`hero` render through **`COMPOSITIONS`** — a library of 12 distinct abstract layouts (mountains, halftone, rings, ribbons, arches, blobs, horizon, circuit, confetti, hills, sunburst, nested frames). `composeArt()` picks one from a seed of `style.id | variant | label`, so output is **deterministic** (never flickers between renders) yet unique per item — 89 distinct shape signatures across 456 sample images.
- **The seed must include the label.** It once didn't, so all six demo gallery tiles — which share one style and therefore one palette — were byte-identical and the whole gallery read as a placeholder. If you add another art call site, pass a distinct label or you will reintroduce this.
- `hero` outlines its label text (`paint-order="stroke"`, opposite luminance) because the composition behind it is now unpredictable.
- `logoMark(style)` returns **inline `<svg>` markup, NOT a data URI** (a `style.logoSvg` record field overrides it, also inline markup). Inject it into the DOM directly — putting it in `<img src>` will not work.
- Gallery card action buttons use the **37-symbol icon sprite** (`icon('settings'|'layers'|'zap'|'download'|'copy')`) rather than emoji. The sprite lives only in `index.html`, so these calls are index-only.

Consumers in `index.html`: `cardArtMarkup()` puts an artwork band **above** each gallery card's live-CSS preview (the preview is never removed); `dashLogoMarkup()` / `dashAvatarMarkup()` fill the dashboard's brand slot (`.dash-logo-slot`, sized in `features.css`) and avatar.

**Both are guarded on purpose.** If `window.DemoShowcase` is unavailable, `cardArtMarkup()` emits nothing (card unchanged) and the dashboard falls back to its original `◈` / `JD` marks. Verified by deleting `window.DemoShowcase` and re-rendering: 103 cards, 0 bands, 0 errors. `verify.js` cannot check this — it has no DOM.

`generateDashboardHTML()` is only reachable via the **📊 Dashboard** button in the showcase chrome; a plain card click routes to the full-screen showcase, so the dashboard is a fallback surface.

## Showcase comfort layer (day/night preview + press feedback)

The showcase stage is fully interactive: `demo-showcase.js` delegates on `#showcase-stage` — dropdowns (`data-demo-dropdown-toggle`), tabs (`.demo-tab`), table sort (`.demo-th-sort`), pagination, modals, toasts, form validation. Every `data-demo-action` button is hooked.

- **Day/Night preview**: chrome button `data-showcase-action="night"` (or keyboard **N**) toggles `.showcase-canvas.da-night`, which applies `filter: invert(1) hue-rotate(160deg)` to the entire demo canvas — a computational night look for all **103** engines (hand-writing a dark variant per engine is impractical; invert keeps contrast pairs equivalent). Dark styles (cyberpunk, darkluxe, sportgrid…) get their "day look" the same way. Preference persists in localStorage key **`daShowcaseNight`** via `safeLS`; `open()` calls `restoreNight()` silently on every reopen.
- **No transition on the night filter, on purpose**: headless/hidden tabs throttle rAF, which parks a CSS transition at its start value (`invert(0)`) forever and makes computed-style verification lie. Instant apply is deterministic for users and tests.
- **Plain-button fallback**: a `.demo-btn` with no hook gets the `da-pressed` pulse animation + a toast in `onStageClick`'s `if (!el)` path — hooked buttons return earlier, so feedback never double-fires.
- `verify.js` guards the wiring (night chrome button, invert rule, `toggleNight`/`restoreNight()` in demo-showcase).

## Load order is law

**CSS** — `styles.css` → `features.css` → `monolith-shell.css` (`index.html` lines **95 / 97 / 99**). Never reorder. Equal-specificity ties go to source order, and `features.css` is deliberately *after* the 103 style engines so its generic rules win ties.

Only `index.html` links all three; `compare`/`playground`/`prompt-builder`/`tokens`/`uikit` link **only** `styles.css`. That is intentional — do not "complete" the cascade on those pages.

**JS** — `js/data.js` first, `js/util.js` second, `js/sw-register.js` third, on **every** page (all 6 load all three, exactly once). `util.js` holds the shared globals: `escapeHTML`, `escapeJSString`, `copyText`, `icon`, `safeLS`, `clampNumber`, `buildDetailedPrompt`, `copyStylePrompt`. New shared helpers go in `util.js`, not in a page script — and **add them to `module.exports` too**, so Node consumers (including `verify.js`) can reach them. `copyStylePrompt` was defined but left out of the exports once; `verify.js` now guards that.

## Specificity convention (broken once already)

Style engines are 103 blocks in `css/styles.css` named `.style-<id>`, so any engine rule is **(0,2,0)** — e.g. `.style-brutalism .demo-btn`.

- Generic rule must **lose** to the engine (identity props: `font-size`, `border-radius`, `color`, `border`, `font-family`) → stay at **≤ (0,1,0)**. That is exactly why the hero size class is `.demo-btn-lg` (one class) and not `.demo-page .demo-hero-cta .demo-btn`.
- Generic rule only sets props engines **never** set (`padding`, `min-height`, `width`) → any specificity is safe.
- **Never** reach (0,3,0) on a visual identity prop: it silently flattens brutalism's square corners, pixel's 1.1rem type, editorial's 0.75rem caps.

## Globals and other traps

- `STYLES_DATA` is a top-level `const` → **`window.STYLES_DATA` is `undefined`.** Use the bare identifier; never assign it to `window`.
- Palettes hold **CSS colours, not strictly hex** — 5 glass/spatial styles legitimately carry `rgba(...)` entries. Do not "normalise" them to hex; translucency is the point.
- `index.html` has three native `<dialog>`s: `#showcase-dialog` = full-screen live demo (opens on card click), `#style-modal` = dashboard, `#shortcuts-dialog`. Use `.showModal()` / `.close()`.
- The **37-symbol icon sprite exists only in `index.html`**. `icon()` is called solely from `demo-showcase.js` and `util.js`, both index-only. Using `icon()` on another page requires copying that sprite there too.
- Before the service worker was added, a CSS edit needed a manual `?cb=` bust. The worker now handles it, and `link.href = 'css/features.css?cb=' + Date.now()` still works as the fallback for `file://` or when no worker is registered.
- `browser.evaluate` returns `{}` for very large scripts — keep them small and split them. `setTimeout` is unavailable in `execute` code. `browser.console` returns `messages` (not `entries`).
- `browser.screenshot`/`browser.hover` fail with "needs a visible tab". Emulate narrow viewports with an iframe instead; there is no viewport-resize tool.

## Structure

- `js/data.js` — 103 style records: `prompt`, `palette`, `cssSnippet`, `tailwindSnippet`, `logoSvg`, … single source of truth. Records may carry a `vibeEn` English gloss; the copied spec prefers it while the site keeps showing the Hinglish `vibe`.
- `js/util.js` — shared helpers + the shared globals, Node-requireable, exported.
- `js/tailwind-browser.js` — vendored Tailwind bundle (398 KB). Vendor code; do not hand-edit.
- `js/sw-register.js` + `sw.js` — service worker and its registration.
- `README.md` — human-facing docs: feature tour, architecture map, style-adding recipe, verification bar.
- `verify.js` — the test suite. Run it from the repo root.
- `css/styles.css` — the 103 `.style-*` engines (numbered comments 1–103) + a per-style hover / reduced-motion block at the end. New engines go between the last engine and that block.
- `css/features.css` — shared `.demo-*` components, the universal hover + focus layer, docs CSS.
- Page JS maps to pages: `compare.js`→`compare.html`, `playground.js`→`playground.html`, `quiz.js`/`favorites.js`/`demo-showcase.js`→`index.html`, etc. `demo-showcase.js` builds the entire demo page into `#showcase-stage`.
- **`Design Atlas — Interactive UI Design Styles & AI Prompt Gallery.htm` and its `_files/` folder are a stray browser "Save Page As" snapshot, not source.** Nothing links to it. Do not edit, delete, or treat it as a page.

## Project constraints

- **Additive only.** Standing requirement: never remove existing code or content. A file that looks dead gets wired in with a `<script>`/`<link>` tag, not deleted. (Vendoring a dependency in place of its CDN URL is the one sanctioned exception, and the original URL is preserved in a comment.)
- **Derive counts, never hardcode them.** The style count (currently **103**) appears only in comments and SEO copy; every UI count reads `STYLES_DATA.length`. This was a real bug once — keep it fixed.
- Prompts are built by `buildDetailedPrompt(style, opts)` — **stack-agnostic by default**: 14 English sections (ROLE → SCOPE & PROTECTION → ART DIRECTION → AUTHENTIC CSS/Tailwind fences → tokens → LAYOUT & RESPONSIVE → COMPONENTS → STATE MATRIX → MOTION → ACCESSIBILITY → STACK ADAPTATION → ACCEPTANCE CHECKLIST → DELIVERABLE), so one copied brief installs the design into *any* project (React/Next/Vue/Svelte/Astro/Tailwind/HTML/native). `opts.stack` (`html|tailwind|next|react|css-in-js|vue|svelte|astro|shadcn|mui|react-native|flutter`) narrows the doc to that stack's mapping; `opts.scope:'build'` + `stack:'html'` reproduces the old single-HTML deliverable; `opts.project` replaces the `[project]` placeholder. Copied through `copyStylePrompt(styleId, event, opts)` on every page. Pass a **style id**; never embed prompt text in an HTML `onclick` attribute (quotes/newlines break it).
