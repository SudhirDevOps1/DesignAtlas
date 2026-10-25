#!/usr/bin/env node
/*
 * Design Atlas — zero-dependency verification suite.
 *
 *   node verify.js
 *
 * There is no package.json, bundler, linter or test runner in this repo, so
 * this file IS the check. It is deliberately dependency-free: it only uses
 * node:fs, node:path, node:vm and the two browser globals the site already
 * ships (js/data.js and js/util.js are require()able).
 *
 * Exit code 0 = all checks pass, 1 = at least one failure.
 *
 * What it guards (each of these has actually bitten this project):
 *   - syntax of every js file AND of the inline <script> blocks in the HTML
 *     (node --check only covers the standalone files, never the inline ones)
 *   - data integrity: unique ids, required fields, 4-colour palettes
 *   - the 76 .style-* engines in css/styles.css staying in sync with data.js
 *   - file wiring: no orphan js, no dead <script src>, load order intact
 *   - CSP + service worker present on every page
 *   - window.STYLES_DATA never reappearing (it is undefined by design)
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = __dirname;
let failures = 0;
let checks = 0;

function ok(label, detail) {
  checks++;
  process.stdout.write(`  ok   ${label}${detail ? ` — ${detail}` : ''}\n`);
}

function fail(label, detail) {
  checks++;
  failures++;
  process.stdout.write(`  FAIL ${label}${detail ? ` — ${detail}` : ''}\n`);
}

function check(label, condition, detail) {
  if (condition) ok(label, detail);
  else fail(label, detail);
}

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function listJs() {
  return fs.readdirSync(path.join(ROOT, 'js'))
    .filter((f) => f.endsWith('.js'))
    .sort();
}

const HTML_PAGES = ['index.html', 'compare.html', 'playground.html', 'prompt-builder.html', 'tokens.html', 'uikit.html'];

/* ------------------------------------------------------------------ *
 * 1. Syntax — standalone files (vm.Script parses without executing)
 * ------------------------------------------------------------------ */
function sectionSyntax() {
  process.stdout.write('\n[1] Syntax\n');
  for (const file of listJs()) {
    try {
      new vm.Script(read(path.join('js', file)), { filename: file });
      ok(`js/${file}`);
    } catch (err) {
      fail(`js/${file}`, err.message.split('\n')[0]);
    }
  }
}

/* ------------------------------------------------------------------ *
 * 2. Syntax — inline <script> blocks in the HTML pages
 * ------------------------------------------------------------------ */
function sectionInline() {
  process.stdout.write('\n[2] Inline <script> blocks\n');
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  for (const page of HTML_PAGES) {
    const html = read(page);
    const blocks = [...html.matchAll(re)];
    check(`${page}: has inline scripts`, blocks.length > 0, `${blocks.length} block(s)`);
    blocks.forEach((m, i) => {
      try {
        new vm.Script(m[1], { filename: `${page}#inline${i + 1}` });
        ok(`${page} inline #${i + 1}`);
      } catch (err) {
        fail(`${page} inline #${i + 1}`, err.message.split('\n')[0]);
      }
    });
  }
}

/* ------------------------------------------------------------------ *
 * 3. Data integrity
 * ------------------------------------------------------------------ */
