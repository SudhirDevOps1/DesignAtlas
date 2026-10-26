# Design Atlas

**Interactive UI Design Styles & AI Prompt Gallery** — a zero-build static site that catalogs **103 real-world UI design languages**, renders every one as a **live, full-page, interactive demo** (pure CSS engines — no images, no build step), and generates a **stack-agnostic AI prompt** you can copy straight into any IDE.

Live locally: `python serve.py` → **http://127.0.0.1:8912** (keep-alive + gzip + ETag 304s; ~10× faster than the stdlib fallback `python -m http.server 8912`).

---

## Feature tour

| View | What it does |
|---|---|
| **Gallery** (`#/gallery`) | 103 filterable, searchable style cards with live-CSS previews + runtime-generated artwork. Counts everywhere derive from `STYLES_DATA.length`. |
| **Versus** (`#/compare`) | Side-by-side style comparison with audio demo per style. |
| **Playground** (`#/playground`) | Tweak any style's components live. |
| **Prompt Studio** (`#/prompt-builder`) | Build a custom design brief for any style. |
| **Timeline** (`#/timeline`), **Shadow Lab** (`#/shadow-lab`), **Style Quiz** (`#/quiz`) | History view, shadow playground, guessing game. |
| **UI Kit** (`uikit.html`), **Tokens** (`tokens.html`) | Reference pages for shared components and token vocabulary. |

### The showcase (click any card)

Every style opens into a **full-page demo of a fake product website** rebuilt by that style's CSS engine — with a browser-like chrome bar:

- **Back to Gallery** button, prev/next style (←/→), positional count `#n of 103`
- **Day/Night preview** — chrome button or keyboard **N** flips `.da-night`, an `invert(1) hue-rotate(160deg)` filter over the whole canvas. One computational night look covers all 103 engines; contrast pairs survive inversion. Persisted in `localStorage` key `daShowcaseNight`.
- **Fully interactive demos** — dropdowns, tabs, table sorting, pagination, modals, toasts, form validation all work inside the demo; any unhooked button still gives press-pulse + toast feedback.
- **Copy Prompt** (≥3000-char English spec, stack-agnostic — see below), **HTML boilerplate download**, print, fullscreen (**F**).

### Other production-grade behaviours

- **Brand Harmonizer** — recolors every demo accent to a chosen brand hue at runtime, derived from the live style count.
- **App Skin cycler** — morphs the site shell itself (Standard / Monolith / Glass / Cyberpunk).
- **Hash routing + browser Back/Forward**, recently-viewed strip, favorites, keyboard shortcuts (**?** shows the dialog), zero-network icon sprite, tactile Web-Audio UI sounds.

---

## The AI prompt system

`buildDetailedPrompt(style, opts)` in `js/util.js` produces a **14-section English spec** (ROLE → SCOPE & PROTECTION → ART DIRECTION → HTML/Tailwind fences → tokens → LAYOUT → COMPONENTS → STATE MATRIX → MOTION → ACCESSIBILITY → STACK ADAPTATION → ACCEPTANCE CHECKLIST → DELIVERABLE).

- **Stack-agnostic by default**: one copied brief installs the style into any project (React/Next/Vue/Svelte/Astro/Tailwind/plain HTML/React Native/Flutter). `opts.stack` narrows it to one stack's mapping.
- Contrast-safe: every spec's ink/surface pair is measured; if it can't pass WCAG, the spec resolves a fallback (`--color-ink-strong`) instead of shipping an unreadable pairing.
- Copy it with `copyStylePrompt(styleId, event, opts)` — pass a **style id**, never inline prompt text into `onclick` attributes (quotes break it).

---

## Architecture

```
index.html            gallery + showcase chrome + icon sprite + inline app JS
compare|playground|prompt-builder|tokens|uikit.html   focused pages (styles.css + shell-v2.css)
css/styles.css        the 103 .style-* engines (numbered comments) + comfort layer
css/features.css      shared .demo-* components, generic hover/focus layer, icon system
css/monolith-shell.css  app-skin variants
css/shell-v2.css      chrome design layer: header/hero/cards (index) + sub-page
                      headers, ghost sub-nav, plates; carries the .icon base
                      for pages that don't load features.css
js/data.js            single source of truth: 103 style records (id, name, category,
                      palette ×4, prompt, cssSnippet, tailwindSnippet, vibe/vibeEn, tags…)
js/util.js            shared globals + buildDetailedPrompt (Node-requireable, exported)
js/icon-sprite.js     shared icon-sprite injector for the 5 sub-pages (extracted
                      verbatim from index.html; verify.js guards the 37-symbol sync)
js/demo-showcase.js   builds the whole showcase demo + interactivity + night preview
sw.js + js/sw-register.js   network-first service worker (fresh CSS/JS after every edit)
verify.js             zero-dependency test suite (122 checks, exit 1 on failure)
```

**Load order is law** — CSS: `styles.css` → `features.css` → `monolith-shell.css` → `shell-v2.css`. JS: `data.js` → `util.js` → `sw-register.js` → `icon-sprite.js` → page scripts. Specificity: engines are (0,2,0); generic rules never exceed (0,1,0) on identity props.

**Constraints as standing invariants**

- **Additive only** — never remove code/content; wire dead files in instead.
- **Derive counts, never hardcode them** — every UI count reads `STYLES_DATA.length`.
- **CSP is enforced via `<meta>`** with `'unsafe-inline'` scripts (static server can't inject nonces); no external requests — Tailwind is **pre-compiled per page** (`css/tailwind-compiled-*.css`, harvested verbatim from the vendored `js/tailwind-browser.js` runtime), all imagery is runtime SVG, icons come from a 37-symbol inline sprite.
- Full agent-facing operational details: **[AGENTS.md](AGENTS.md)**.

---

## Adding a style (the standard recipe)

1. Append a record to `js/data.js`: `id`, `name`, `category`, `cssClass: "style-<id>"`, 4-colour `palette`, `prompt`, `vibe` (+ optional `vibeEn` English gloss), `bestFit`, `tags`, `audioTone`, `cssSnippet`, `tailwindSnippet`.
2. Append a numbered CSS engine in `css/styles.css` **between the last engine and the per-style hover block**: root (`background`, `color`, optional `font-family`), `.demo-box`, `.demo-btn` (+ hover), `.demo-input`. Never above (0,3,0) on identity props.
3. If the category is new, add art-direction notes to `DA_PROMPT_CATEGORY_NOTES` in `js/util.js`.
4. `node verify.js` → ALL GREEN, then browser-check the new style opens in the showcase.

## Verification

```
node verify.js      # 122 checks: syntax, data integrity, CSS↔data sync, prompts,
                    # wiring, load order, CSP, service worker, comfort layer
```

Browser bar: **0 console errors** on all 6 pages (the old vendor production warning is gone with the static compiled CSS); every style opens with 8+ sections, live buttons, and a ≥3000-char prompt.

## Tech

No package manager, no bundler, no framework — HTML + vanilla JS + hand-written CSS engines + Tailwind pre-compiled per page (the vendored runtime bundle stays in-repo as the regeneration source). Serve over HTTP (the service worker requires it; `file://` breaks clipboard), preferably with `python serve.py`.

---

<!-- pair badge trigger -->

<!-- Co-authored with adrianak2026 -->
