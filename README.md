<div align="center">

# 🌌 Design Atlas
### The Definitive UI Design System & AI Prompt Catalog

[![CI Verification](https://github.com/SudhirDevOps1/DesignAtlas/actions/workflows/ci.yml/badge.svg)](https://github.com/SudhirDevOps1/DesignAtlas/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Build](https://img.shields.io/badge/Architecture-Zero--Build-emerald.svg)](#architecture)
[![Styles](https://img.shields.io/badge/Catalog-106%20UI%20Languages-indigo.svg)](#the-design-catalog)
[![Tests](https://img.shields.io/badge/Verify-139%2F139%20Passing-success.svg)](verify.js)
[![Website](https://img.shields.io/badge/Live-GitHub%20Pages-sky.svg)](https://sudhirdevops1.github.io/DesignAtlas/)

<p align="center">
  A production-grade, zero-build catalog of <b>106 real-world UI design languages</b>. Every design style is rendered through a <b>pure CSS engine</b> (no images, no client-side runtime build step), accompanied by full-page interactive product demos and <b>stack-agnostic, production-grade AI prompt specifications</b> (10,000+ characters) ready to drop into any modern IDE or LLM agent.
</p>

[**🌐 Explore Live Storefront**](https://sudhirdevops1.github.io/DesignAtlas/) • [**📖 Architecture**](#architecture) • [**🤖 AI Prompt Spec**](#the-ai-prompt-system) • [**🛠️ Contributing**](CONTRIBUTING.md)

</div>

---

## ⚡ Quick Start

### Local Development (Fast Server)

```powershell
# Clone the repository
git clone https://github.com/SudhirDevOps1/DesignAtlas.git
cd DesignAtlas

# Run the high-performance local server (keep-alive + gzip + ETag 304s)
python serve.py
```

> **Note**: Access the local catalog at **`http://127.0.0.1:8912`**. `serve.py` serves assets in 7–33ms (compared to ~300ms on default `http.server`).

### Automated Test Suite (139 Checks)

```powershell
node verify.js
```

---

## 🏛️ The Design Catalog (106 Languages)

Design Atlas indexes 106 distinct visual movements across 12 architectural categories:

| Category | Styles Included | Signature Grammar |
|---|---|---|
| **Minimal** | Minimalism, Neo-Minimalism, Clean White, Zen Ma, Swiss, Architectural Drafting | High whitespace, monochrome palette, hairline rules, typography as hierarchy |
| **Bold & Rebel** | Brutalism, Neo-Brutalism, Acid Brutalism, Maximalism, Graffiti, Dark Brutalism | High contrast, offset drop shadows (4px–8px), intense neon & dark tones |
| **Futuristic & Spatial** | Cyberpunk, Spatial UI, Glassmorphism 2.0, Liquid Glass, Glitch HUD, Ray-Tracing Glass | Frosted translucent glass, backdrop blur, ambient neon illumination |
| **Tactile & Physical** | Neumorphism, Claymorphism, Skeuomorphism, Light Skeuomorphism, Tactile Papercraft | Micro-embossed bevels, dual-light shadows, tactile physical switch feel |
| **Retro & Vintage** | Vaporwave, Synthwave, Y2K Aesthetic, 1984 Macintosh GUI, Pixel 8-Bit, Victorian Steampunk | Period-accurate type, dither textures, CRT horizon lines, brass & terminal green |
| **Editorial & News** | Luxury Typography, Editorial Magazine, Broadsheet News, Bauhaus Dark Edition, Grain & Film | High-contrast serif headlines, kicker rules, multi-column reading flow |
| **Playful & Warm** | Anthropomorphic Mascot UI, Cluttercore Desk, Scrapbook Collage, Dopamine Design, Kawaii Pastel | Organic shapes, rotated polaroids, tactile stickers, lively micro-states |
| **Utility & Native** | High-Density Terminal, macOS Native, Windows Modern Fluent, Developer Telemetry | Real systems engineering: content outranks chrome, compact telemetry grids |

---

## 🎯 Production-Grade Features

### 1. Full-Screen Interactive Showcase
Clicking any design card opens a complete, full-scale interactive mock application styled entirely by that engine's pure CSS:
- **Instant Day / Night Inversion**: Toggle with keyboard key **`N`** or the chrome switch. Runs computational invert-hue (`invert(1) hue-rotate(160deg)`) preserving exact WCAG contrast pairs.
- **Interactive State Matrix**: Working dropdowns, interactive sorting tables, tabs, toasts, form validation, and physical press feedback.
- **Single-Click Brief**: Instant copy of 10,000+ character production briefs with WCAG AA compliance validation.

### 2. Floating Theme Harmonizer
Test how any of the 106 styles adapt to your company's primary branding color in real time. The floating studio pill dynamically tints every button, badge, and focus ring without mutating core CSS.

### 3. Subpage Ecosystem
- **`/compare.html`**: Side-by-side versus mode comparing two styles with interactive audio feedback.
- **`/playground.html`**: Live code laboratory to tweak component parameters on the fly.
- **`/prompt-builder.html`**: Interactive Studio to customize stack-specific constraints (React, Tailwind, Next.js, Vue, Svelte, Flutter).
- **`/tokens.html` & `/uikit.html`**: Complete design token dictionary and live component inventory.

---

## 🤖 The AI Prompt System

Every style is backed by `buildDetailedPrompt(style, opts)` in `js/util.js`, emitting a **14-section comprehensive design specification**:

```
1. ROLE & TARGET CONTEXT        8. COMPONENTS ARCHITECTURE
2. SCOPE & PROTECTION RULES      9. STATE MATRIX (HOVER, ACTIVE, FOCUS)
3. ART DIRECTION & PHILOSOPHY   10. MOTION & TIMING CURVES
4. COLOR SYSTEM (HEX & TOKENS)  11. ACCESSIBILITY & WCAG AA RATIOS
5. TYPOGRAPHIC SCALE            12. STACK ADAPTATION (REACT/VUE/ETC)
6. LAYOUT & RESPONSIVE GRID     13. ACCEPTANCE CHECKLIST
7. AUTHENTIC CSS & TAILWIND     14. FINAL DELIVERABLE FORMAT
```

---

## 🏗️ Architecture & Operational Rules

```
├── .github/
│   └── workflows/ci.yml         # Cloud CI running verify.js on every PR/push
├── css/
│   ├── styles.css               # 106 pure CSS .style-* engines + hover personality
│   ├── features.css             # Shared components and icon base
│   ├── monolith-shell.css       # App skin morphing variants
│   ├── shell-v2.css             # High-end storefront design layer
│   └── tailwind-compiled-*.css  # Pre-compiled static per-page Tailwind CSS
├── js/
│   ├── data.js                  # Single source of truth: 106 style records
│   ├── util.js                  # Shared utilities & buildDetailedPrompt
│   ├── demo-showcase.js         # Full-screen live showcase engine & SVG generator
│   └── palette-harmonizer.js    # Floating studio brand tint controller
├── index.html                   # Primary catalog and showcase stage
├── verify.js                    # 139-check zero-dependency test suite
├── serve.py                     # High-speed HTTP/1.1 server
├── CONTRIBUTING.md              # Contributor onboarding & style recipe
├── SECURITY.md                  # Coordinated vulnerability disclosure
└── LICENSE                      # MIT Open Source License
```

### Core Repository Invariants
- **Additive Only**: Existing engines and features are never deleted.
- **Derived Counts**: All UI metrics dynamically read `STYLES_DATA.length` (never hardcoded).
- **Pre-Compiled Tailwind**: Pre-compiled per page (`css/tailwind-compiled-*.css`), eliminating runtime JIT DOM scanning lag.
- **Security & CSP**: Hardened Content Security Policy with zero remote script dependencies.

---

## 🧪 Verification & Quality Assurance

```powershell
# Run the complete test suite (syntax, integrity, sync, prompts, wiring, CSP)
node verify.js
```
```
============================================================
139/139 checks passed
ALL GREEN
```

---

## 📄 License & Security

- **License**: Released under the [MIT License](LICENSE).
- **Security**: For vulnerability reporting, see [SECURITY.md](SECURITY.md).
- **Maintainer**: [@SudhirDevOps1](https://github.com/SudhirDevOps1)

---

<!-- pair badge trigger -->
<!-- Co-authored with adrianak2026 -->