function sectionData() {
  process.stdout.write('\n[3] Data integrity (js/data.js)\n');
  let data;
  try {
    data = require(path.join(ROOT, 'js', 'data.js')).STYLES_DATA;
  } catch (err) {
    fail('data.js loads', err.message);
    return null;
  }

  check('data.js require()s cleanly', Array.isArray(data));
  check('non-empty catalogue', data.length > 0, `${data.length} styles`);

  const ids = data.map((s) => s.id);
  check('ids are unique', new Set(ids).size === ids.length, `${new Set(ids).size}/${ids.length}`);

  const required = ['id', 'name', 'category', 'cssClass', 'vibe', 'prompt', 'palette', 'cssSnippet', 'tailwindSnippet'];
  const missing = [];
  for (const s of data) {
    for (const k of required) {
      const v = s[k];
      if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) {
        missing.push(`${s.id}.${k}`);
      }
    }
  }
  check('every record has every required field', missing.length === 0, missing.length ? missing.slice(0, 5).join(', ') : `${required.length} fields × ${data.length}`);

  /* Palettes are CSS colours, not strictly hex: the glass/spatial styles
     deliberately carry translucent entries such as rgba(255,255,255,0.2). */
  const CSS_COLOUR = /^(#[0-9a-f]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\)|[a-z]+)$/i;
  const badPalette = data.filter((s) =>
    !Array.isArray(s.palette) ||
    s.palette.length !== 4 ||
    s.palette.some((c) => !CSS_COLOUR.test(String(c).trim()))
  );
  check('every palette is exactly 4 valid CSS colours', badPalette.length === 0, badPalette.length ? badPalette.slice(0, 5).map((s) => s.id).join(', ') : '4 colours for all');

  const rgba = data.filter((s) => s.palette.some((c) => /^rgba?\(/i.test(String(c))));
  ok('translucent palettes are allowed', `${rgba.length} style(s) use rgb/rgba`);

  const badClass = data.filter((s) => s.cssClass !== `style-${s.id}`);
  check('cssClass follows style-<id>', badClass.length === 0, badClass.length ? badClass.slice(0, 5).map((s) => s.id).join(', ') : 'consistent');

  return data;
}

/* ------------------------------------------------------------------ *
 * 4. Detailed prompt builder
 * ------------------------------------------------------------------ */
function sectionPrompts(data) {
  process.stdout.write('\n[4] Detailed prompts (js/util.js)\n');
  if (!data) return;
  let build;
  try {
    build = require(path.join(ROOT, 'js', 'util.js')).buildDetailedPrompt;
  } catch (err) {
    fail('util.js require()s cleanly', err.message);
    return;
  }
  check('buildDetailedPrompt exported', typeof build === 'function');

  const lens = data.map((s) => {
    try {
      return build(s).length;
    } catch (err) {
      return -1;
    }
  });
  const tooShort = data.filter((s, i) => lens[i] < 3000);
  const threw = data.filter((s, i) => lens[i] === -1);
  check('no style throws while building a prompt', threw.length === 0, threw.slice(0, 5).map((s) => s.id).join(', '));
  check('every prompt is a full brief (>= 3000 chars)', tooShort.length === 0,
    tooShort.length ? tooShort.slice(0, 5).map((s) => s.id).join(', ') : `min ${Math.min(...lens)} / max ${Math.max(...lens)}`);

  const first = build(data[0]);
  for (const marker of ['ART DIRECTION', 'COLOR SYSTEM', 'RESPONSIVE', 'ACCESSIBILITY', 'DELIVERABLE']) {
    check(`prompt contains "${marker}"`, first.includes(marker));
  }

  // Universal restyle spec is stack-agnostic: any project, any framework.
  for (const needle of ['STACK ADAPTATION', 'ACCEPTANCE CHECKLIST', 'PROTECTION', 'STATE MATRIX']) {
    check(`universal prompt contains "${needle}"`, first.includes(needle));
  }
  const htmlLocked = data.filter((s) => {
    const t = build(s);
    return t.includes('koi framework nahi') || t.includes('ek hi complete HTML file');
  });
  check('universal prompt installs on any stack (not HTML-locked)', htmlLocked.length === 0,
    htmlLocked.length ? htmlLocked.slice(0, 5).map((s) => s.id).join(', ') : `${data.length}/${data.length} stack-agnostic`);
  const narrowed = build(data[0], { stack: 'react' });
  check('stack option narrows the prompt (react)', narrowed.length < first.length && narrowed.includes('React (Vite)'), 'narrowing broken');
  const scoped = build(data[0], { scope: 'build' });
  check('build scope keeps the HTML fallback deliverable', scoped.includes('self-contained HTML file with one <style> block'), 'fallback lost');

  // Contrast advice must always resolve: the pair either passes AA outright,
  // or the brief names the computed --color-ink-strong fallback token.
  const unresolvedContrast = data.filter((s) => {
    const t = build(s);
    return !(t.includes('WCAG AA pass') || t.includes('--color-ink-strong'));
  });
  check('contrast advice always resolvable (AA pass or --color-ink-strong)', unresolvedContrast.length === 0,
    unresolvedContrast.length ? unresolvedContrast.slice(0, 5).map((s) => s.id).join(', ') : `${data.length}/${data.length} resolvable`);

  // ROLE must carry the detect-or-ask rule so a pasted prompt never stalls on [project].
  const noAsk = data.filter((s) => !build(s).includes('DETECT the target'));
  check('ROLE carries the detect-or-ask target rule', noAsk.length === 0,
    noAsk.length ? noAsk.slice(0, 5).map((s) => s.id).join(', ') : `${data.length}/${data.length} guarded`);

  // The spec (AI-facing) must be fully English: vibeEn gloss wins over Hinglish vibe.
  const hinglish = data.filter((s) => /zyada|saaf\b/i.test(build(s)));
  check('prompt STYLE DNA is fully English (vibeEn gloss applied)', hinglish.length === 0,
    hinglish.length ? hinglish.slice(0, 5).map((s) => s.id).join(', ') : 'all specs English');

  // Real-world Utility + Native categories must stay present in the collection.
  check('Utility and Native categories present', data.some((s) => s.category === 'Utility') && data.some((s) => s.category === 'Native'), 'categories missing');

  // Production polish: README, real sprite icons in the header chrome, no stale counts.
  const chromeSrc = read('index.html');
  check('README present', fs.existsSync(path.join(ROOT, 'README.md')), 'README.md missing');
  check('header uses sprite icons (no emoji nav)', /href="#i-home"/.test(chromeSrc) && /href="#i-type"/.test(chromeSrc), 'sprite icons missing');
  const harmonizerSrc = fs.readFileSync(path.join(ROOT, 'js', 'palette-harmonizer.js'), 'utf8');
  check('no stale "76" style count in copy', !/all 76 styles|76 UI Styles|76 Styles Available/.test(chromeSrc + harmonizerSrc), 'stale count found');
  check('harmonizer derives count from data', /STYLES_DATA\.length/.test(harmonizerSrc), 'hardcoded count found');
  check('showcase chrome has the Back-to-gallery button', /data-showcase-action="close"\s+title="Back to gallery/.test(chromeSrc), 'back button missing');
}

/* ------------------------------------------------------------------ *
 * 5. Style engines in css/styles.css must stay in sync with data.js
 * ------------------------------------------------------------------ */
function sectionEngines(data) {
  process.stdout.write('\n[5] CSS engines ↔ data records\n');
  if (!data) return;
  const css = read(path.join('css', 'styles.css'));

  /* Comments must be stripped first: styles.css documents its own conventions
     with placeholders like ".style-x", which a naive scan counts as an engine.
     Then read selector lists from each rule body — a descendant selector such
     as ".style-a .demo-btn" still contributes ".style-a". */
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const engines = new Set();
  for (const rule of stripped.split('}')) {
    const braceAt = rule.indexOf('{');
    if (braceAt < 0) continue;
    for (const m of rule.slice(0, braceAt).matchAll(/\.([a-z][a-z0-9-]*)/g)) {
      if (m[1].startsWith('style-')) engines.add(m[1]);
    }
  }

  check('styles.css defines a .style-* block per record', engines.size === data.length,
    `${engines.size} engines / ${data.length} records`);

  const noEngine = data.filter((s) => !css.includes(`.${s.cssClass}`));
  check('every record has a matching rule in styles.css', noEngine.length === 0,
    noEngine.length ? noEngine.slice(0, 5).map((s) => s.id).join(', ') : 'all matched');

  const ids = new Set(data.map((s) => s.cssClass));
  const orphanEngines = [...engines].filter((e) => !ids.has(e));
  check('no orphan engine without a data record', orphanEngines.length === 0,
    orphanEngines.slice(0, 5).join(', '));
}

/* ------------------------------------------------------------------ *
 * 6. Wiring — every referenced file exists, nothing is orphaned
 * ------------------------------------------------------------------ */
function sectionWiring() {
  process.stdout.write('\n[6] File wiring\n');

  const allJs = listJs();
  const referenced = new Set();
  let dangling = [];

  for (const page of HTML_PAGES) {
    /* Inline <script> bodies are not HTML: template literals such as
       `<img src="${src}">` are emitted at runtime and must not be mistaken for
       attributes. Strip those bodies, keeping the <script src> tags themselves. */
    const html = read(page).replace(/<script(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/gi, '');
    for (const m of html.matchAll(/\bsrc\s*=\s*"([^"]+)"/g)) {
      const src = m[1];
      if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) continue;
      referenced.add(src);
      if (!fs.existsSync(path.join(ROOT, src))) dangling.push(`${page} -> ${src}`);
    }
    for (const m of html.matchAll(/<link[^>]+href\s*=\s*"([^"]+)"/g)) {
      const href = m[1];
      if (/^(https?:)?\/\//.test(href) || href.startsWith('data:')) continue;
      referenced.add(href);
      if (!fs.existsSync(path.join(ROOT, href))) dangling.push(`${page} -> ${href}`);
    }
  }

  check('every local src/href exists', dangling.length === 0, dangling.slice(0, 5).join(', '));

  const orphans = allJs.filter((f) => ![...referenced].some((r) => r.replace(/^\.\//, '') === `js/${f}`));
  check('no orphan js file', orphans.length === 0, orphans.join(', '));

  check('service worker file present', fs.existsSync(path.join(ROOT, 'sw.js')));

  // Showcase comfort layer: Day/Night preview + press feedback must stay wired.
  const indexSrc = read('index.html');
  check('showcase chrome has the night toggle', /data-showcase-action="night"/.test(indexSrc), 'chrome button missing');
  const stylesCssSrc = fs.readFileSync(path.join(ROOT, 'css', 'styles.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  check('night invert layer lives in styles.css', /\.showcase-canvas\.da-night\s*\{[^}]*invert/.test(stylesCssSrc), 'invert rule missing');
  const showcaseSrc = fs.readFileSync(path.join(ROOT, 'js', 'demo-showcase.js'), 'utf8');
  check('night logic wired in demo-showcase', showcaseSrc.includes('function toggleNight') && showcaseSrc.includes('restoreNight()'), 'logic missing');
}

/* ------------------------------------------------------------------ *
 * 7. Load order + policy (the invariants documented in AGENTS.md)
 * ------------------------------------------------------------------ */
function sectionOrder() {
  process.stdout.write('\n[7] Load order, CSP, service worker\n');

  for (const page of HTML_PAGES) {
    const html = read(page);
    const dataIdx = html.indexOf('js/data.js');
    const utilIdx = html.indexOf('js/util.js');
    check(`${page}: data.js before util.js`, dataIdx >= 0 && utilIdx > dataIdx,
      `data@${dataIdx} util@${utilIdx}`);
    check(`${page}: sw-register.js wired`, html.includes('js/sw-register.js'));
    check(`${page}: CSP meta present`, html.includes('Content-Security-Policy'));
    check(`${page}: no window.STYLES_DATA`, !html.includes('window.STYLES_DATA'));
  }

  /* CSS cascade: styles.css -> features.css -> monolith-shell.css.
     Pages may link a subset (compare/uikit only need styles.css), so assert
     that whichever subset is present keeps the cascade order. index.html must
     carry all three, since the showcase .demo-* components depend on
     features.css winning ties after the engines. */
  const CASCADE = ['css/styles.css', 'css/features.css', 'css/monolith-shell.css'];
  for (const page of HTML_PAGES) {
    const html = read(page);
    const linked = CASCADE.filter((f) => html.includes(f));
    const positions = linked.map((f) => html.indexOf(f));
    const ascending = positions.every((v, i) => i === 0 || positions[i - 1] < v);
    check(`${page}: CSS link order intact`, linked.length === 0 || ascending,
      linked.join(' < ') || 'no local stylesheet');
  }
  check('index.html loads the full cascade', CASCADE.every((f) => read('index.html').includes(f)),
    CASCADE.join(' < '));

  /* The per-page check above covers the HTML and its inline scripts; this one
     covers the js/ sources, where assigning STYLES_DATA to window would
     silently change how every page resolves the identifier. */
  const leaked = listJs().filter((f) => read(path.join('js', f)).includes('window.STYLES_DATA'));
  check('no window.STYLES_DATA in any js source', leaked.length === 0, leaked.join(', '));
}

/* ------------------------------------------------------------------ *
 * 8. Helpers actually behave (cheap but catches a broken escape)
 * ------------------------------------------------------------------ */
function sectionHelpers() {
  process.stdout.write('\n[8] Helper behaviour\n');
  let u;
  try {
    u = require(path.join(ROOT, 'js', 'util.js'));
  } catch (err) {
    fail('util.js loads', err.message);
    return;
  }

  check('escapeHTML escapes angle brackets', u.escapeHTML('<b>&') === '&lt;b&gt;&amp;',
    JSON.stringify(u.escapeHTML('<b>&')));
  check('escapeJSString escapes quotes', /\\'|\\"/.test(u.escapeJSString("'\"")) === true,
    JSON.stringify(u.escapeJSString("'\"")));
  check('escapeJSString escapes line breaks', u.escapeJSString('a\nb').includes('\\n'));

  /* safeLS is an object, so test reachability rather than type — the point of
     the guard is that a Node consumer can get at every shared helper. */
  const exported = ['safeLS', 'copyText', 'copyTextFallback', 'escapeHTML', 'escapeJSString', 'clampNumber', 'icon', 'buildDetailedPrompt', 'copyStylePrompt'];
  const missing = exported.filter((k) => !(k in u));
  check('util.js exports the shared helpers', missing.length === 0,
    missing.length ? missing.join(', ') : `${exported.length} helpers`);

  /* Regression: copyStylePrompt was defined but left out of module.exports,
     which silently broke the documented "Node-requireable" contract. */
  check('copyStylePrompt is reachable from Node', typeof u.copyStylePrompt === 'function',
    typeof u.copyStylePrompt);
}

/* ------------------------------------------------------------------ */
function main() {
  process.stdout.write('Design Atlas verification\n');
  process.stdout.write(`root: ${ROOT}\n`);

  sectionSyntax();
  sectionInline();
  const data = sectionData();
  sectionPrompts(data);
  sectionEngines(data);
  sectionWiring();
  sectionOrder();
  sectionHelpers();

  process.stdout.write(`\n${'='.repeat(60)}\n`);
  process.stdout.write(`${checks - failures}/${checks} checks passed\n`);
  if (failures) {
    process.stdout.write(`FAILED (${failures} problem${failures === 1 ? '' : 's'})\n`);
    process.exitCode = 1;
  } else {
    process.stdout.write('ALL GREEN\n');
  }
}

main();
