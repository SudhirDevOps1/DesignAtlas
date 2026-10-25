/**
 * Design Atlas — Shared Utilities
 * Safe clipboard (works on file:// / non-secure contexts), HTML escaping,
 * and hardened localStorage access used by every module and standalone page.
 *
 * Loaded first (right after data.js) on ALL pages so that no module ever
 * throws on `navigator.clipboard` being undefined or `localStorage` throwing.
 */

/* ------------------------------------------------------------------ *
 * 1. HARDENED localStorage
 * ------------------------------------------------------------------ */
const safeLS = {
  get(key, fallback = null) {
    try {
      const v = window.localStorage.getItem(key);
      return v === null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  },
  getJSON(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  },
  setJSON(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }
};

/* ------------------------------------------------------------------ *
 * 2. CLIPBOARD — async API first, execCommand() fallback for file://
 * ------------------------------------------------------------------ */
function copyTextFallback(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.style.left = '-1000px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch (e) {
    return false;
  }
}

/**
 * Copy text to clipboard. Always returns a Promise<boolean>.
 * Falls back to a hidden <textarea> + execCommand when the async
 * Clipboard API is unavailable (http:// or file:// origins).
 */
function copyText(text) {
  const payload = String(text == null ? '' : text);
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(payload)
      .then(() => true)
      .catch(() => copyTextFallback(payload));
  }
  return Promise.resolve(copyTextFallback(payload));
}

/* ------------------------------------------------------------------ *
 * 3. HTML ESCAPING — for anything interpolated into innerHTML
 * ------------------------------------------------------------------ */
function escapeHTML(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Escape for use inside a single-quoted JS string in an inline handler. */
function escapeJSString(value) {
  return String(value == null ? '' : value)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, '\\n');
}

/* ------------------------------------------------------------------ *
 * 4. ICON SYSTEM — inline <symbol> sprite (Lucide-style geometry)
 *    usage: icon('search')  ->  <svg class="icon"><use href="#i-search"/></svg>
 * ------------------------------------------------------------------ */
function icon(name, cls, size) {
  const id = String(name || '').replace(/[^a-z0-9-]/gi, '');
  const klass = cls ? ' ' + escapeHTML(cls) : '';
  const styleAttr = size ? ' style="width:' + escapeHTML(size) + ';height:' + escapeHTML(size) + '"' : '';
  return '<svg class="icon' + klass + '" aria-hidden="true" focusable="false"' + styleAttr +
    '><use href="#i-' + id + '"></use></svg>';
}

/* ------------------------------------------------------------------ *
 * 4. DETAILED AI PROMPT BUILDER
 *    Har style ka hand-written art direction (data.js ka `prompt`) ko
 *    ek structured, production-grade spec me wrap karta hai — taaki jo
 *    prompt copy ho woh sirf ek line na rahe, poori brief ho.
 * ------------------------------------------------------------------ */
var DA_PROMPT_CATEGORY_NOTES = {
  Minimal: 'Sparse layout, ek hi accent, 8pt spacing scale, almost zero chrome — whitespace hi hierarchy hai.',
  Bold: 'Oversized type, thick borders/hard shadows, high-saturation accent, loud deliberate hierarchy.',
  Futuristic: 'Glow/neon accents, glass ya gradient surfaces, depth layers, motion-forward interactions.',
  Retro: 'Period-accurate type + limited palette, texture (CRT/paper/tape), chunky tactile controls.',
  Editorial: 'Magazine grid, strong typographic hierarchy, rules/columns, drop caps, generous measure.',
  Organic: 'Soft irregular shapes, natural palettes, generous curves, gentle springy motion.',
  Utility: 'Real systems design: content outranks chrome, zero decoration, task clarity first, disciplined data typography.',
  Native: 'Platform-native idiom: match the host OS visual grammar (typography, blur bars, motion) so nothing feels bolted on.'
};

function daPad(s, n) { s = String(s || ''); while (s.length < n) s += ' '; return s; }

