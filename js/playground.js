/**
 * Design Atlas — Interactive Component Playground Sandbox
 * Allows users and clients to test and tweak live interactive components across any design language.
 */

function renderPlaygroundView(containerId, initialStyleId = 'glassmorphism') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <!-- Playground Header -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span class="text-xs font-bold text-sky-500 uppercase tracking-widest">Interactive Sandbox</span>
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white">Component Testing Playground</h2>
          <p class="text-xs text-slate-500 mt-1">Interact with live buttons, inputs, sliders, and badges in your selected design language.</p>
        </div>

        <!-- Style Picker -->
        <div class="flex items-center gap-2">
          <label class="text-xs font-bold text-slate-400">Target Style:</label>
          <select id="pg-style-picker" class="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs font-bold focus:ring-2 focus:ring-sky-500 outline-none">
            ${STYLES_DATA.map(s => `<option value="${s.id}" ${s.id === initialStyleId ? 'selected' : ''}>${s.name} (${s.category})</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Playground Canvas & Controls Split -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
        
        <!-- Left: Live Editable Controls Sidebar -->
        <div class="space-y-5 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 class="font-bold text-sm text-slate-900 dark:text-white">🎛️ Sandbox Controls</h3>

          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Button Label:</label>
            <input id="pg-btn-label" type="text" value="Launch Workflow" class="w-full px-3 py-1.5 text-xs rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900">
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Metric Value:</label>
            <input id="pg-metric-val" type="text" value="$38,450.00" class="w-full px-3 py-1.5 text-xs rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900">
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Interactive Slider (<span id="pg-slider-num">72</span>%):</label>
            <input id="pg-slider" type="range" min="0" max="100" value="72" class="w-full accent-sky-500">
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Corner Radius (<span id="pg-radius-num">16</span>px):</label>
            <input id="pg-radius" type="range" min="0" max="40" value="16" class="w-full accent-sky-500">
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Surface Border (<span id="pg-border-num">0</span>px):</label>
            <input id="pg-border" type="range" min="0" max="6" value="0" class="w-full accent-sky-500">
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Canvas Padding (<span id="pg-pad-num">32</span>px):</label>
            <input id="pg-pad" type="range" min="8" max="64" value="32" class="w-full accent-sky-500">
          </div>

          <div class="flex items-center justify-between pt-2">
            <span class="text-xs font-semibold text-slate-600 dark:text-slate-400">Sound Feedback:</span>
            <button id="pg-sound-toggle-btn" class="px-3 py-1 text-xs font-bold rounded-lg border bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              🔊 Sounds: ${soundManager.enabled ? 'ON' : 'OFF'}
            </button>
          </div>

          <button
            id="pg-reset-btn"
            class="w-full px-3 py-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            ⟲ Reset sandbox controls
          </button>
        </div>

        <!-- Center & Right: Live Styled Canvas -->
        <div class="lg:col-span-2 flex flex-col gap-6">
          <div id="pg-canvas-container" class="rounded-2xl p-8 min-h-[420px] transition-all flex flex-col justify-between shadow-xl">
            <!-- Dynamic Components will render here -->
          </div>

          <!-- Code Export Tabs -->
          <div class="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-slate-300 border border-slate-800">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
              <span class="text-emerald-400 font-bold">📄 Production CSS & Snippet:</span>
              <div class="flex gap-2">
                <button id="pg-copy-tw-btn" class="px-3 py-1 rounded bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs transition">
                  Copy Tailwind
                </button>
                <button id="pg-copy-css-btn" class="px-3 py-1 rounded bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs transition">
                  Copy CSS
                </button>
              </div>
            </div>
            <pre id="pg-code-preview" class="overflow-x-auto text-[11px] text-sky-300 max-h-56"><code></code></pre>
          </div>
        </div>

      </div>
    </div>
  `;

  const picker = document.getElementById('pg-style-picker');
  const btnLabelInput = document.getElementById('pg-btn-label');
  const metricValInput = document.getElementById('pg-metric-val');
  const sliderInput = document.getElementById('pg-slider');
  const sliderNum = document.getElementById('pg-slider-num');
  const radiusInput = document.getElementById('pg-radius');
  const radiusNum = document.getElementById('pg-radius-num');
  const borderInput = document.getElementById('pg-border');
  const borderNum = document.getElementById('pg-border-num');
  const padInput = document.getElementById('pg-pad');
  const padNum = document.getElementById('pg-pad-num');
  const resetBtn = document.getElementById('pg-reset-btn');
  const soundToggleBtn = document.getElementById('pg-sound-toggle-btn');
  const canvasContainer = document.getElementById('pg-canvas-container');
  const codePreview = document.getElementById('pg-code-preview');
  const copyCssBtn = document.getElementById('pg-copy-css-btn');
  const copyTwBtn = document.getElementById('pg-copy-tw-btn');

  function updatePlayground() {
    const style = STYLES_DATA.find(s => s.id === picker.value) || STYLES_DATA[0];
    const btnLabel = btnLabelInput.value || 'Action';
    const metricVal = metricValInput.value || '$0.00';
    const sliderVal = sliderInput.value;
    const radius = radiusInput.value;
    const borderWidth = borderInput.value;
    const padding = padInput.value;

    canvasContainer.className = `rounded-2xl min-h-[420px] transition-all flex flex-col justify-between shadow-xl ${style.cssClass}`;
    canvasContainer.style.borderRadius = `${radius}px`;
    canvasContainer.style.padding = `${padding}px`;
    canvasContainer.style.border = borderWidth > 0
      ? `${borderWidth}px solid currentColor`
      : '';
    canvasContainer.style.setProperty('--pg-radius', `${radius}px`);

    canvasContainer.innerHTML = `
      <!-- Top Bar -->
      <div class="flex items-center justify-between pb-6 border-b border-current/20">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-widest opacity-75">${style.category} Engine</span>
          <h4 class="text-xl font-extrabold tracking-tight">${style.name} Showcase</h4>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs px-2.5 py-1 rounded-full border border-current font-semibold opacity-90">Status: Active</span>
        </div>
      </div>

      <!-- Center Components Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
        <!-- Interactive Card 1 -->
        <div class="demo-box p-5 rounded-2xl flex flex-col justify-between">
          <span class="text-xs font-bold opacity-75">Configured Metric</span>
          <div class="my-3 text-3xl font-black">${metricVal}</div>
          <div class="flex items-center gap-2">
            <button class="demo-btn px-4 py-2 text-xs font-bold rounded-xl" onclick="soundManager.play('${style.audioTone}')">
              ${btnLabel}
            </button>
            <button class="px-3 py-2 text-xs rounded-xl border border-current font-semibold opacity-75 hover:opacity-100" onclick="soundManager.play('click')">
              Cancel
            </button>
          </div>
        </div>

        <!-- Interactive Card 2 -->
        <div class="demo-box p-5 rounded-2xl flex flex-col justify-between gap-4">
          <span class="text-xs font-bold opacity-75">Live Form & Range</span>
          <input type="text" placeholder="Live test input..." class="demo-input px-3 py-2 text-xs w-full rounded-lg" oninput="soundManager.play('click')">
          <div>
            <div class="flex justify-between text-[11px] opacity-75 mb-1">
              <span>Slider Gauge</span>
              <span>${sliderVal}%</span>
            </div>
            <div class="w-full h-2 rounded-full bg-current/20 overflow-hidden">
              <div class="h-full demo-btn" style="width: ${sliderVal}%;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-current/20 text-xs">
        <span class="opacity-80">Style Tone: <strong>${style.audioTone}</strong></span>
        <button class="demo-btn px-3 py-1.5 text-xs font-bold rounded-lg" onclick="copyStylePrompt('${style.id}', event)">
          Copy ${style.name} AI Prompt 📋
        </button>
      </div>
    `;

    codePreview.textContent = style.cssSnippet;

    const safeCopy = (payload, label) => {
      const doCopy = typeof copyText === 'function'
        ? copyText(payload)
        : navigator.clipboard.writeText(payload).then(() => true);
      Promise.resolve(doCopy).then(ok => {
        if (typeof soundManager !== 'undefined') soundManager.play(ok ? 'success' : 'heavy');
        if (typeof showToast === 'function') {
          showToast(ok ? `✔ Copied ${style.name} ${label}!` : '⚠ Copy blocked — use Ctrl+C');
        }
      });
    };

    copyCssBtn.onclick = () => safeCopy(style.cssSnippet, 'CSS snippet');
    if (copyTwBtn) copyTwBtn.onclick = () => safeCopy(style.tailwindSnippet, 'Tailwind markup');
  }

  picker.addEventListener('change', () => {
    soundManager.play('click');
    updatePlayground();
  });
  btnLabelInput.addEventListener('input', updatePlayground);
  metricValInput.addEventListener('input', updatePlayground);
  sliderInput.addEventListener('input', () => {
    sliderNum.textContent = sliderInput.value;
    updatePlayground();
  });

  // NEW: geometry controls
  if (radiusInput) radiusInput.addEventListener('input', () => {
    radiusNum.textContent = radiusInput.value;
    updatePlayground();
  });
  if (borderInput) borderInput.addEventListener('input', () => {
    borderNum.textContent = borderInput.value;
    updatePlayground();
  });
  if (padInput) padInput.addEventListener('input', () => {
    padNum.textContent = padInput.value;
    updatePlayground();
  });

  // NEW: reset every sandbox control to its default
  if (resetBtn) resetBtn.addEventListener('click', () => {
    btnLabelInput.value = 'Launch Workflow';
    metricValInput.value = '$38,450.00';
    sliderInput.value = 72;
    radiusInput.value = 16;
    borderInput.value = 0;
    padInput.value = 32;
    sliderNum.textContent = '72';
    radiusNum.textContent = '16';
    borderNum.textContent = '0';
    padNum.textContent = '32';
    soundManager.play('pop');
    if (typeof showToast === 'function') showToast('⟲ Sandbox controls reset');
    updatePlayground();
  });

  soundToggleBtn.addEventListener('click', () => {
    const isEnabled = soundManager.toggle();
    soundToggleBtn.textContent = `🔊 Sounds: ${isEnabled ? 'ON' : 'OFF'}`;
  });

  updatePlayground();
}
