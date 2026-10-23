/**
 * Design Atlas — Style Comparison / Versus Engine
 * Enables side-by-side comparative inspection between any 2 design styles in real time.
 */

function renderCompareView(containerId, initialStyleA = 'glassmorphism', initialStyleB = 'neobrutalism') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span class="text-xs font-bold text-sky-500 uppercase tracking-widest">Side-by-Side Studio</span>
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white">Style Versus / Comparison Mode</h2>
          <p class="text-xs text-slate-500 mt-1">Directly compare aesthetics, micro-interactions, color swatches, and AI prompts side by side.</p>
        </div>

        <!-- Style Pickers -->
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <select id="compare-select-a" aria-label="Style A" class="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-sky-500 outline-none">
            ${STYLES_DATA.map(s => `<option value="${s.id}" ${s.id === initialStyleA ? 'selected' : ''}>Style A: ${s.name}</option>`).join('')}
          </select>
          <span class="text-xs font-black text-rose-500 px-2 py-1 rounded bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900">VS</span>
          <select id="compare-select-b" aria-label="Style B" class="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-sky-500 outline-none">
            ${STYLES_DATA.map(s => `<option value="${s.id}" ${s.id === initialStyleB ? 'selected' : ''}>Style B: ${s.name}</option>`).join('')}
          </select>
          <button
            id="compare-swap-btn"
            title="Swap Style A and Style B"
            class="p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition font-bold text-sm"
          >
            ⇄
          </button>
          <button
            id="compare-random-btn"
            title="Roll two random styles"
            class="p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition font-bold text-sm"
          >
            🎲
          </button>
        </div>
      </div>

      <!-- Split Screen Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
        <div id="compare-col-a"></div>
        <div id="compare-col-b"></div>
      </div>
    </div>
  `;

  const selectA = document.getElementById('compare-select-a');
  const selectB = document.getElementById('compare-select-b');

  function updateColumns() {
    const styleA = STYLES_DATA.find(s => s.id === selectA.value) || STYLES_DATA[0];
    const styleB = STYLES_DATA.find(s => s.id === selectB.value) || STYLES_DATA[1];

    document.getElementById('compare-col-a').innerHTML = renderStyleColumn(styleA, 'Style A');
    document.getElementById('compare-col-b').innerHTML = renderStyleColumn(styleB, 'Style B');
  }

  selectA.addEventListener('change', () => {
    soundManager.play('click');
    updateColumns();
  });
  selectB.addEventListener('change', () => {
    soundManager.play('click');
    updateColumns();
  });

  // NEW: swap the two sides in place
  const swapBtn = document.getElementById('compare-swap-btn');
  if (swapBtn) {
    swapBtn.addEventListener('click', () => {
      const a = selectA.value;
      selectA.value = selectB.value;
      selectB.value = a;
      soundManager.play('pop');
      updateColumns();
      if (typeof showToast === 'function') showToast('⇄ Styles swapped');
    });
  }

  // NEW: roll two random opponents
  const randomBtn = document.getElementById('compare-random-btn');
  if (randomBtn) {
    randomBtn.addEventListener('click', () => {
      const rand = () => STYLES_DATA[Math.floor(Math.random() * STYLES_DATA.length)].id;
      selectA.value = rand();
      selectB.value = rand();
      soundManager.play('chime');
      updateColumns();
      if (typeof showToast === 'function') showToast('🎲 Rolled a random matchup!');
    });
  }

  updateColumns();
}

/** Clipboard-safe prompt copy shared by the compare columns. */
function compareCopyPrompt(text, name, event) {
  if (event) event.stopPropagation();
  if (typeof copyText !== 'function') {
    navigator.clipboard.writeText(text);
    return;
  }
  copyText(text).then(ok => {
    if (typeof soundManager !== 'undefined') soundManager.play(ok ? 'success' : 'heavy');
    if (typeof showToast === 'function') {
      showToast(ok ? `✔ Copied AI Prompt for ${name}!` : '⚠ Copy blocked — use Ctrl+C');
    }
  });
}

function renderStyleColumn(style, label) {
  return `
    <div class="flex flex-col gap-5 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-slate-50 dark:bg-slate-900/60">
      <!-- Title & Tags -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-xs font-extrabold px-2 py-0.5 rounded bg-sky-500 text-white">${label}</span>
          <h3 class="text-xl font-black text-slate-900 dark:text-white">${style.name}</h3>
        </div>
        <span class="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">${style.category}</span>
      </div>

      <p class="text-xs text-slate-600 dark:text-slate-400"><strong>Pehchaan:</strong> ${style.vibe}</p>
      <p class="text-xs text-slate-500"><strong>Best Fit:</strong> ${style.bestFit}</p>

      <!-- Palette Chips -->
      <div>
        <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Color Palette:</span>
        <div class="flex gap-2">
          ${style.palette.map(c => `
            <div class="flex items-center gap-1.5 text-[10px] font-mono bg-white dark:bg-slate-800 border dark:border-slate-700 rounded px-2 py-1">
              <span class="w-3.5 h-3.5 rounded border border-black/10 inline-block" style="background-color: ${c}"></span>
              <span>${c}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Live Interactive Demo Box in this Style -->
      <div class="p-6 rounded-2xl ${style.cssClass} shadow-lg transition-all flex flex-col gap-4">
        <div class="flex items-center justify-between text-xs font-bold opacity-80 uppercase">
          <span>${style.name} Live Sandbox</span>
          <span class="text-[10px] font-mono">$8,940.00</span>
        </div>

        <div class="demo-box p-4 rounded-xl flex flex-col gap-3">
          <div class="text-xs font-bold">Interactive Component Card</div>
          <p class="text-[11px] opacity-80 leading-relaxed">Testing touch targets, elevation, and visual rhythm.</p>
          <div class="flex gap-2 items-center">
            <input type="text" placeholder="Type here..." class="demo-input px-3 py-1.5 text-xs w-full rounded">
            <button class="demo-btn px-4 py-1.5 text-xs font-bold rounded whitespace-nowrap" onclick="soundManager.play('${style.audioTone}')">
              Button
            </button>
          </div>
        </div>
      </div>

      <!-- Prompt Copy Card -->
      <div class="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs flex flex-col justify-between gap-3">
        <div class="text-emerald-400 font-bold text-[11px]">📋 AI Production Prompt (detailed brief):</div>
        <p class="text-[11px] leading-relaxed opacity-90">${escapeHTML(typeof buildDetailedPrompt === 'function' ? buildDetailedPrompt(style).split('\n').slice(0, 6).join(' ') : style.prompt)}</p>
        <div class="flex flex-wrap gap-2">
          <button
            onclick="copyStylePrompt('${escapeJSString(style.id)}', event)"
            class="self-start px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] transition shadow"
          >
            Copy Prompt
          </button>
          <button
            onclick="compareCopyPrompt('${escapeJSString(style.cssSnippet)}', '${escapeJSString(style.name)} CSS', event)"
            class="self-start px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold text-[11px] transition shadow"
          >
            Copy CSS
          </button>
        </div>
      </div>

      <!-- Raw Code Accordion -->
      <details class="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3">
        <summary class="font-bold cursor-pointer text-slate-700 dark:text-slate-300">View Raw CSS Code</summary>
        <pre class="mt-3 p-3 bg-slate-950 text-sky-300 rounded font-mono text-[11px] overflow-x-auto"><code>${escapeHTML(style.cssSnippet)}</code></pre>
      </details>

      <details class="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3">
        <summary class="font-bold cursor-pointer text-slate-700 dark:text-slate-300">View Tailwind Markup</summary>
        <pre class="mt-3 p-3 bg-slate-950 text-indigo-300 rounded font-mono text-[11px] overflow-x-auto"><code>${escapeHTML(style.tailwindSnippet)}</code></pre>
      </details>
    </div>
  `;
}