function daHexToRgb(hex) {
  var m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(hex || ''));
  if (!m) return null;
  var s = m[1];
  if (s.length === 3) s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
}
function daLum(hex) {
  var c = daHexToRgb(hex);
  if (!c) return 0.5;
  return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;
}
function daSat(hex) {
  var c = daHexToRgb(hex);
  if (!c) return 0;
  var r = c[0] / 255, g = c[1] / 255, b = c[2] / 255;
  var mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  return mx === 0 ? 0 : (mx - mn) / mx;
}
function daRelLum(hex) {
  var c = daHexToRgb(hex);
  if (!c) return 0;
  function ch(v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
  return 0.2126 * ch(c[0]) + 0.7152 * ch(c[1]) + 0.0722 * ch(c[2]);
}
function daContrast(a, b) {
  var la = daRelLum(a), lb = daRelLum(b);
  var hi = Math.max(la, lb), lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

/* Ink ko black/white ki taraf mix karke ek HAMESHA-AA-pass body-text colour
   deta hai — jaise Maximalism ka #ff007f on #ffe600 sirf 3.0:1 hota hai. */
function daMixHex(hexA, hexB, t) {
  var a = daHexToRgb(hexA), b = daHexToRgb(hexB);
  if (!a || !b) return null;
  return '#' + [0, 1, 2].map(function (i) {
    var v = Math.round(a[i] + (b[i] - a[i]) * t);
    return ('0' + v.toString(16)).slice(-2);
  }).join('');
}

/** @returns {{hex:string, toward:string, pct:number, contrast:number} | null} */
function daInkFallback(inkHex, surfaceHex) {
  if (!daHexToRgb(inkHex) || !daHexToRgb(surfaceHex)) return null; // rgba palette — AI mix khud karega
  var toWhite = daLum(surfaceHex) < 0.35;
  var base = toWhite ? '#f5f5f5' : '#000000';
  for (var t = 0.2; t <= 0.90001; t += 0.1) {
    var mixed = daMixHex(inkHex, base, t);
    if (mixed && daContrast(mixed, surfaceHex) >= 4.5) {
      return {
        hex: mixed, toward: toWhite ? 'white' : 'black', pct: Math.round(t * 100),
        contrast: daContrast(mixed, surfaceHex)
      };
    }
  }
  return {
    hex: toWhite ? '#f5f5f5' : '#111111', toward: toWhite ? 'white' : 'black', pct: 100,
    contrast: daContrast(toWhite ? '#f5f5f5' : '#111111', surfaceHex)
  };
}

/**
 * Palette ke colours ko ROLE se map karta hai (position se NAHI — kyunki
 * har style ka palette order alag hota hai). Sabse dark = ink, sabse light
 * = surface, sabse saturated = accent, bacha hua = muted.
 */
function daMapRoles(palette) {
  var p = Array.isArray(palette) ? palette : [];
  var entries = [];
  for (var i = 0; i < 4; i++) entries.push({ idx: i, hex: p[i] || '#000000' });

  var byLum = entries.slice().sort(function (a, b) { return daLum(a.hex) - daLum(b.hex); });
  var ink = byLum[0];
  var surface = byLum[byLum.length - 1];

  var rest = entries.filter(function (e) { return e !== ink && e !== surface; });
  rest.sort(function (a, b) { return daSat(b.hex) - daSat(a.hex); });
  var accent = rest[0] || entries[2];
  var muted = rest[1] || entries[1];

  return { surface: surface, ink: ink, accent: accent, muted: muted };
}

/* Stack-specific install notes. 'universal' prints the whole mapping table so
   ONE copied brief installs into ANY project (React, Next.js, Vue, Svelte, Astro,
   Tailwind, plain HTML, React Native, Flutter). A specific stack prints only its
   own row. Body copy is English on purpose — ye prompt AI IDEs ko jaata hai,
   site UI nahi. */
var DA_STACK_NOTES = {
  universal: null,
  html: 'every token becomes a custom property on :root in one global stylesheet; semantic markup only; the AUTHENTIC CSS fence applies literally.',
  tailwind: '(v3.5+ / v4) install the tokens in the theme — theme.extend.colors/borderRadius/boxShadow in config, or the CSS-first @theme block — and build utilities only from those tokens; never hardcoded hexes in markup.',
  next: ':root custom properties in app/globals.css, imported once by the root layout; tokens are server-safe; dark mode toggles a data-theme attribute, never a second theme file.',
  react: 'tokens in one src/styles/tokens.css imported at the app entry; components compose classes/utilities from those tokens; no per-component inline style blobs, no styled-jsx residue.',
  'css-in-js': 'build ONE theme object from §3–§5 and wrap the tree in ThemeProvider; components read theme.* only — zero literal colour values in code.',
  vue: ':root custom properties in the global stylesheet; SFC <style> blocks consume var(); runtime themes switch a data-theme attribute (a store toggle is not a styling system).',
  svelte: ':root variables in the global (+layout) stylesheet; component styles consume var(); runes hold state — they never style.',
  astro: 'tokens in a global stylesheet (<style is:global> or one imported CSS file); scoped styles may reference the variables for layout only.',
  shadcn: 'override the published CSS variables (--background, --foreground, --primary, --radius and friends) in the global stylesheet with §3–§5 values; keep the shadcn component structure as-is.',
  mui: 'ONE createTheme from §3–§5 (palette, typography, shape.borderRadius, shadows) wrapped in ThemeProvider; baseline overrides only where the theme cannot reach.',
  'react-native': 'tokens become a central theme constants file (colors/spacing/radii) every component imports; surfaces are the §3 surface/ink pairs; depth follows the elevation spec; no web-only CSS.',
  flutter: 'ONE ThemeData from §3–§5 (ColorScheme, TextTheme, ShapeTheme, component-specific themes); keep the Material 3 chrome silent so this language reads pure.'
};
var DA_STACK_LABELS = {
  universal: 'ANY STACK — stack-agnostic (host stack auto-detect on arrival)',
  html: 'Zero-build HTML + CSS',
  tailwind: 'Tailwind CSS',
  next: 'Next.js (App Router)',
  react: 'React (Vite)',
  'css-in-js': 'styled-components / Emotion (CSS-in-JS)',
  vue: 'Vue 3',
  svelte: 'Svelte 5',
  astro: 'Astro',
  shadcn: 'shadcn/ui + Radix',
  mui: 'Material UI',
  'react-native': 'React Native + Expo',
  flutter: 'Flutter + Material 3'
};

/**
 * @param {object} style — data.js ka ek record
 * @param {{stack?: string, scope?: string, project?: string}} [opts]
 *   stack   : 'universal' (default — brief kisi bhi stack pe install ho jaata hai)
 *             ya html | tailwind | next | react | css-in-js | vue | svelte | astro | shadcn | mui | react-native | flutter
 *   scope   : 'restyle' (default — existing project ki design layer update, kuch
 *             delete/rewrite nahi) ya 'build' (naye project ka full scaffold).
 *             Purana HTML-only deliverable scope:'build' + stack:'html' me milta hai.
 *   project : project label jo '[project]' placeholder ki jagah aaye.
 * @returns {string} clipboard-ready multi-section design spec
 */
function buildDetailedPrompt(style, opts) {
  if (!style || typeof style !== 'object') return '';

  var RULE = '════════════════════════════════════════════════════';
  var name = style.name || 'This style';
  var cat = style.category || 'UI';
  var p = Array.isArray(style.palette) ? style.palette : [];
  var tags = Array.isArray(style.tags) && style.tags.length ? style.tags.join(', ') : '—';
  opts = opts || {};
  var stack = String(opts.stack || 'universal').toLowerCase();
  var isBuild = String(opts.scope || 'restyle') === 'build';
  var target = String(opts.project || '[project]');
  var stackLabel = DA_STACK_LABELS[stack] || ('host stack: ' + stack);

  var roles = daMapRoles(p);
  function roleLine(label, e) {
    return '   ' + daPad(label, 24) + e.hex + '   (palette[' + e.idx + '])';
  }
  var cr = daContrast(roles.ink.hex, roles.surface.hex);
  var inkFallback = daInkFallback(roles.ink.hex, roles.surface.hex);
  var cssFence = String(style.cssSnippet || '').trim();
  var twFence = String(style.tailwindSnippet || '').trim();

  var L = [];
  L.push('DESIGN SPEC — ' + name + ' (' + cat + ') — install into ' + target);
  L.push('Mode: ' + (isBuild ? 'assemble fresh' : 'restyle existing project, additive') + '  ·  Target stack: ' + stackLabel);
  L.push(RULE);
  L.push('');

  L.push('ROLE');
  L.push('   Senior product designer + front-end engineer. Install the design language described');
  L.push('   below into ' + target + ', on whatever stack it runs — React, Next.js, Vue, Svelte,');
  L.push('   Astro, Tailwind, plain HTML, React Native, Flutter or anything else. The design layer');
  L.push('   is the deliverable; the host project keeps its own architecture and code idioms.');
  L.push('   ' + target + ' comes first: if it is still the placeholder above, DETECT the target from');
  L.push('   whatever this conversation has (repo, files, package.json, routes) — its stack and app');
  L.push('   type — before writing a line. Nothing attached? Ask one short question ("Which project/');
  L.push('   stack is this design going into?") and wait. Never silently invent a project.');
  L.push('');

  L.push('SCOPE & PROTECTION RULES — these outrank every generic prompting habit');
  L.push('   1. This spec is atomic: bind to it exclusively. Do not blend other design styles and');
  L.push('      do not soften it toward generic defaults — "plain rounded cards with a shadow" is');
  L.push('      a violation, not a safe choice. When unsure of a detail, choose the MORE ' + name + ' option.');
  L.push('   2. Design layer only — ' + (isBuild ? 'fresh build: nothing exists to protect yet, keep this contract for every feature added later.' :
    'never delete or rewrite business logic, data fetching, routing, state management, tests or content. Touch presentation only, follow the host file conventions, output diffs for touched files and new files only where genuinely needed.'));
  L.push('   3. Do not drop sections to save space. If one cannot be applied to this project,');
  L.push('      name it and say why instead of silently merging it into defaults.');
  L.push('   4. Zero new dependencies that would visually override this language (no new UI kit,');
  L.push('      no theme pack); font stacks fall back to system equivalents offline.');
  L.push('');

  L.push('1) ART DIRECTION — the voice of this language');
  L.push('   ' + (style.prompt || ('Design ' + target + ' in the ' + name + ' language.')));
  L.push('');

  L.push('2) STYLE DNA');
  L.push('   • Vibe      : ' + (style.vibeEn || style.vibe || '—'));
  if (style.bestFit) L.push('   • Best for  : ' + style.bestFit);
  L.push('   • Keywords  : ' + tags);
  L.push('   • Interface sound: ' + (style.audioTone || 'subtle'));
  if (DA_PROMPT_CATEGORY_NOTES[cat]) L.push('   • ' + DA_PROMPT_CATEGORY_NOTES[cat]);
  L.push('');

  L.push('3) AUTHENTIC CSS REFERENCE — port these tokens, then consume them everywhere');
  if (cssFence) {
    L.push('   ```css');
    L.push('   ' + cssFence.split('\n').join('\n   '));
    L.push('   ```');
  }
  if (twFence) {
    L.push('   Tailwind fingerprint (same components expressed as utilities):');
    L.push('   ```html');
    L.push('   ' + twFence.split('\n').join('\n   '));
    L.push('   ```');
  }
  L.push('');

  L.push('4) COLOR SYSTEM — exact values, install as named tokens, reuse everywhere');
  L.push(roleLine('Surface / background', roles.surface));
  L.push(roleLine('Ink / text', roles.ink));
  L.push(roleLine('Accent / brand', roles.accent));
  L.push(roleLine('Muted / surface-2', roles.muted));
  L.push('   • Token names (--color-surface, --color-ink, --color-accent, --color-surface-2) or the');
  L.push('     host framework\'s equivalent (see STACK ADAPTATION). Hover/active/focus derive from');
  L.push('     these four only (mix with surface/ink at 8–14%). No ad-hoc hexes anywhere.');
  L.push('   • Ink-on-Surface contrast ≈ ' + cr.toFixed(1) + ':1' + (cr >= 4.5
    ? ' (WCAG AA pass).'
    : ' — below AA 4.5:1. Body text therefore runs on --color-ink-strong ' +
      (inkFallback
        ? inkFallback.hex + ' (the ink mixed ' + inkFallback.pct + '% toward ' + inkFallback.toward +
          ', verified ' + inkFallback.contrast.toFixed(1) + ':1 on the surface). ' +
          'Keep ' + roles.ink.hex + ' itself for headings, borders and decorative FX only.'
        : '(palette here is not plain hex — mix the ink ~30% toward ' + (daLum(roles.surface.hex) < 0.35 ? 'white' : 'black') +
          ' and verify ≥4.5:1 yourself). Keep ' + roles.ink.hex + ' for headings/FX only.')));
  L.push('   • Never put the accent on body text; never tint more than one surface per screen ' + name + '-deep.');
  L.push('');

  L.push('5) TYPOGRAPHY');
  L.push('   • Scale: 12 / 14 / 16 / 20 / 24 / 32 / 48px. Body 16px, line-height 1.6, measure max 65ch.');
  L.push('   • Headings: weight 800–900, tracking -0.02em, line-height 1.05–1.2. The cssSnippet above wins on type choices.');
  L.push('   • Eyebrow/label: 12px, uppercase, tracking 0.08em, weight 800.');
  L.push('');

  L.push('6) SPACING · RADIUS · DEPTH');
  L.push('   • 8px spacing scale (4/8/12/16/24/32/48/64); sections follow the cssSnippet\'s rhythm where it sets one.');
  L.push('   • Radii, borders and shadow language: take them from the AUTHENTIC CSS fence — they are');
  L.push('     this style\'s identity, not decoration. If it has none, derive at most 3 radii and 2');
  L.push('     elevations and reuse them everywhere.');
  L.push('');

  L.push('7) LAYOUT & RESPONSIVE — layout behaviour, content-agnostic');
  L.push('   • Mobile-first; primary content column max-width 1200px; 12-column grid, 24px gutters.');
  L.push('   • No landing-page skeleton is assumed: dashboard, docs, admin, commerce or marketing,');
  L.push('     apply the same rhythm to the project\'s actual information architecture. Keep the');
  L.push('     existing routes/pages/navigation; do not invent or delete content zones.');
  L.push('   • Section padding: clamp(1.5rem, 4vw, 3.25rem) vertical, clamp(1rem, 4vw, 3.5rem) horizontal.');
  L.push('   • < 560px   : single column, nav wraps, CTAs full-width, 48px touch targets.');
  L.push('   • 560–900px : 2-column grids where content supports them, panels stack.');
  L.push('   • > 900px   : full layout, hover states live, 40–44px control heights.');
  L.push('   • Tables scroll horizontally inside a wrapper; media keeps aspect-ratio; zero layout shift.');
  L.push('');

  L.push('8) COMPONENTS — build in the host framework\'s own idiom, variants via props/variants');
  L.push('   • Buttons (solid / outline / ghost / icon), inputs (text, select, textarea, checkbox) with');
  L.push('     valid + invalid states, cards, nav/header with dropdowns, search + filter bar, data table');
  L.push('     (sortable + paginated), modal dialog, toasts, tabs, tooltips, skeleton loaders, progress, footer.');
  L.push('   • One implementation per component type with variants — no one-off copies of a styled button.');
  L.push('   • Extend the project\'s EXISTING component inventory first; wrap and restyle before writing new.');
  L.push('');

  L.push('9) STATE MATRIX — no control ships without all of these');
  L.push('   default / hover (180ms ease-out, ONE property) / focus-visible (2px ring, 2px offset,');
  L.push('   instant) / active (pressed ~0.97 scale) / disabled (muted token, not just opacity) /');
  L.push('   loading (skeleton in surface-2) / empty / error (message in text, never colour alone) / success.');
  L.push('');

  L.push('10) MOTION — quiet, one property at a time');
  L.push('   • Hover 180ms ease-out (2px lift or colour shift only). Reveal 600ms fade-up 20px via an');
  L.push('     intersection observer in the host platform. Overlay enter 220ms scale 0.97→1 + fade.');
  L.push('   • prefers-reduced-motion: every transition/animation off, content instantly visible.');
  L.push('');

  L.push('11) ACCESSIBILITY — non-negotiable');
  L.push('   • Semantic landmarks and heading order per platform; labels on every form control.');
  L.push('   • Keyboard-reachable interactive elements with visible focus; aria-label on icon-only buttons.');
  L.push('   • Meaningful alt text where media exists; colour is never the only information channel.');
  L.push('');

  L.push('12) STACK ADAPTATION — how to install the tokens on ' + stackLabel);
  if (DA_STACK_NOTES[stack]) {
    L.push('   • ' + DA_STACK_NOTES[stack]);
  } else {
    L.push('   Detect first, then pick: identify the host stack from its files (package.json deps,');
    L.push('   config, import style) — or ask the user — and apply ONLY that row below.');
    Object.keys(DA_STACK_NOTES).forEach(function (k) {
      if (k === 'universal') return;
      L.push('   • ' + daPad((DA_STACK_LABELS[k] || k) + ':', 44) + DA_STACK_NOTES[k]);
    });
  }
  L.push('');

  L.push('13) ACCEPTANCE CHECKLIST — verify before answering');
  L.push('   [ ] Every colour in the output comes from §4; zero invented hexes.');
  L.push('   [ ] Tokens live in exactly one place, per this brief\'s stack mapping.');
  L.push('   [ ] Every interactive element passes the §9 state matrix and keyboard reachability.');
  L.push('   [ ] Motion follows §10 including prefers-reduced-motion.');
  L.push('   [ ] Body-text contrast on its surface ≥ 4.5:1 (pair here: ' + cr.toFixed(1) + ':1' + (cr >= 4.5 ?
    ').' :
    ' — body text uses --color-ink-strong ' + (inkFallback ? inkFallback.hex : '(compute the mixed ink yourself)') + ').'));
  L.push('   [ ] Restyle-only: no logic, route, data or content changes beyond the design layer' + (isBuild ? '.' : '.'));
  L.push('   [ ] A stranger recognises this screen as ' + name + ' in one second. If not, make it MORE ' + name + '.');
  L.push('');

  L.push('14) DELIVERABLE');
  if (isBuild) {
    L.push('    Complete, runnable ' + stackLabel + ' code implementing sections 1–13 (components may be');
    L.push('    trimmed where the project needs fewer), mobile-first, semantic, accessible. If the');
    L.push('    stack is genuinely unknown, deliver a self-contained HTML file with one <style> block');
    L.push('    so it runs anywhere.');
  } else {
    L.push('    The design layer installed into ' + target + ': token source wired per STACK ADAPTATION,');
    L.push('    components from §8 restyled, host stack idioms respected, business logic untouched.');
    L.push('    Deliver diffs for modified files plus only the genuinely new files. Zero external');
    L.push('    image/font requests unless the project already relies on them.');
  }
  L.push('');
  L.push(RULE);
  L.push('Output: ' + (isBuild ? 'complete working code for ' + (stack === 'universal' ? 'the detected host stack' : stackLabel) + ', implementing sections 1–13.' :
    'restyle diffs for ' + (stack === 'universal' ? 'the detected host stack' : stackLabel) + ' — design layer only, per the scope rules.'));

  return L.join('\n');
}

/**
 * Har jagah (index, compare, playground, quiz, uikit, favorites) isi helper
 * se detailed prompt copy hota hai — HTML attribute me lambi text embed
 * karne ki zaroorat nahi, sirf style id pass hoti hai.
 */
function copyStylePrompt(styleId, event, opts) {
  if (event && event.stopPropagation) event.stopPropagation();
  var list = (typeof STYLES_DATA !== 'undefined' && STYLES_DATA) ? STYLES_DATA : [];
  var style = null;
  for (var i = 0; i < list.length; i++) if (list[i] && list[i].id === styleId) { style = list[i]; break; }
  if (!style) return;

  var text = buildDetailedPrompt(style, opts) || style.prompt || '';

  // index.html apna copyPrompt + toast rakhta hai; baaki pages fallback use karte hain
  if (typeof copyPrompt === 'function') { copyPrompt(text, style.name); return; }

  copyText(text).then(function (ok) {
    if (typeof soundManager !== 'undefined' && soundManager.play) soundManager.play(ok ? 'success' : 'heavy');
    if (typeof showToast === 'function') showToast(ok ? '✔ Detailed AI prompt copied!' : '⚠ Copy blocked — use Ctrl+C');
  });
}

/* ------------------------------------------------------------------ *
 * 5. MISC
 * ------------------------------------------------------------------ */
function clampNumber(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { safeLS, copyText, copyTextFallback, escapeHTML, escapeJSString, clampNumber, icon, buildDetailedPrompt, copyStylePrompt };
}
