# Contributing to Design Atlas

Thank you for your interest in contributing to Design Atlas! 🎨

Design Atlas is an enterprise-grade catalog of **106 production-ready UI design systems**, rendered as pure CSS engines with zero build step requirements.

---

## 1. Zero-Build Architecture

- **No npm, package.json, or bundlers**: The site runs directly as static HTML + CSS + JS.
- **Fast local server**: Run `python serve.py` to start the local development server at `http://127.0.0.1:8912`.
- **Pre-compiled Tailwind**: Tailwind styles are pre-compiled in `css/tailwind-compiled-*.css` to eliminate runtime parsing overhead.

---

## 2. Standing Invariants (Important Rules)

1. **Additive only**: Never remove existing styles, components, or files.
2. **Derive counts**: Never hardcode the count of design styles. Always read from `STYLES_DATA.length`.
3. **Automated verification**: Every PR and commit must pass `node verify.js` with **0 failures**.
4. **Specificity rule**: Style engines in `css/styles.css` are `(0,2,0)`. Generic rules must stay at `≤ (0,1,0)` on identity properties.

---

## 3. Adding a New Design Style

Follow the standard 4-step recipe:

1. **Append to `js/data.js`**:
   Add a new object to `STYLES_DATA` with `id`, `name`, `category`, `cssClass: "style-<id>"`, `palette` (4 CSS colors), `vibe`, `vibeEn`, `bestFit`, `tags`, `audioTone`, `prompt`, `cssSnippet`, and `tailwindSnippet`.

2. **Add the CSS Engine to `css/styles.css`**:
   Append a numbered CSS block before the hover section:
   ```css
   /* 107. MY STYLE */
   .style-mystyle { background: ...; color: ...; }
   .style-mystyle .demo-box { ... }
   .style-mystyle .demo-btn { ... }
   .style-mystyle .demo-input { ... }
   ```

3. **Verify locally**:
   ```powershell
   node verify.js
   ```
   Ensure all checks report `ok` and exit with `0`.

4. **Submit a Pull Request**:
   Create a branch and open a PR against `main`. All CI checks will run automatically.
