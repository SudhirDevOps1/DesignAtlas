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
  Organic: 'Soft irregular shapes, natural palettes, generous curves, gentle springy motion.'
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

/**
 * @param {object} style — data.js ka ek record
 * @returns {string} clipboard-ready multi-section prompt
 */
function buildDetailedPrompt(style) {
  if (!style || typeof style !== 'object') return '';

  var RULE = '────────────────────────────────────────────────';
  var name = style.name || 'This style';
  var cat = style.category || 'UI';
  var p = Array.isArray(style.palette) ? style.palette : [];
  var tags = Array.isArray(style.tags) && style.tags.length ? style.tags.join(', ') : '—';

  var L = [];
  L.push('UI DESIGN BRIEF — ' + name + ' (' + cat + ')');
  L.push(RULE);
  L.push('');
  L.push('[project] ko NEECHE di gayi exact art direction + spec ke hisaab se design karo.');
  L.push('Jitna ho sake exact values (colors, sizes, timings) follow karo.');
  L.push('');

  L.push('1) ART DIRECTION');
  L.push('   ' + (style.prompt || ('Design a [project] in ' + name + ' style.')));
  L.push('');

  L.push('2) STYLE DNA');
  L.push('   • Vibe      : ' + (style.vibe || '—'));
  if (style.bestFit) L.push('   • Best for  : ' + style.bestFit);
  L.push('   • Keywords  : ' + tags);
  if (DA_PROMPT_CATEGORY_NOTES[cat]) L.push('   • ' + DA_PROMPT_CATEGORY_NOTES[cat]);
  L.push('');

  var roles = daMapRoles(p);
  function roleLine(label, e) {
    return '   ' + daPad(label, 22) + e.hex + '   (palette[' + e.idx + '])';
  }
  var cr = daContrast(roles.ink.hex, roles.surface.hex);
  L.push('3) COLOR SYSTEM — exact values, inhe hi use karo');
  L.push(roleLine('Surface / background', roles.surface));
  L.push(roleLine('Ink / text', roles.ink));
  L.push(roleLine('Accent / brand', roles.accent));
  L.push(roleLine('Muted / surface-2', roles.muted));
  L.push('   • Ink-on-Surface contrast ≈ ' + cr.toFixed(1) + ':1' +
    (cr >= 4.5 ? ' (WCAG AA pass).' : ' — AA ke liye 4.5:1 chahiye, isliye body text surface par hi rakho.'));
  L.push('   Rules: sirf ye 4 tokens; body text par accent mat lagao; hover/active me sirf inhi se derive karo.');
  L.push('');

  L.push('4) LAYOUT & GRID');
  L.push('   • Mobile-first, max-width 1200px, 12-column grid, 24px gutters, 8px spacing scale (4/8/12/16/24/32/48/64).');
  L.push('   • Page structure: sticky header (logo + nav + search + actions) → hero → marquee → feature grid →');
  L.push('     gallery → pricing → testimonial → data table → docs → contact form → footer.');
  L.push('   • Section padding: clamp(1.5rem, 4vw, 3.25rem) vertical, clamp(1rem, 4vw, 3.5rem) horizontal.');
  L.push('');

  L.push('5) TYPOGRAPHY');
  L.push('   • Scale: 12 / 14 / 16 / 20 / 24 / 32 / 48px. Body 16px, line-height 1.6, measure max 65ch.');
  L.push('   • Headings: weight 800–900, tracking −0.02em, line-height 1.05–1.2.');
  L.push('   • Eyebrow/label: 12px, uppercase, tracking 0.08em, weight 800.');
  L.push('');

  L.push('6) COMPONENTS TO BUILD (sab par default + hover + focus-visible state)');
  L.push('   Buttons (solid / outline / ghost / icon), inputs (text, select, textarea, checkbox) valid + invalid states ke saath,');
  L.push('   cards, gallery tiles, sortable + paginated data table, sticky header + dropdown menus, search bar,');
  L.push('   modal dialog, toast notifications, tabs, tooltips, skeleton loaders, progress bar, footer with link columns.');
  L.push('');

  L.push('7) MOTION');
  L.push('   • Hover: 180ms ease-out, sirf EK hi property badlo (2px lift ya colour shift) — sab kuch animate mat karo.');
  L.push('   • Section reveal: 600ms fade-up (opacity 0→1, translateY 20px→0) via IntersectionObserver.');
  L.push('   • Overlay enter: 220ms scale 0.97→1 + fade. Focus ring: 2px outline, 2px offset, turant (no delay).');
  L.push('   • prefers-reduced-motion par saare transitions/animations band, content instantly visible.');
  L.push('');

  L.push('8) RESPONSIVE — har device par test karo');
  L.push('   • < 560px   : single column, nav wraps, CTAs full-width, search full-width, 48px touch targets.');
  L.push('   • 560–900px : 2-column grids, hero stacks, side panel neeche aata hai.');
  L.push('   • > 900px   : full layout, hover states active, 40–44px control heights.');
  L.push('   • Tables horizontal-scroll wrapper me; images aspect-ratio locked, no layout shift.');
  L.push('');

  L.push('9) ACCESSIBILITY');
  L.push('   • Semantic HTML (header/nav/main/section/footer), sahi heading order, form labels.');
  L.push('   • Har interactive element keyboard-reachable with visible focus; icon-only buttons par aria-label.');
  L.push('   • Images par meaningful alt; colour ko single information channel mat banao.');
  L.push('');

  L.push('10) DELIVERABLE');
  L.push('    Production-ready HTML + CSS (koi framework nahi), mobile-first, semantic, accessible.');
  L.push('    Poori tarah self-contained: inline SVG icons, koi external image/font request nahi.');
  L.push('');
  L.push(RULE);
  L.push('Output: ek hi complete HTML file jisme <style> block ho aur sab sections + interactive states hon.');

  return L.join('\n');
}

/**
 * Har jagah (index, compare, playground, quiz, uikit, favorites) isi helper
 * se detailed prompt copy hota hai — HTML attribute me lambi text embed
 * karne ki zaroorat nahi, sirf style id pass hoti hai.
 */
function copyStylePrompt(styleId, event) {
  if (event && event.stopPropagation) event.stopPropagation();
  var list = (typeof STYLES_DATA !== 'undefined' && STYLES_DATA) ? STYLES_DATA : [];
  var style = null;
  for (var i = 0; i < list.length; i++) if (list[i] && list[i].id === styleId) { style = list[i]; break; }
  if (!style) return;

  var text = buildDetailedPrompt(style) || style.prompt || '';

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
