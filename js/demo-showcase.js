/**
 * ============================================================================
 * DEMO SHOWCASE — FULL-SCREEN LIVE PAGE PREVIEW (76 UI STYLES)
 * ----------------------------------------------------------------------------
 * Card kholne par poora ek demo mini-website us style me full screen me
 * dikhta hai — header, nav, search bar, buttons, images (pure SVG art),
 * cards, pricing, table, form, footer sab.
 *
 * Kuch bhi DELETE nahi hota: ye ek NAYA additive layer hai. Purana
 * #style-modal dashboard jaisa hai waisa hi kaam karta rahega.
 *
 * Dependencies: js/util.js (escapeHTML, copyText, safeLS), js/data.js,
 * js/token-exporter.js (boilerplate download), index.html inline globals
 * (showToast, copyPrompt, switchView, soundManager).
 * ===========================================================================
 */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- refs */
  var dialog = null;
  var stage = null;
  var chromeTitle = null;
  var chromeBadge = null;
  var chromeCount = null;
  var chromeVibe = null;
  var chromeIndex = null;
  var sectionNav = null;
  var currentStyle = null;
  var wired = false;

  /* ------------------------------------------------------- utils: SVG art */
  function svgDataUri(svg) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.replace(/\s{2,}/g, ' '));
  }

  /* Number formatting for SVG attributes — keeps the data URIs short. */
  function n(v) { return Math.round(v * 10) / 10; }

  /* Deterministic PRNG seeded from a string: the same style + label always
     yields the same artwork, so re-rendering never flickers between shapes. */
  function seeded(seedStr) {
    var h = strHash(seedStr) || 1;
    return function (min, max) {
      h = (h * 1103515245 + 12345) & 0x7fffffff;
      return min + (h / 0x7fffffff) * (max - min);
    };
  }

  /* Twelve genuinely different abstract compositions, each drawing only from
     the style palette. The generator used to reuse ONE circle+triangle layout
     for every image, so all six demo gallery tiles were pixel-identical and
     the whole thing read as a placeholder. Each entry is (w, h, palette, rnd)
     -> SVG inner markup. */
  var COMPOSITIONS = [

    /* 0 - layered mountain range with a low sun */
    function (w, h, p, rnd) {
      var s = '<circle cx="' + n(rnd(w * 0.2, w * 0.8)) + '" cy="' + n(rnd(h * 0.12, h * 0.42)) +
        '" r="' + n(rnd(h * 0.1, h * 0.24)) + '" fill="' + p[3] + '" opacity="0.9"/>';
      var layers = 3 + Math.floor(rnd(0, 2.99));
      for (var i = 0; i < layers; i++) {
        var cx = rnd(-w * 0.05, w * 1.05);
        var py = h - rnd(h * 0.2, h * 0.7);
        var hw = rnd(w * 0.2, w * 0.5);
        s += '<path d="M' + n(cx - hw) + ' ' + h + ' L' + n(cx) + ' ' + n(py) + ' L' + n(cx + hw) + ' ' + h +
          ' Z" fill="' + p[i % 4] + '" opacity="' + n(0.25 + i * 0.15) + '"/>';
      }
      return s;
    },

    /* 1 - halftone dot grid, radius sweeping across the frame */
    function (w, h, p, rnd) {
      var cols = 5 + Math.floor(rnd(0, 2.99)), rows = 4 + Math.floor(rnd(0, 2.99));
      var gx = w / cols, gy = h / rows, s = '', x, y;
      var diag = rnd(0, 1) > 0.5;
      for (y = 0; y < rows; y++) {
        for (x = 0; x < cols; x++) {
          var t = diag ? (x / cols + y / rows) / 2 : x / cols;
          s += '<circle cx="' + n(gx * (x + 0.5)) + '" cy="' + n(gy * (y + 0.5)) + '" r="' +
            n(gx * (0.1 + t * rnd(0.22, 0.42))) + '" fill="' + p[(x + y) % 4] +
            '" opacity="' + n(rnd(0.3, 0.8)) + '"/>';
        }
      }
      return s;
    },

    /* 2 - concentric rings around a solid core */
    function (w, h, p, rnd) {
      var cx = rnd(w * 0.3, w * 0.7), cy = rnd(h * 0.3, h * 0.7), s = '', i;
      var rings = 3 + Math.floor(rnd(0, 3.99));
      var maxR = Math.min(w, h) * rnd(0.32, 0.5);
      for (i = rings; i >= 1; i--) {
        s += '<circle cx="' + n(cx) + '" cy="' + n(cy) + '" r="' + n(maxR * (i / rings)) +
          '" fill="none" stroke="' + p[i % 4] + '" stroke-width="' + n(rnd(h * 0.02, h * 0.07)) +
          '" opacity="' + n(0.3 + i * 0.07) + '"/>';
      }
      return s + '<circle cx="' + n(cx) + '" cy="' + n(cy) + '" r="' + n(maxR * 0.18) +
        '" fill="' + p[3] + '" opacity="0.9"/>';
    },

    /* 3 - diagonal ribbons */
    function (w, h, p, rnd) {
      var s = '', count = 4 + Math.floor(rnd(0, 3.99)), off = rnd(-h * 0.5, 0), i;
      var step = (h * 1.7) / count;
      for (i = 0; i < count; i++) {
        var y = off + i * step, th = step * rnd(0.25, 0.6);
        s += '<path d="M0 ' + n(y) + ' L' + w + ' ' + n(y - h * 0.6) + ' L' + w + ' ' + n(y - h * 0.6 + th) +
          ' L0 ' + n(y + th) + ' Z" fill="' + p[i % 4] + '" opacity="' + n(rnd(0.3, 0.75)) + '"/>';
      }
      return s;
    },

    /* 4 - arched architecture */
    function (w, h, p, rnd) {
      var count = 2 + Math.floor(rnd(0, 2.99)), s = '', i;
      var aw = w / (count + 0.4), x0 = (w - aw * count) / 2;
      for (i = 0; i < count; i++) {
        var x = x0 + i * aw, ah = rnd(h * 0.35, h * 0.82), r = aw * rnd(0.32, 0.46);
        s += '<path d="M' + n(x) + ' ' + h + ' L' + n(x) + ' ' + n(h - ah + r) + ' A' + n(r) + ' ' + n(r) +
          ' 0 0 1 ' + n(x + aw) + ' ' + n(h - ah + r) + ' L' + n(x + aw) + ' ' + h +
          ' Z" fill="' + p[i % 4] + '" opacity="' + n(rnd(0.35, 0.8)) + '"/>';
      }
      return s;
    },

    /* 5 - overlapping liquid blobs */
    function (w, h, p, rnd) {
      var s = '', count = 3 + Math.floor(rnd(0, 3.99)), i;
      for (i = 0; i < count; i++) {
        s += '<circle cx="' + n(rnd(0, w)) + '" cy="' + n(rnd(0, h)) + '" r="' +
          n(Math.min(w, h) * rnd(0.18, 0.42)) + '" fill="' + p[i % 4] +
          '" opacity="' + n(rnd(0.28, 0.62)) + '"/>';
      }
      return s;
    },

    /* 6 - horizon bands with a low sun */
    function (w, h, p, rnd) {
      var s = '<circle cx="' + n(rnd(w * 0.25, w * 0.75)) + '" cy="' + n(h * rnd(0.35, 0.62)) +
        '" r="' + n(Math.min(w, h) * rnd(0.2, 0.38)) + '" fill="' + p[3] + '" opacity="0.85"/>';
      var bands = 3 + Math.floor(rnd(0, 2.99)), y = h, i;
      for (i = 0; i < bands; i++) {
        var bh = h * rnd(0.06, 0.16);
        y -= bh;
        s += '<rect x="0" y="' + n(y) + '" width="' + w + '" height="' + n(bh) + '" fill="' + p[i % 4] +
          '" opacity="' + n(0.3 + i * 0.12) + '"/>';
      }
      return s;
    },

    /* 7 - circuit traces with solder nodes */
    function (w, h, p, rnd) {
      var paths = '', nodes = '', lines = 3 + Math.floor(rnd(0, 3.99)), i, j;
      for (i = 0; i < lines; i++) {
        var y = h * rnd(0.12, 0.88), x = 0, d = 'M0 ' + n(y), segs = 2 + Math.floor(rnd(0, 2.99));
        for (j = 0; j < segs; j++) {
          var lx = x + w * rnd(0.15, 0.4);
          var ly = (j === segs - 1) ? y : h * rnd(0.12, 0.88);
          d += ' L' + n(lx) + ' ' + n(y) + ' L' + n(lx) + ' ' + n(ly);
          nodes += '<circle cx="' + n(lx) + '" cy="' + n(ly) + '" r="' + n(h * 0.022) +
            '" fill="' + p[(i + 1) % 4] + '"/>';
          x = lx; y = ly;
        }
        paths += '<path d="' + d + '" fill="none" stroke="' + p[i % 4] + '" stroke-width="' +
          n(h * rnd(0.008, 0.02)) + '" opacity="' + n(rnd(0.4, 0.8)) + '" stroke-linecap="round"/>';
      }
      return paths + nodes;
    },

    /* 8 - scattered confetti */
    function (w, h, p, rnd) {
      var s = '', count = 10 + Math.floor(rnd(0, 7.99)), i;
      for (i = 0; i < count; i++) {
        var x = rnd(0, w), y = rnd(0, h), sz = Math.min(w, h) * rnd(0.03, 0.1);
        var col = p[i % 4], op = n(rnd(0.35, 0.85)), kind = Math.floor(rnd(0, 3.99));
        if (kind === 0) s += '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(sz) + '" fill="' + col + '" opacity="' + op + '"/>';
        else if (kind === 1) s += '<rect x="' + n(x) + '" y="' + n(y) + '" width="' + n(sz * 2) + '" height="' + n(sz * 2) + '" rx="' + n(sz * 0.4) + '" fill="' + col + '" opacity="' + op + '"/>';
        else if (kind === 2) s += '<path d="M' + n(x) + ' ' + n(y + sz) + ' L' + n(x + sz) + ' ' + n(y - sz) + ' L' + n(x + sz * 2) + ' ' + n(y + sz) + ' Z" fill="' + col + '" opacity="' + op + '"/>';
        else s += '<rect x="' + n(x) + '" y="' + n(y + sz * 1.4) + '" width="' + n(sz * 2.4) + '" height="' + n(sz * 0.5) + '" rx="' + n(sz * 0.25) + '" fill="' + col + '" opacity="' + op + '"/>';
      }
      return s;
    },

    /* 9 - layered rolling hills */
    function (w, h, p, rnd) {
      var s = '', count = 3 + Math.floor(rnd(0, 2.99)), i;
      for (i = 0; i < count; i++) {
        var y = h - h * ((i + 1) / (count + 0.6)) * rnd(0.8, 1.05);
        s += '<path d="M0 ' + h + ' L0 ' + n(y + 40) + ' Q' + n(w / 2) + ' ' + n(y - h * 0.08) +
          ' ' + w + ' ' + n(y + 40) + ' L' + w + ' ' + h + ' Z" fill="' + p[i % 4] +
          '" opacity="' + n(0.28 + i * 0.16) + '"/>';
      }
      return s;
    },

    /* 10 - radial sunburst wedges */
    function (w, h, p, rnd) {
      var cx = rnd(w * 0.35, w * 0.65), cy = rnd(h * 0.35, h * 0.65), s = '', i;
      var wedges = 5 + Math.floor(rnd(0, 5.99)), R = Math.max(w, h) * rnd(0.6, 1.1), a0 = rnd(0, 6.283);
      var span = (Math.PI * 2) / wedges;
      for (i = 0; i < wedges; i++) {
        var a = a0 + span * i, a1 = a0 + span * (i + 1);
        s += '<path d="M' + n(cx) + ' ' + n(cy) + ' L' + n(cx + Math.cos(a) * R) + ' ' + n(cy + Math.sin(a) * R) +
          ' A' + n(R) + ' ' + n(R) + ' 0 0 1 ' + n(cx + Math.cos(a1) * R) + ' ' + n(cy + Math.sin(a1) * R) +
          ' Z" fill="' + p[i % 4] + '" opacity="' + n(rnd(0.16, 0.45)) + '"/>';
      }
      return s;
    },

    /* 11 - nested frames around a focal dot */
    function (w, h, p, rnd) {
      var s = '', count = 3 + Math.floor(rnd(0, 3.99));
      var inset = Math.min(w, h) * rnd(0.06, 0.12), i;
      for (i = 0; i < count; i++) {
        var m = inset * (i + 1);
        s += '<rect x="' + n(m) + '" y="' + n(m) + '" width="' + n(w - m * 2) + '" height="' + n(h - m * 2) +
          '" rx="' + n(Math.min(w, h) * 0.03) + '" fill="none" stroke="' + p[i % 4] +
          '" stroke-width="' + n(Math.min(w, h) * rnd(0.02, 0.06)) + '" opacity="' + n(0.35 + i * 0.12) + '"/>';
      }
      return s + '<circle cx="' + n(rnd(w * 0.3, w * 0.7)) + '" cy="' + n(rnd(h * 0.3, h * 0.7)) +
        '" r="' + n(Math.min(w, h) * rnd(0.08, 0.16)) + '" fill="' + p[3] + '" opacity="0.9"/>';
    }
  ];

  /* Pick a composition deterministically from the seed and render it. A broken
     composition returns '' rather than throwing, so artwork can never take the
     page down with it. */
  function composeArt(w, h, palette, seedStr) {
    var p = (palette && palette.length >= 4) ? palette : ['#e5e7eb', '#a5b4fc', '#111827', '#6b7280'];
    var rnd = seeded(seedStr);
    var idx = Math.floor(seeded(seedStr + '|pick')(0, COMPOSITIONS.length - 0.0001));
    try {
      return COMPOSITIONS[idx](w, h, p, rnd) || '';
    } catch (err) {
      return '';
    }
  }

  /**
   * Palette se abstract "photography" jaisa art banata hai (100% offline,
   * koi external image request nahi).
   */
  function makeArt(style, variant, label) {
    var p = style.palette || ['#e5e7eb', '#a5b4fc', '#111827', '#6b7280'];
    var a = p[0], b = p[1] || p[0], c = p[2] || p[1], d = p[3] || p[0];
    var w = 800, h = 500;
    /* Seed includes the label, so the six demo gallery tiles — which all share
       one style and therefore one palette — still get six different pictures. */
    var seed = ((style && (style.id || style.name)) || 'da') + '|' + variant + '|' + (label || '');

    if (variant === 'avatar') {
      var initials = (style.name || 'DA').replace(/[^A-Za-z ]/g, '').trim().split(/\s+/)
        .map(function (s) { return s.charAt(0); }).join('').slice(0, 2).toUpperCase();
      return svgDataUri(
        '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">' +
        '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="' + b + '"/><stop offset="1" stop-color="' + c + '"/>' +
        '</linearGradient></defs>' +
        '<rect width="96" height="96" rx="20" fill="url(#g)"/>' +
        '<text x="48" y="59" font-family="Inter,Arial,sans-serif" font-size="34" font-weight="800" ' +
        'text-anchor="middle" fill="' + d + '">' + initials + '</text></svg>'
      );
    }

    if (variant === 'tile') {
      w = 640; h = 480;
      return svgDataUri(
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
        '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient></defs>' +
        '<rect width="' + w + '" height="' + h + '" fill="url(#g)"/>' +
        composeArt(w, h, p, seed) +
        '</svg>'
      );
    }

    /* Wide banner for the gallery cards — 800x240, abstract palette
       composition. Deliberately text-free: a centred label at this aspect
       ratio gets cropped by object-cover. */
    if (variant === 'band') {
      w = 800; h = 240;
      return svgDataUri(
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
        '<defs>' +
        '<linearGradient id="g" x1="0" y1="0" x2="1" y2="0.35">' +
        '<stop offset="0" stop-color="' + a + '"/><stop offset="0.5" stop-color="' + b + '"/><stop offset="1" stop-color="' + c + '"/>' +
        '</linearGradient>' +
        '</defs>' +
        '<rect width="' + w + '" height="' + h + '" fill="url(#g)"/>' +
        composeArt(w, h, p, seed) +
        '</svg>'
      );
    }

    // hero / poster
    return svgDataUri(
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
      '<defs><linearGradient id="g" x1="0" y1="1" x2="1" y2="0">' +
      '<stop offset="0" stop-color="' + a + '"/><stop offset="0.55" stop-color="' + b + '"/><stop offset="1" stop-color="' + c + '"/>' +
      '</linearGradient></defs>' +
      '<rect width="' + w + '" height="' + h + '" fill="url(#g)"/>' +
      composeArt(w, h, p, seed) +
      /* Readability scrim: the composition behind the label is now varied and
         can put any colour under it, so outline the text in the opposite
         luminance instead of trusting a fixed fill. */
      '<rect x="0" y="' + (h * 0.34) + '" width="' + w + '" height="' + (h * 0.3) + '" fill="' +
      (relLum(b) > 0.4 ? '#000000' : '#ffffff') + '" opacity="0.14"/>' +
      '<text x="' + (w / 2) + '" y="' + (h * 0.5) + '" font-family="Inter,Arial,sans-serif" font-size="' + (h * 0.09) +
      '" font-weight="800" letter-spacing="6" text-anchor="middle" fill="' + d +
      '" stroke="' + (relLum(b) > 0.4 ? '#ffffff' : '#000000') +
      '" stroke-width="3" paint-order="stroke" opacity="0.92">' +
      (label || 'DEMO').toUpperCase() + '</text>' +
      '</svg>'
    );
  }

  /* ---------------------------------------------------------- brand logo */
  function strHash(s) {
    var h = 0; s = String(s || '');
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  function hexLum(hex) {
    var m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(hex || ''));
    if (!m) return 0.5;
    var s = m[1];
    if (s.length === 3) s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
    var r = parseInt(s.slice(0, 2), 16) / 255;
    var g = parseInt(s.slice(2, 4), 16) / 255;
    var b = parseInt(s.slice(4, 6), 16) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function relLum(hex) {           /* WCAG-style contrast ke liye gamma-corrected */
    var l = hexLum(hex);
    return l <= 0.03928 ? l / 12.92 : Math.pow((l + 0.055) / 1.055, 2.4);
  }

  function contrast(a, b) {
    var la = relLum(a), lb = relLum(b);
    var hi = Math.max(la, lb), lo = Math.min(la, lb);
    return (hi + 0.05) / (lo + 0.05);
  }

  /**
   * Har style ka apna logo mark — palette se hi banta hai (offline).
   * Agar kabhi kisi style me `logoSvg` field add karo to wahi override kar deti hai.
   */
  function logoMark(style) {
    if (style && style.logoSvg) return style.logoSvg;   /* authored override */

    var p = (style && style.palette) || ['#111827', '#6366f1', '#e5e7eb', '#f9fafb'];
    var bg = p[1] || p[0] || '#111827';

    /* bg ke against sabse zyada readable colour = fg, doosra best = accent */
    var others = [p[0], p[2], p[3]].filter(Boolean);
    if (!others.length) others = ['#ffffff'];
    others.sort(function (x, y) { return contrast(y, bg) - contrast(x, bg); });
    var fg = others[0];
    var accent = (others[1] && contrast(others[1], bg) >= 1.4) ? others[1] : (relLum(bg) > 0.4 ? '#000000' : '#ffffff');

    var h = strHash((style && style.id) || (style && style.name) || 'da');
    var shapes = [
      '<rect x="1.5" y="1.5" width="29" height="29" rx="' + (6 + (h % 7)) + '" fill="' + bg + '"/>',
      '<circle cx="16" cy="16" r="14.5" fill="' + bg + '"/>',
      '<path d="M16 1.5 30.5 16 16 30.5 1.5 16Z" fill="' + bg + '"/>',
      '<path d="M16 1.5 28.6 8.75v14.5L16 30.5 3.4 23.25V8.75Z" fill="' + bg + '"/>'
    ];

    var letter = (((style && style.name) || 'D').replace(/[^A-Za-z0-9 ]/g, '').trim().charAt(0) || 'D').toUpperCase();
    var label = escapeHTML(((style && style.name) || 'Design') + ' logo');

    return '<svg class="demo-logo-mark" viewBox="0 0 32 32" role="img" aria-label="' + label + '">' +
      shapes[h % shapes.length] +
      '<text x="16" y="16" text-anchor="middle" dominant-baseline="central" ' +
      'font-family="Inter,Segoe UI,Arial,sans-serif" font-size="15" font-weight="800" fill="' + fg + '">' +
      letter + '</text>' +
      '<circle cx="26.5" cy="5.5" r="3" fill="' + accent + '"/>' +
      '</svg>';
  }

  /* --------------------------------------------------------- mini site UI */
  function section(id, label) {
    return '<a class="showcase-jump" href="#show-' + id + '" data-jump="' + id + '">' + escapeHTML(label) + '</a>';
  }

  function buildSite(style) {
    var p = style.palette || ['#fff', '#000', '#888', '#111'];
    var name = escapeHTML(style.name);
    var vibe = escapeHTML(style.vibe);
    var cat = escapeHTML(style.category);
    var heroArt = makeArt(style, 'hero', style.name);

    var features = [
      { icon: 'zap', t: 'Adaptive System', d: 'Tokens jo har breakpoint par khud ko tune karte hain.' },
      { icon: 'palette', t: 'Motion Language', d: 'Ek hi easing vocabulary, poore product me consistent.' },
      { icon: 'star', t: 'Accessible Core', d: 'Focus rings, contrast aur reduced-motion by default.' }
    ];
    var gallery = ['Field Notes', 'Studio Frame', 'Colour Study', 'Type Poster', 'Interface', 'Motion Reel'];
    var plans = [
      { n: 'Starter', p: '$0', f: ['1 project', 'Community support', 'Basic tokens'], hi: false },
      { n: 'Studio', p: '$29', f: ['Unlimited projects', 'Priority support', 'Full token export'], hi: true },
      { n: 'Enterprise', p: 'Talk', f: ['SSO + audit log', 'Design ops review', 'Custom skins'], hi: false }
    ];
    var rows = [
      { id: 'AUR-1042', c: 'Northwind Studio', s: 'Shipped', v: '$18,400' },
      { id: 'AUR-1043', c: 'Bluepeak Labs', s: 'In review', v: '$9,250' },
      { id: 'AUR-1044', c: 'Kite & Co.', s: 'Draft', v: '$4,100' },
      { id: 'AUR-1045', c: 'Vertex Retail', s: 'Shipped', v: '$27,900' },
      { id: 'AUR-1046', c: 'Halcyon Media', s: 'Blocked', v: '$6,780' },
      { id: 'AUR-1047', c: 'Solstice Labs', s: 'In review', v: '$12,050' },
      { id: 'AUR-1048', c: 'Orchid Health', s: 'Shipped', v: '$31,200' },
      { id: 'AUR-1049', c: 'Juniper Works', s: 'Draft', v: '$2,940' },
      { id: 'AUR-1050', c: 'Cobalt Freight', s: 'In review', v: '$8,610' },
      { id: 'AUR-1051', c: 'Beacon Legal', s: 'Shipped', v: '$15,750' },
      { id: 'AUR-1052', c: 'Nimbus Cloud', s: 'Blocked', v: '$5,320' },
      { id: 'AUR-1053', c: 'Amber Foods', s: 'Draft', v: '$11,480' }
    ];

    return '' +
      /* styles apply here: */ '<div class="' + escapeHTML(style.cssClass) + '">' +
      '<div class="demo-page">' +

      /* ---------------- 1. HEADER + NAV + SEARCH + DROPDOWNS ---------------- */
      '<header id="show-header" class="demo-header">' +
        '<div class="demo-brand">' +
          '<span class="demo-logo">' + logoMark(style) + '</span>' +
          '<span class="demo-brand-name">' + name + '</span>' +
        '</div>' +
        '<nav class="demo-nav" aria-label="Demo navigation">' +
          '<a href="#show-header" data-jump="header">' + icon('home') + ' Home</a>' +
          '<span class="demo-nav-item" data-demo-dropdown>' +
            '<button type="button" class="demo-dropdown-trigger demo-nav-parent" data-demo-dropdown-toggle style="background:none;border:0;color:inherit;font:inherit;cursor:pointer;padding:.15rem 0;opacity:.78;">' +
              icon('layers') + ' Products ' + icon('chevron-down', '', '.7em') +
            '</button>' +
            '<div class="demo-nav-menu">' +
              '<a href="#show-features" data-jump="features">' + icon('zap') + ' Performance</a>' +
              '<a href="#show-gallery" data-jump="gallery">' + icon('image') + ' Media Kit</a>' +
              '<a href="#show-pricing" data-jump="pricing">' + icon('box') + ' Pricing</a>' +
            '</div>' +
          '</span>' +
          '<a href="#show-gallery" data-jump="gallery">' + icon('grid') + ' Gallery</a>' +
          '<a href="#show-docs" data-jump="docs">' + icon('file') + ' Docs</a>' +
          '<a href="#show-pricing" data-jump="pricing">' + icon('star') + ' Pricing</a>' +
          '<a href="#show-contact" data-jump="contact">' + icon('mail') + ' Contact</a>' +
        '</nav>' +
        '<div class="demo-header-actions">' +
          '<div class="demo-search" role="search">' +
            icon('search') +
            '<input type="search" class="demo-input" placeholder="Search the demo…" aria-label="Search demo" data-demo-search>' +
          '</div>' +

          /* Notification bell + dropdown */
          '<span class="demo-dropdown" data-demo-dropdown>' +
            '<button type="button" class="demo-btn demo-btn-ghost demo-dropdown-trigger" data-demo-dropdown-toggle aria-label="Notifications" aria-haspopup="true">' +
              icon('bell') +
              '<span class="demo-badge-dot" aria-hidden="true"><span>3</span></span>' +
            '</button>' +
            '<div class="demo-dropdown-menu demo-box" role="menu">' +
              '<div class="demo-dropdown-head">Notifications</div>' +
              '<button type="button" class="demo-dropdown-item" role="menuitem">' + icon('check') +
                '<span><strong>Deployment passed</strong><small>production-main · 2 min ago</small></span></button>' +
              '<button type="button" class="demo-dropdown-item" role="menuitem">' + icon('alert') +
                '<span><strong>3 pending reviews</strong><small>Design queue · 18 min ago</small></span></button>' +
              '<button type="button" class="demo-dropdown-item" role="menuitem">' + icon('info') +
                '<span><strong>New token version</strong><small>v2.4 released · 1 hr ago</small></span></button>' +
              '<div class="demo-dropdown-foot">' +
                '<button type="button" class="demo-dropdown-item" role="menuitem" data-demo-action="mark-all">' + icon('check') +
                  '<span><strong>Mark all as read</strong></span></button>' +
              '</div>' +
            '</div>' +
          '</span>' +

          /* User menu */
          '<span class="demo-dropdown" data-demo-dropdown>' +
            '<button type="button" class="demo-dropdown-trigger" data-demo-dropdown-toggle aria-haspopup="true" aria-label="Account menu" ' +
              'style="background:none;border:0;cursor:pointer;padding:.15rem;color:inherit;">' +
              '<img class="demo-avatar" style="width:2rem;height:2rem;border-radius:.6rem" src="' + makeArt(style, 'avatar') + '" alt="" width="96" height="96">' +
              icon('chevron-down', '', '.7em') +
            '</button>' +
            '<div class="demo-dropdown-menu demo-box" role="menu">' +
              '<div class="demo-dropdown-head">Ada Lovelace · Pro</div>' +
              '<button type="button" class="demo-dropdown-item" role="menuitem">' + icon('user') + '<span><strong>Profile</strong></span></button>' +
              '<button type="button" class="demo-dropdown-item" role="menuitem" data-demo-action="settings">' + icon('settings') + '<span><strong>Settings</strong></span></button>' +
              '<button type="button" class="demo-dropdown-item" role="menuitem" data-demo-action="docs">' + icon('file') + '<span><strong>Docs</strong>' + icon('external', '', '.75em') + '</span></button>' +
              '<div class="demo-dropdown-foot">' +
                '<button type="button" class="demo-dropdown-item" role="menuitem" data-demo-action="signout">' + icon('logout') + '<span><strong>Sign out</strong></span></button>' +
              '</div>' +
            '</div>' +
          '</span>' +

          '<button type="button" class="demo-btn demo-tip" data-tip="Free 14-day trial" data-demo-action="cta">' +
            'Get started</button>' +
        '</div>' +
      '</header>' +

      /* ---------------- 2. HERO ---------------- */
      '<section class="demo-hero" id="show-hero">' +
        '<div class="demo-hero-copy">' +
          '<span class="demo-chip">' + cat + ' style · live demo</span>' +
          '<h1 class="demo-h1">' + name + ' brings your product to life.</h1>' +
          '<p class="demo-lead">' + vibe + '. Yahi poora page usi design language me bana hai — ' +
            'header, images, cards, table, form aur footer tak.</p>' +
          '<div class="demo-hero-cta">' +
            '<button type="button" class="demo-btn demo-btn-lg" data-demo-action="cta">' + icon('zap', '', '1.05em') + ' Start free trial</button>' +
            '<button type="button" class="demo-btn demo-btn-lg demo-btn-ghost" data-demo-action="watch">' + icon('play', '', '1.05em') + ' Watch reel</button>' +
          '</div>' +
          '<dl class="demo-stats">' +
            '<div><dt>Components</dt><dd>128</dd></div>' +
            '<div><dt>Tokens</dt><dd>331 tags</dd></div>' +
            '<div><dt>Frameworks</dt><dd>7</dd></div>' +
          '</dl>' +
        '</div>' +
        '<figure class="demo-hero-art">' +
          '<img src="' + heroArt + '" alt="' + name + ' abstract hero artwork" loading="lazy" width="800" height="500">' +
          '<figcaption>Generated artwork — palette ' + escapeHTML(p[0]) + ' · ' + escapeHTML(p[1]) + '</figcaption>' +
        '</figure>' +
      '</section>' +

      /* ---------------- 3. MARQUEE ---------------- */
      '<section class="demo-marquee" aria-label="Trusted by">' +
        '<span>NORTHWIND</span><span>BLUEPEAK</span><span>KITE &amp; CO.</span><span>AXIOM</span><span>LUMEN</span>' +
      '</section>' +

      /* ---------------- 4. FEATURES (with tabs) ---------------- */
      '<section id="show-features" class="demo-section">' +
        '<header class="demo-section-head">' +
          '<h2 class="demo-h2">Everything in one design system</h2>' +
          '<p>Teen core pillars — jaisa is style me component behave karte hain.</p>' +
        '</header>' +
        '<div class="demo-box" style="padding:1rem 1.15rem">' +
          '<div class="demo-tabs" role="tablist" aria-label="Feature views">' +
            '<button type="button" class="demo-tab" role="tab" aria-selected="true" aria-controls="showtab-overview" id="tabbtn-overview">Overview</button>' +
            '<button type="button" class="demo-tab" role="tab" aria-selected="false" aria-controls="showtab-variants" id="tabbtn-variants">Variants</button>' +
            '<button type="button" class="demo-tab" role="tab" aria-selected="false" aria-controls="showtab-usage" id="tabbtn-usage">Usage</button>' +
          '</div>' +
          '<div class="demo-tab-panel" role="tabpanel" id="showtab-overview" aria-labelledby="tabbtn-overview">' +
            '<div class="demo-grid demo-grid-3" style="padding-top:1rem">' +
              features.map(function (f) {
                return '<article class="demo-card" style="border:1px solid color-mix(in srgb, currentColor 16%, transparent);border-radius:.8rem">' +
                  '<span class="demo-card-icon" aria-hidden="true">' + icon(f.icon) + '</span>' +
                  '<h3 class="demo-h3">' + f.t + '</h3>' +
                  '<p>' + f.d + '</p>' +
                  '<button type="button" class="demo-btn demo-btn-ghost demo-tip" data-tip="Opens component docs" data-demo-action="more">Learn more ' + icon('arrow-right', '', '.8em') + '</button>' +
                  '</article>';
              }).join('') +
            '</div>' +
          '</div>' +
          '<div class="demo-tab-panel" role="tabpanel" id="showtab-variants" aria-labelledby="tabbtn-variants" hidden>' +
            '<p style="padding-top:1rem;margin:0;line-height:1.7;opacity:.85">Is style ke andar ' +
            '<b>4 button variants</b> (solid, outline, ghost, icon), <b>3 card elevations</b>, ' +
            '<b>2 input states</b> (default, focused) aur <b>animated hover</b> rules defined hain — ' +
            'scroll karke page ke har component par hover karke dekho.</p>' +
          '</div>' +
          '<div class="demo-tab-panel" role="tabpanel" id="showtab-usage" aria-labelledby="tabbtn-usage" hidden>' +
            '<p style="padding-top:1rem;margin:0;line-height:1.7;opacity:.85">Copy the CSS or Tailwind snippet from the ' +
            'showcase toolbar (<b>📋 / ⬇</b>), ya poore starter HTML ko download karke apne project me daalo. ' +
            'Har component isi style engine se styled hai.</p>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 5. GALLERY (images) ---------------- */
      '<section id="show-gallery" class="demo-section">' +
        '<header class="demo-section-head">' +
          '<h2 class="demo-h2">Gallery</h2>' +
          '<p>Images bhi isi palette se generate hoti hain — zero external requests.</p>' +
        '</header>' +
        '<div class="demo-grid demo-grid-3">' +
          gallery.map(function (g, i) {
            return '<figure class="demo-box demo-tile">' +
              '<img src="' + makeArt(style, 'tile', g) + '" alt="' + g + ' artwork" loading="lazy" width="640" height="480">' +
              '<figcaption><b>' + g + '</b><span>' + (i + 1) + ' / 6</span></figcaption>' +
              '</figure>';
          }).join('') +
        '</div>' +
      '</section>' +

      /* ---------------- 6. PRICING ---------------- */
      '<section id="show-pricing" class="demo-section">' +
        '<header class="demo-section-head"><h2 class="demo-h2">Pricing</h2><p>Har tier, same design language.</p></header>' +
        '<div class="demo-grid demo-grid-3">' +
          plans.map(function (pl) {
            return '<article class="demo-box demo-card' + (pl.hi ? ' demo-card-highlight' : '') + '">' +
              (pl.hi ? '<span class="demo-chip demo-chip-float">' + icon('star-filled', '', '.85em') + ' Most popular</span>' : '') +
              '<h3 class="demo-h3">' + pl.n + '</h3>' +
              '<p class="demo-price">' + pl.p + '<small>/mo</small></p>' +
              '<ul class="demo-list">' + pl.f.map(function (x) { return '<li>' + icon('check', '', '.85em') + ' ' + x + '</li>'; }).join('') + '</ul>' +
              '<button type="button" class="demo-btn' + (pl.hi ? '' : ' demo-btn-ghost') + ' demo-tip" data-tip="No credit card required" data-demo-action="plan">' +
                'Choose ' + pl.n + '</button>' +
              '</article>';
          }).join('') +
        '</div>' +
      '</section>' +

      /* ---------------- 7. TESTIMONIAL ---------------- */
      '<section class="demo-section">' +
        '<blockquote class="demo-box demo-quote">' +
          '<img class="demo-avatar" src="' + makeArt(style, 'avatar') + '" alt="" width="96" height="96">' +
          '<div>' +
            '<p>“Is style me humne poore dashboard ko 2 hafte me ship kiya — tokens hi kaafi the.”</p>' +
            '<cite>— Ada Lovelace, Head of Design at Northwind</cite>' +
          '</div>' +
        '</blockquote>' +
      '</section>' +

      /* ---------------- 8. TABLE (sortable + paginated) ---------------- */
      '<section id="show-table" class="demo-section">' +
        '<header class="demo-section-head"><h2 class="demo-h2">Data table</h2><p>Dense data bhi isi language me — sortable headers, pagination ke saath.</p></header>' +
        '<div class="demo-box demo-table-wrap" data-demo-table>' +
          '<table class="demo-table">' +
            '<thead><tr>' +
              '<th><button type="button" class="demo-th-sort" data-sort="id">Order ' + icon('chevron-down', '', '.7em') + '</button></th>' +
              '<th><button type="button" class="demo-th-sort" data-sort="c">Client ' + icon('chevron-down', '', '.7em') + '</button></th>' +
              '<th><button type="button" class="demo-th-sort" data-sort="s">Status ' + icon('chevron-down', '', '.7em') + '</button></th>' +
              '<th><button type="button" class="demo-th-sort" data-sort="v">Value ' + icon('chevron-down', '', '.7em') + '</button></th>' +
            '</tr></thead>' +
            '<tbody data-demo-tbody>' +
              rows.map(function (r) {
                return '<tr><td class="demo-mono">' + r.id + '</td><td>' + r.c + '</td>' +
                  '<td><span class="demo-tag">' + r.s + '</span></td><td class="demo-mono">' + r.v + '</td></tr>';
              }).join('') +
            '</tbody>' +
          '</table>' +
          '<div class="demo-pagination" data-demo-pagination>' +
            '<button type="button" class="demo-page-btn" data-demo-page="prev" disabled aria-label="Previous page">‹</button>' +
            '<button type="button" class="demo-page-btn" data-demo-page="1" aria-current="page">1</button>' +
            '<button type="button" class="demo-page-btn" data-demo-page="2">2</button>' +
            '<button type="button" class="demo-page-btn" data-demo-page="3">3</button>' +
            '<button type="button" class="demo-page-btn" data-demo-page="next" aria-label="Next page">›</button>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 8b. MODAL + SKELETON + ALERTS ---------------- */
      '<section id="show-modals" class="demo-section">' +
        '<header class="demo-section-head"><h2 class="demo-h2">Overlays &amp; states</h2><p>Dialog, skeletons, alerts — asli product patterns.</p></header>' +
        '<div class="demo-box" style="padding:1.2rem;display:grid;gap:1rem">' +
          '<div style="display:flex;flex-wrap:wrap;gap:.6rem">' +
            '<button type="button" class="demo-btn" data-demo-action="open-modal">Open dialog</button>' +
            '<button type="button" class="demo-btn demo-btn-ghost" data-demo-action="toggle-skeleton">Toggle skeleton loader</button>' +
            '<button type="button" class="demo-btn demo-btn-ghost" data-demo-action="toast-success">Success toast</button>' +
            '<button type="button" class="demo-btn demo-btn-ghost" data-demo-action="toast-error">Error toast</button>' +
          '</div>' +
          '<div class="demo-alert demo-alert-success">' + icon('check') + '<span>Payment method verified — billing active.</span></div>' +
          '<div class="demo-alert demo-alert-info">' + icon('info') + '<span>New version v2.4 available. Refresh to update.</span></div>' +
          '<div class="demo-alert demo-alert-error">' + icon('alert') + '<span>3 files failed to sync. Retry the upload.</span></div>' +
          '<div data-demo-skeleton hidden>' +
            '<div class="demo-skeleton demo-skeleton-line w-60"></div>' +
            '<div class="demo-skeleton demo-skeleton-line"></div>' +
            '<div class="demo-skeleton demo-skeleton-line w-80"></div>' +
            '<div class="demo-skeleton demo-skeleton-block" style="margin-top:.75rem"></div>' +
          '</div>' +
        '</div>' +
        '<div class="demo-modal-backdrop" data-demo-modal data-open="false">' +
          '<div class="demo-modal" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:.75rem">' +
              '<h3 id="demo-modal-title">Confirm project launch</h3>' +
              '<button type="button" class="demo-btn demo-btn-ghost" data-demo-action="close-modal" aria-label="Close dialog" style="padding:.35rem .55rem">' + icon('x') + '</button>' +
            '</div>' +
            '<p style="margin:0;font-size:.9rem;line-height:1.65">Ye <b>' + name + '</b> style ka dialog hai — backdrop blur, focus trap aur Esc close ke saath. ' +
              'Apne project me ise component ki tarah reuse karo.</p>' +
            '<label style="display:grid;gap:.3rem;font-size:.82rem;font-weight:700">Project name' +
              '<input type="text" class="demo-input" value="Aurora Launch" aria-label="Project name"></label>' +
            '<div class="demo-modal-actions">' +
              '<button type="button" class="demo-btn demo-btn-ghost" data-demo-action="close-modal">Cancel</button>' +
              '<button type="button" class="demo-btn" data-demo-action="confirm-modal">Launch</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 8c. DOCUMENTATION ---------------- */
      '<section id="show-docs" class="demo-section">' +
        '<header class="demo-section-head">' +
          '<h2 class="demo-h2">Documentation</h2>' +
          '<p>Is style ko apne project me kaise lagayein — setup, tokens, components aur rules.</p>' +
        '</header>' +
        '<div class="demo-grid demo-grid-2">' +
          '<div class="demo-box demo-docs-col">' +
            '<h3 class="demo-h3">' + icon('zap', '', '.95em') + ' Getting started</h3>' +
            '<ol class="demo-docs-steps">' +
              '<li>Toolbar se <b>CSS</b> ya <b>HTML</b> copy/download karo (button upar chrome me hain).</li>' +
              '<li>Wrapper par style root class <code class="demo-code">' + escapeHTML(style.cssClass) + '</code> lagao — baaki sab uske andar auto-apply hota hai.</li>' +
              '<li>Palette ko apne brand ke hisaab se override karo, ya Playground me live edit karo.</li>' +
            '</ol>' +
            '<pre class="demo-code-block" tabindex="0"><code>' + escapeHTML(
              '<div class="' + style.cssClass + '">\n' +
              '  <button class="demo-btn">Get started</button>\n' +
              '  <input class="demo-input" placeholder="Email">\n' +
              '  <div class="demo-box">Content</div>\n' +
              '</div>') + '</code></pre>' +
          '</div>' +
          '<div class="demo-box demo-docs-col">' +
            '<h3 class="demo-h3">' + icon('palette', '', '.95em') + ' Design tokens</h3>' +
            '<table class="demo-table demo-token-table">' +
              '<thead><tr><th>Role</th><th>Value</th><th>Swatch</th></tr></thead>' +
              '<tbody>' +
                [['Surface', p[0]], ['Ink', p[1]], ['Accent', p[2]], ['Muted', p[3]]].map(function (t, i) {
                  var v = t[1] || '#000000';
                  return '<tr><td class="demo-mono">' + t[0] + '</td><td class="demo-mono">' + escapeHTML(v) + '</td>' +
                    '<td><span class="demo-swatch" style="background:' + escapeHTML(v) + '" title="' + escapeHTML(v) + '"></span>' +
                    '<span class="demo-mono" style="opacity:.6;font-size:.72rem"> palette[' + i + ']</span></td></tr>';
                }).join('') +
              '</tbody>' +
            '</table>' +
            '<p class="demo-docs-note">' + icon('info', '', '.9em') + ' Tokens ko <code class="demo-code">:root</code> me override karke ek hi click me brand bana lo.</p>' +
          '</div>' +
        '</div>' +

        '<div class="demo-box demo-docs-col">' +
          '<h3 class="demo-h3">' + icon('layers', '', '.95em') + ' Component API</h3>' +
          '<div class="demo-table-wrap">' +
            '<table class="demo-table">' +
              '<thead><tr><th>Component</th><th>Variants</th><th>States</th></tr></thead>' +
              '<tbody>' +
                '<tr><td class="demo-mono">.demo-btn</td><td>solid, outline, ghost, icon</td><td>default, hover, active, disabled, focus-visible</td></tr>' +
                '<tr><td class="demo-mono">.demo-input</td><td>text, select, textarea, search</td><td>default, hover, focus, valid, invalid</td></tr>' +
                '<tr><td class="demo-mono">.demo-card</td><td>box, highlight, tile</td><td>default, hover, focus</td></tr>' +
                '<tr><td class="demo-mono">.demo-table</td><td>sortable, paginated</td><td>default, row hover, sorted asc/desc</td></tr>' +
                '<tr><td class="demo-mono">.demo-dropdown</td><td>notification, account, submenu</td><td>closed, open, keyboard focus</td></tr>' +
              '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>' +

        '<div class="demo-grid demo-grid-2">' +
          '<div class="demo-box demo-docs-col demo-docs-do">' +
            '<h3 class="demo-h3">' + icon('check', '', '.95em') + ' Do</h3>' +
            '<ul class="demo-list">' +
              '<li>Sirf palette ke 4 tokens use karo — contrast khud sahi rahega.</li>' +
              '<li>Hover me ek hi property badlo (shadow <i>ya</i> colour), don\'t nahi.</li>' +
              '<li><code class="demo-code">:focus-visible</code> ring ko kabhi remove mat karo.</li>' +
            '</ul>' +
          '</div>' +
          '<div class="demo-box demo-docs-col demo-docs-dont">' +
            '<h3 class="demo-h3">' + icon('alert', '', '.95em') + ' Don\'t</h3>' +
            '<ul class="demo-list">' +
              '<li>Accent colour ko body text ki tarah mat istemal karo.</li>' +
              '<li>Border-radius ko randomly mix mat karo — engine ki geometry consistent hai.</li>' +
              '<li>Font ko 3 se zyada weights me mat load karo (LCP kharab hota hai).</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------------- 9. FORM (with validation) ---------------- */
      '<section id="show-contact" class="demo-section demo-section-form">' +
        '<div class="demo-box demo-form-card">' +
          '<h2 class="demo-h2">Talk to the studio</h2>' +
          '<p>Form elements bhi wahi look follow karte hain — live validation ke saath.</p>' +
          '<form data-demo-form onsubmit="return false">' +
            '<label>Name<input type="text" class="demo-input" placeholder="Ada Lovelace" data-validate="required" aria-describedby="err-name">' +
              '<span class="demo-field-error" id="err-name">Name required hai.</span></label>' +
            '<label>Email<input type="email" class="demo-input" placeholder="ada@studio.com" data-validate="email" aria-describedby="err-email">' +
              '<span class="demo-field-error" id="err-email">Sahi email daalo (name@domain.com).</span></label>' +
            '<label>Project type' +
              '<select class="demo-input">' +
                '<option>Brand site</option><option>Product UI</option><option>Design system</option>' +
              '</select>' +
            '</label>' +
            '<label class="demo-checkbox"><input type="checkbox" checked> Send me the token pack</label>' +
            '<label>Brief<textarea class="demo-input" rows="3" placeholder="Kya banana hai?"></textarea></label>' +
            '<div data-demo-form-alerts></div>' +
            '<div class="demo-form-actions">' +
              '<button type="submit" class="demo-btn" data-demo-action="submit">' + icon('send', '', '.9em') + ' Send request</button>' +
              '<button type="reset" class="demo-btn demo-btn-ghost">Reset</button>' +
            '</div>' +
          '</form>' +
        '</div>' +
        '<aside class="demo-box demo-side-panel">' +
          '<h3 class="demo-h3">' + icon('info', '', '.95em') + ' Kind words</h3>' +
          '<p>Form validation states, focus rings aur hover behaviour sab yahin test karo.</p>' +
          '<div class="demo-progress"><span style="width:72%"></span></div>' +
          '<p class="demo-mono">72% complete</p>' +
          '<div class="demo-alert demo-alert-info">' + icon('clock') + '<span>Avg reply time: 4 hrs.</span></div>' +
        '</aside>' +
      '</section>' +

      /* ---------------- 10. FOOTER ---------------- */
      '<footer class="demo-footer" id="show-footer">' +
        '<div class="demo-footer-grid">' +
          '<div><b class="demo-brand-name">' + logoMark(style) + ' ' + name + '</b><p>' + cat + ' · Design Atlas demo</p></div>' +
          '<div><h4>Product</h4><a href="#show-features">' + icon('zap', '', '.8em') + ' Features</a><a href="#show-pricing">' + icon('star', '', '.8em') + ' Pricing</a><a href="#show-gallery">' + icon('image', '', '.8em') + ' Gallery</a></div>' +
          '<div><h4>Company</h4><a href="#show-table">' + icon('grid', '', '.8em') + ' Clients</a><a href="#show-contact">' + icon('mail', '', '.8em') + ' Contact</a></div>' +
          '<div><h4>Legal</h4><a href="#show-footer">' + icon('file', '', '.8em') + ' Privacy</a><a href="#show-footer">' + icon('file', '', '.8em') + ' Terms</a></div>' +
        '</div>' +
        '<div class="demo-footer-bar">' +
          '<span>© 2026 ' + name + ' Studio — demo content</span>' +
          '<span class="demo-footer-links"><a href="#show-header">' + icon('arrow-right', '', '.8em') + ' Back to top</a></span>' +
        '</div>' +
      '</footer>' +

      /* in-demo toast host */
      '<div class="demo-toasts" data-demo-toasts aria-live="polite"></div>' +

      '</div></div>';
  }

  /* ------------------------------------------------------------ chrome UI */
  function renderChrome(style, index, total) {
    if (chromeTitle) chromeTitle.textContent = style.name + ' — Full Page Demo';
    if (chromeBadge) chromeBadge.textContent = style.category;
    if (chromeCount) chromeCount.textContent = (index + 1) + ' / ' + total;
    if (chromeVibe) chromeVibe.textContent = style.vibe;
    if (chromeIndex) chromeIndex.textContent = '#' + (index + 1) + ' of ' + total + ' · ' + style.id;

    if (sectionNav) {
      sectionNav.innerHTML =
        section('header', 'Header') + section('hero', 'Hero') + section('features', 'Features') +
        section('gallery', 'Gallery') + section('pricing', 'Pricing') + section('table', 'Table') +
        section('docs', 'Docs') + section('contact', 'Form') + section('footer', 'Footer');
    }
  }

  /* ------------------------------------------------------------- behaviour */
  function styleList() {
    return (typeof STYLES_DATA !== 'undefined' ? STYLES_DATA : []).slice();
  }

  function move(delta) {
    var list = styleList();
    if (!list.length) return;
    var idx = list.findIndex(function (s) { return s.id === (currentStyle || {}).id; });
    idx = (idx + delta + list.length) % list.length;
    open(list[idx].id, true);
  }

  function toggleFullscreen() {
    if (!dialog || !dialog.showModal) return;
    if (document.fullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen();
      document.body.classList.remove('showcase-native-fullscreen');
    } else if (dialog.requestFullscreen) {
      dialog.requestFullscreen().then(function () {
        document.body.classList.add('showcase-native-fullscreen');
      }).catch(function () {
        document.body.classList.toggle('showcase-faux-fullscreen');
      });
    } else {
      document.body.classList.toggle('showcase-faux-fullscreen');
    }
  }

  function copyCurrentPrompt() {
    if (!currentStyle) return;
    var text = typeof buildDetailedPrompt === 'function' ? buildDetailedPrompt(currentStyle) : currentStyle.prompt;
    if (typeof copyPrompt === 'function') copyPrompt(text, currentStyle.name);
  }

  function downloadBoilerplate() {
    if (!currentStyle || !window.TokenExporter) return;
    var html = TokenExporter.generateStarterBoilerplate(currentStyle);
    TokenExporter.downloadFile(currentStyle.id + '-starter.html', html, 'text/html');
    if (typeof soundManager !== 'undefined' && soundManager.play) soundManager.play('success');
    if (typeof showToast === 'function') showToast('⬇ Downloaded ' + currentStyle.name + ' starter HTML');
  }

  function openPlayground() {
    if (!currentStyle) return;
    if (dialog && dialog.close) dialog.close();
    if (typeof switchView === 'function') switchView('playground', currentStyle.id);
  }

  function openOldDashboard() {
    if (!currentStyle || typeof STYLES_DATA === 'undefined') return;
    var item = STYLES_DATA.find(function (s) { return s.id === currentStyle.id; });
    if (!item) return;

    if (typeof soundManager !== 'undefined' && soundManager.play) soundManager.play('click');

    var modalEl = document.getElementById('style-modal');
    var modalTitle = document.getElementById('modal-title');
    var modalCategoryBadge = document.getElementById('modal-category-badge');
    var modalVibe = document.getElementById('modal-vibe');
    var modalBestfit = document.getElementById('modal-bestfit');
    var modalBody = document.getElementById('modal-body');
    var modalCopyPromptBtn = document.getElementById('modal-copy-prompt-btn');
    var modalTestPlaygroundBtn = document.getElementById('modal-test-playground-btn');
    var modalDownloadBoilerplateBtn = document.getElementById('modal-download-boilerplate-btn');

    if (modalTitle) modalTitle.textContent = item.name + ' — Full Interactive Dashboard';
    if (modalCategoryBadge) modalCategoryBadge.textContent = item.category;
    if (modalVibe) modalVibe.textContent = item.vibe;
    if (modalBestfit) modalBestfit.textContent = item.bestFit;

    if (modalCopyPromptBtn) modalCopyPromptBtn.onclick = function () {
      var text = typeof buildDetailedPrompt === 'function' ? buildDetailedPrompt(item) : item.prompt;
      if (typeof copyPrompt === 'function') copyPrompt(text, item.name);
    };
    if (modalTestPlaygroundBtn) modalTestPlaygroundBtn.onclick = function () { if (modalEl) modalEl.close(); if (typeof switchView === 'function') switchView('playground', item.id); };
    if (modalDownloadBoilerplateBtn && window.TokenExporter) {
      modalDownloadBoilerplateBtn.onclick = function () {
        var html = TokenExporter.generateStarterBoilerplate(item);
        TokenExporter.downloadFile(item.id + '-starter.html', html, 'text/html');
        if (typeof soundManager !== 'undefined' && soundManager.play) soundManager.play('success');
        if (typeof showToast === 'function') showToast('✔ Downloaded ' + item.name + ' Boilerplate!');
      };
    }

    if (modalBody && typeof generateDashboardHTML === 'function') {
      modalBody.innerHTML = generateDashboardHTML(item);
    }
    if (modalEl && modalEl.showModal) modalEl.showModal();
  }

  function demoToast(message) {
    if (typeof showToast === 'function') showToast(message);
    if (typeof soundManager !== 'undefined' && soundManager.play) soundManager.play('pop');
  }

  /* ------------------------------------------------- scroll reveal */
  var revealIO = null;
  function revealSections() {
    if (!stage) return;
    if (revealIO) { revealIO.disconnect(); revealIO = null; }

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') return; // no class added -> sab visible

    var targets = [].slice.call(stage.querySelectorAll('.demo-hero, .demo-section, .demo-footer'));
    if (!targets.length) return;

    // sirf tab add hota hai jab observer actually chalu ho — JS fail = content visible
    targets.forEach(function (el) { el.classList.add('demo-reveal'); });

    revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          revealIO.unobserve(en.target);
        }
      });
    }, { root: stage, rootMargin: '0px 0px -6% 0px', threshold: 0.04 });

    targets.forEach(function (el) { revealIO.observe(el); });

    // safety net: agar observer kisi wajah se fire na ho to pehla viewport reveal kar do
    window.setTimeout(function () {
      if (!stage) return;
      var vh = stage.clientHeight || 800;
      [].slice.call(stage.querySelectorAll('.demo-reveal:not(.is-visible)')).forEach(function (el) {
        if (el.getBoundingClientRect().top < vh) el.classList.add('is-visible');
      });
    }, 1600);
  }

  /* ------------------------------------------------- day/night preview
   `.da-night` invert-filter layer (styles.css SHOWCASE COMFORT LAYER) har
   style ka night look computationally deta hai — 103 engines ke har ek ke
   liye haath se dark variant likhna impractical hai. Persisted via
   localStorage key `daShowcaseNight` (safeLS), sirf showcase ke liye. */
  var NIGHT_KEY = 'daShowcaseNight';
  var nightOn = false;

  function setNight(on, announce) {
    var cv = stage ? stage.querySelector('.showcase-canvas') : null;
    if (!cv) return;
    cv.classList.toggle('da-night', !!on);
    nightOn = !!on;
    var btn = document.querySelector('[data-showcase-action="night"]');
    if (btn) {
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.textContent = on ? '☀️ Day' : '🌙 Night';
    }
    safeLS.set(NIGHT_KEY, on ? '1' : '0');
    if (announce) {
      if (typeof soundManager !== 'undefined' && soundManager.play) soundManager.play('click');
      if (typeof showToast === 'function') {
        showToast(on ? '🌙 Night preview on — invert-filter night look' : '☀️ Day preview — original colours');
      }
    }
  }

  function toggleNight() { setNight(!nightOn, true); }

  function restoreNight() { setNight(safeLS.get(NIGHT_KEY) === '1', false); }

  /* ------------------------------------------------------------- delegate */
  function onStageClick(e) {
    /* 1) Dropdown toggles (bell, user menu, nav submenu) */
    var toggle = e.target.closest ? e.target.closest('[data-demo-dropdown-toggle]') : null;
    if (toggle) {
      e.preventDefault();
      var host = toggle.closest('[data-demo-dropdown]');
      var wasOpen = host.getAttribute('data-open') === 'true';
      closeAllDropdowns(stage);
      if (!wasOpen) host.setAttribute('data-open', 'true');
      return;
    }
    /* click outside dropdown -> close */
    if (!(e.target.closest && e.target.closest('[data-demo-dropdown]'))) closeAllDropdowns(stage);

    /* 2) Tabs */
    var tabBtn = e.target.closest ? e.target.closest('.demo-tab') : null;
    if (tabBtn) {
      var tablist = tabBtn.parentElement;
      tablist.querySelectorAll('.demo-tab').forEach(function (b) { b.setAttribute('aria-selected', 'false'); });
      tabBtn.setAttribute('aria-selected', 'true');
      var sectionBox = tablist.parentElement;
      sectionBox.querySelectorAll('.demo-tab-panel').forEach(function (pnl) { pnl.hidden = true; });
      var panel = document.getElementById(tabBtn.getAttribute('aria-controls'));
      if (panel) panel.hidden = false;
      if (typeof soundManager !== 'undefined' && soundManager.play) soundManager.play('click');
      return;
    }

    /* 3) Table sort */
    var sortBtn = e.target.closest ? e.target.closest('.demo-th-sort') : null;
    if (sortBtn) { sortDemoTable(sortBtn); return; }

    /* 3b) Table pagination (prev / page number / next) */
    var pageBtn = e.target.closest ? e.target.closest('[data-demo-page]') : null;
    if (pageBtn) {
      if (pageBtn.disabled) return;
      changeDemoPage(pageBtn);
      return;
    }

    /* 4) Demo actions */
    var el = e.target.closest ? e.target.closest('[data-demo-action]') : null;
    if (!el) {
      /* Additive fallback (COMFORT LAYER): jis .demo-btn ka koi action hook
         nahi hai wo bhi zinda lage — press pulse + toast. Hooked buttons
         (dropdown/tab/sort/page/action) upar ke branches me khud return
         karte hain, isliye double feedback nahi hota. */
      var plainBtn = e.target.closest ? e.target.closest('.demo-btn') : null;
      if (plainBtn) {
        plainBtn.classList.remove('da-pressed');
        void plainBtn.offsetWidth; /* animation restart */
        plainBtn.classList.add('da-pressed');
        pushDemoToast('check', 'Button pressed — hover/focus/active/disabled states is engine me live hain.');
      }
      return;
    }
    var act = el.getAttribute('data-demo-action');

    if (act === 'cta') pushDemoToast('check', 'CTA clicked — yeh button us style me rendered hai');
    else if (act === 'watch') pushDemoToast('play', 'Demo reel (placeholder) — yahan video aayegi');
    else if (act === 'more') pushDemoToast('file', 'Detail page ka preview — content example');
    else if (act === 'plan') pushDemoToast('check', 'Checkout flow demo');
    else if (act === 'mark-all') { closeAllDropdowns(stage); pushDemoToast('check', 'Saare notifications read mark hue'); }
    else if (act === 'settings') { closeAllDropdowns(stage); pushDemoToast('settings', 'Settings panel demo'); }
    else if (act === 'docs') {
      closeAllDropdowns(stage);
      var docsSec = document.getElementById('show-docs');
      if (docsSec) {
        docsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        pushDemoToast('file', 'Documentation section — setup, tokens aur API');
      }
    }
    else if (act === 'signout') { closeAllDropdowns(stage); pushDemoToast('logout', 'Sign out flow demo'); }
    else if (act === 'open-modal') openDemoModal(stage);
    else if (act === 'close-modal') closeDemoModal(stage);
    else if (act === 'confirm-modal') { closeDemoModal(stage); pushDemoToast('check', 'Project launched 🎉'); }
    else if (act === 'toggle-skeleton') {
      var sk = stage.querySelector('[data-demo-skeleton]');
      if (sk) { sk.hidden = !sk.hidden; pushDemoToast('info', sk.hidden ? 'Skeleton hidden' : 'Skeleton loader dikh raha hai'); }
    }
    else if (act === 'toast-success') pushDemoToast('check', 'Payment method verified — billing active.');
    else if (act === 'toast-error') pushDemoToast('alert', '3 files failed to sync. Retry the upload.');
    else if (act === 'submit') {
      validateDemoForm(el.closest('form'));
    }
  }

  function onStageSubmit(e) {
    e.preventDefault();
    validateDemoForm(e.target);
  }

  /* onStageInput: live validation while typing */
  function onStageInput(e) {
    var input = e.target;
    if (!input || !input.matches || !input.matches('[data-validate]')) return;
    if (input.classList.contains('is-invalid')) validateField(input);
  }

  /* ------------------------------------------------- dropdown helpers */
  function closeAllDropdowns(root) {
    if (!root) return;
    root.querySelectorAll('[data-demo-dropdown][data-open="true"]').forEach(function (d) { d.setAttribute('data-open', 'false'); });
  }

  /* ------------------------------------------------- demo toast host */
  function pushDemoToast(iconName, message) {
    var host = stage && stage.querySelector('[data-demo-toasts]');
    if (!host) return;
    var t = document.createElement('div');
    t.className = 'demo-toast';
    t.innerHTML = icon(iconName) + '<span>' + escapeHTML(message) + '</span>';
    host.appendChild(t);
    window.setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 3200);
    if (typeof soundManager !== 'undefined' && soundManager.play) soundManager.play('pop');
  }

  /* ------------------------------------------------- demo modal */
  function openDemoModal(root) {
    var m = root.querySelector('[data-demo-modal]');
    if (m) {
      m.setAttribute('data-open', 'true');
      var first = m.querySelector('input, button');
      if (first) first.focus();
    }
  }
  function closeDemoModal(root) {
    var m = root.querySelector('[data-demo-modal]');
    if (m) m.setAttribute('data-open', 'false');
  }

  /* ------------------------------------------------- table sort */
  var tableSortState = { key: null, asc: true };
  /* perPage = 4 (12 rows / 3 pages) — markup ke 3 page buttons se match karta hai */
  var tablePageState = { page: 1, perPage: 4 };

  /**
   * "$18,400" -> 18400 (numeric), "AUR-1042" -> null (text).
   * Pehle ka bug: "AUR-1042" se '-' bach jaata tha aur -1042 ban kar
   * order ulta ho jaata tha. Ab sirf pure numbers numeric treat hote hain.
   */
  function sortValue(s) {
    var t = String(s || '').trim();
    var n = t.replace(/[$,\s%]/g, '');
    if (/^-?\d+(\.\d+)?$/.test(n)) return parseFloat(n);
    return null;
  }

  function sortDemoTable(btn) {
    var key = btn.getAttribute('data-sort');
    var wrap = btn.closest('[data-demo-table]');
    if (!wrap) return;
    tableSortState.asc = tableSortState.key === key ? !tableSortState.asc : true;
    tableSortState.key = key;
    var tbody = wrap.querySelector('[data-demo-tbody]');
    var rowsArr = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
    var idx = Array.prototype.indexOf.call(btn.closest('tr').children, btn.closest('th'));
    rowsArr.sort(function (a, b) {
      var av = (a.children[idx].textContent || '').trim();
      var bv = (b.children[idx].textContent || '').trim();
      var an = sortValue(av);
      var bn = sortValue(bv);
      var cmp = (an !== null && bn !== null) ? an - bn : av.localeCompare(bv);
      return tableSortState.asc ? cmp : -cmp;
    });
    rowsArr.forEach(function (r) { tbody.appendChild(r); });
    /* order badla to current page par dobara lagao (page 1 par hi rahega) */
    renderDemoPage(wrap);
    if (typeof soundManager !== 'undefined' && soundManager.play) soundManager.play('click');
  }

  /* ------------------------------------------------- table pagination
     Pehle ye buttons sirf decoration the — koi handler hi nahi tha. Ab wo
     sach me rows swap karte hain, aria-current update karte hain, aur
     prev/next khud disable ho jate hain jab boundary par ho. */
  function renderDemoPage(root) {
    if (!root) return;
    /* root khud wrap ho sakta hai, ya uske andar, ya uske parent me */
    var wrap = root.closest ? root.closest('[data-demo-table]') : null;
    if (!wrap && root.querySelector) wrap = root.querySelector('[data-demo-table]');
    if (!wrap) return;
    var tbody = wrap.querySelector('[data-demo-tbody]');
    if (!tbody) return;

    var rows = tbody.querySelectorAll('tr');
    var per = tablePageState.perPage;
    var pages = Math.max(1, Math.ceil(rows.length / per));
    if (tablePageState.page > pages) tablePageState.page = pages;
    if (tablePageState.page < 1) tablePageState.page = 1;

    var start = (tablePageState.page - 1) * per;
    var end = start + per;
    for (var i = 0; i < rows.length; i++) {
      var show = i >= start && i < end;
      rows[i].hidden = !show;                 /* a11y ke liye */
      rows[i].style.display = show ? '' : 'none'; /* guarantee visual */
    }

    var pag = wrap.querySelector('[data-demo-pagination]');
    if (!pag) return;
    pag.querySelectorAll('[data-demo-page]').forEach(function (b) {
      var p = b.getAttribute('data-demo-page');
      if (p === 'prev') { b.disabled = tablePageState.page <= 1; return; }
      if (p === 'next') { b.disabled = tablePageState.page >= pages; return; }
      var n = parseInt(p, 10);
      if (isNaN(n) || n > pages) { b.hidden = true; b.disabled = true; return; }
      b.hidden = false;
      b.disabled = false;
      if (n === tablePageState.page) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    });
  }

  function changeDemoPage(btn) {
    var wrap = btn.closest ? btn.closest('[data-demo-table]') : null;
    if (!wrap) return;
    var p = btn.getAttribute('data-demo-page');
    if (p === 'prev') tablePageState.page -= 1;
    else if (p === 'next') tablePageState.page += 1;
    else tablePageState.page = parseInt(p, 10) || 1;
    renderDemoPage(wrap);
    if (typeof soundManager !== 'undefined' && soundManager.play) soundManager.play('click');
  }

  /* ------------------------------------------------- form validation */
  function validateField(input) {
    var rule = input.getAttribute('data-validate');
    var ok = true;
    var val = (input.value || '').trim();
    if (rule === 'required') ok = val.length > 0;
    else if (rule === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);
    input.classList.toggle('is-invalid', !ok);
    input.classList.toggle('is-valid', ok && val.length > 0);
    var errId = input.getAttribute('aria-describedby');
    var err = errId ? document.getElementById(errId) : null;
    if (err) err.classList.toggle('show', !ok);
    return ok;
  }

  function validateDemoForm(form) {
    if (!form) return;
    var valid = true;
    form.querySelectorAll('[data-validate]').forEach(function (input) {
      if (!validateField(input)) valid = false;
    });
    var alerts = form.querySelector('[data-demo-form-alerts]');
    if (alerts) {
      alerts.innerHTML = valid
        ? '<div class="demo-alert demo-alert-success">' + icon('check') + '<span>Form valid — submit ready.</span></div>'
        : '<div class="demo-alert demo-alert-error">' + icon('alert') + '<span>Kuch fields theek nahi hain.</span></div>';
    }
    if (valid) pushDemoToast('check', 'Demo form submitted successfully');
    else pushDemoToast('alert', 'Form validation failed — errors dekho');
  }

  function onDialogKeydown(e) {
    if (!dialog || !dialog.open) return;
    var t = e.target;
    var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT');
    if (e.key === 'Escape') {
      /* pehle andar ke overlays close, phir poora demo */
      var innerModal = stage && stage.querySelector('[data-demo-modal][data-open="true"]');
      var openDropdown = stage && stage.querySelector('[data-demo-dropdown][data-open="true"]');
      if (innerModal) { closeDemoModal(stage); return; }
      if (openDropdown) { closeAllDropdowns(stage); return; }
      close();
      if (typeof showToast === 'function') showToast('Esc dabaya — demo band');
    }
    else if (typing) return;
    else if (e.key === 'ArrowRight') { move(1); }
    else if (e.key === 'ArrowLeft') { move(-1); }
    else if (e.key === 'n' || e.key === 'N') { e.preventDefault(); toggleNight(); }
    else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); toggleFullscreen(); }
  }

  function onChromeClick(e) {
    var el = e.target.closest ? e.target.closest('[data-showcase-action]') : null;
    if (!el) return;
    var act = el.getAttribute('data-showcase-action');
    if (act === 'close') close();
    else if (act === 'prev') move(-1);
    else if (act === 'next') move(1);
    else if (act === 'night') toggleNight();
    else if (act === 'fullscreen') toggleFullscreen();
    else if (act === 'copy-prompt') copyCurrentPrompt();
    else if (act === 'boilerplate') downloadBoilerplate();
    else if (act === 'playground') openPlayground();
    else if (act === 'dashboard') openOldDashboard();
    else if (act === 'print') {
      if (typeof showToast === 'function') showToast('🖨 Demo print preview khul raha hai…');
      window.setTimeout(function () { window.print(); }, 150);
    }
  }

  /* ------------------------------------------------------------- wire/setup */
  function wire(force) {
    /* force = sirf refs dobara le (self-heal). Listeners ek hi baari lagte hain
       warna anonymous handlers (jump/search) har open() par stack hote jate the. */
    dialog = document.getElementById('showcase-dialog');
    stage = document.getElementById('showcase-stage');
    if (!dialog || !stage) return;
    chromeTitle = document.getElementById('showcase-title');
    chromeBadge = document.getElementById('showcase-badge');
    chromeCount = document.getElementById('showcase-count');
    chromeVibe = document.getElementById('showcase-vibe');
    chromeIndex = document.getElementById('showcase-index');
    sectionNav = document.getElementById('showcase-jumps');

    if (wired) return;   /* listeners pehle hi lag chuke hain */
    wired = true;

    var chrome = document.getElementById('showcase-chrome');
    if (chrome) chrome.addEventListener('click', onChromeClick);

    stage.addEventListener('click', onStageClick);
    stage.addEventListener('submit', onStageSubmit);
    stage.addEventListener('input', onStageInput);
    dialog.addEventListener('keydown', onDialogKeydown);

    /* Dropdown ab sirf stage ke andar ke click par band hota tha — chrome bar
       ya backdrop par click karne par khula reh jata tha. Ye har click sunta
       hai, par stage ke andar wale click stage ki apni logic par chhod deta hai. */
    document.addEventListener('click', function (e) {
      if (!dialog || !dialog.open || !stage) return;
      if (e.target && e.target.closest && e.target.closest('#showcase-stage')) return;
      closeAllDropdowns(stage);
    });

    // Jump links (smooth scroll, Reduced-motion respect)
    stage.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('[data-jump]') : null;
      if (!link) return;
      e.preventDefault();
      var target = document.getElementById('show-' + link.getAttribute('data-jump'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Demo search filters the visible gallery tiles
    stage.addEventListener('input', function (e) {
      var input = e.target.closest ? e.target.closest('[data-demo-search]') : null;
      if (!input) return;
      var q = input.value.trim().toLowerCase();
      stage.querySelectorAll('[id="show-gallery"] figure.demo-tile').forEach(function (fig) {
        var cap = (fig.querySelector('figcaption b') || {}).textContent || '';
        fig.style.display = !q || cap.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
      });
    });
  }

  /* --------------------------------------------------------------- public */
  function open(styleId, keepScroll) {
    wire(true);
    if (!dialog || !stage) return;
    var list = styleList();
    var style = list.find(function (s) { return s.id === styleId; });
    if (!style) return;
    currentStyle = style;

    var idx = list.findIndex(function (s) { return s.id === style.id; });
    renderChrome(style, idx, list.length);

    var scrollTop = keepScroll && stage.scrollTop ? stage.scrollTop : 0;
    stage.innerHTML =
      '<div class="showcase-canvas">' + buildSite(style) + '</div>' +
      '<div class="showcase-meta-note">ℹ️ Poora page <b>' + escapeHTML(style.name) +
      '</b> ke CSS engine (<span class="demo-mono">.' + escapeHTML(style.cssClass) + '</span>) se render ho raha hai. ' +
      'Image/art generated hain — koi external request nahi.</div>';

    stage.scrollTop = scrollTop;
    stage.scrollLeft = 0;
    if (!keepScroll) stage.scrollTop = 0;

    /* har style fresh state se start ho — table page 1 par */
    tablePageState.page = 1;
    renderDemoPage(stage);

    /* persisted Day/Night preference silently restore karo */
    restoreNight();

    revealSections();

    if (typeof soundManager !== 'undefined' && soundManager.play) soundManager.play('pop');
    if (dialog.showModal && !dialog.open) dialog.showModal();
    // Focus the close button-ish chrome for keyboard users
    var firstBtn = dialog.querySelector('[data-showcase-action="close"]');
    if (firstBtn) firstBtn.focus();
  }

  function close() {
    if (dialog && dialog.open) dialog.close();
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
    document.body.classList.remove('showcase-native-fullscreen');
  }

  window.DemoShowcase = {
    open: open,
    close: close,
    next: function () { move(1); },
    prev: function () { move(-1); },
    toggleFullscreen: toggleFullscreen,
    buildSite: buildSite,
    makeArt: makeArt,
    logoMark: logoMark,
    currentStyle: function () { return currentStyle; }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();
})();
