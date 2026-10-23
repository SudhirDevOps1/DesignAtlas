/**
 * Design Atlas — Shadow & Elevation Physics Lab
 * Live interactive studio to tweak light angles, blur radii, offset distances, and colored ambient occlusions.
 */

function renderShadowLabView(containerId, initialStyleId = 'neobrutalism') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div class="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold text-sky-500 uppercase tracking-widest">Optical Elevation Physics</span>
          <h2 class="text-2xl font-black text-slate-900 dark:text-white">Shadow & Elevation Physics Lab</h2>
          <p class="text-xs text-slate-500 mt-1">Interact with physical light source coordinates, hard brutalist offsets, soft diffused blurs, and colored glow caustics.</p>
        </div>

        <div class="flex items-center gap-3">
          <label class="text-xs font-bold text-slate-500">Preset Style:</label>
          <select id="sl-style-select" class="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold outline-none">
            ${STYLES_DATA.map(s => `<option value="${s.id}" ${s.id === initialStyleId ? 'selected' : ''}>${s.name}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
        
        <!-- Controls Column -->
        <div class="space-y-4 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 class="font-bold text-sm text-slate-900 dark:text-white mb-2">🎛️ Light Physics Controls</h3>

          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span>X-Offset</span>
              <span id="sl-val-x" class="font-mono">8px</span>
            </div>
            <input type="range" id="sl-x" min="-40" max="40" value="8" class="w-full">
          </div>

          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span>Y-Offset</span>
              <span id="sl-val-y" class="font-mono">8px</span>
            </div>
            <input type="range" id="sl-y" min="-40" max="40" value="8" class="w-full">
          </div>

          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span>Blur Radius</span>
              <span id="sl-val-blur" class="font-mono">0px</span>
            </div>
            <input type="range" id="sl-blur" min="0" max="60" value="0" class="w-full">
          </div>

          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span>Spread Radius</span>
              <span id="sl-val-spread" class="font-mono">0px</span>
            </div>
            <input type="range" id="sl-spread" min="-10" max="30" value="0" class="w-full">
          </div>

          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span>Shadow Color & Opacity</span>
              <span id="sl-val-opacity" class="font-mono">100%</span>
            </div>
            <div class="flex gap-2 items-center">
              <input type="color" id="sl-color" value="#000000" class="w-10 h-8 rounded border border-slate-300">
              <input type="range" id="sl-opacity" min="0" max="100" value="100" class="flex-1">
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="pt-4 border-t border-slate-200 dark:border-slate-700">
            <span class="text-[11px] font-bold text-slate-400 block mb-2">QUICK PHYSICS PRESETS:</span>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <button onclick="applyShadowPreset(8, 8, 0, 0, '#000000', 1)" class="p-2 rounded bg-slate-200 dark:bg-slate-700 font-bold">Hard Monolith</button>
              <button onclick="applyShadowPreset(0, 20, 40, -5, '#38bdf8', 0.4)" class="p-2 rounded bg-slate-200 dark:bg-slate-700 font-bold">Glass Glow</button>
              <button onclick="applyShadowPreset(12, 16, 24, 0, '#6366f1', 0.25)" class="p-2 rounded bg-slate-200 dark:bg-slate-700 font-bold">Clay Soft</button>
              <button onclick="applyShadowPreset(0, 4, 12, 0, '#000000', 0.08)" class="p-2 rounded bg-slate-200 dark:bg-slate-700 font-bold">Minimalist Clean</button>
            </div>
          </div>
        </div>

        <!-- Live Preview Canvas -->
        <div class="lg:col-span-2 flex flex-col justify-between bg-slate-100 dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 min-h-[460px]">
          
          <div class="flex items-center justify-between text-xs text-slate-500 font-bold pb-4">
            <span>LIVE INTERACTIVE SURFACE</span>
            <span id="sl-indicator-box">Active Shadow</span>
          </div>

          <!-- Target Preview Card -->
          <div class="flex items-center justify-center my-auto p-4">
            <div id="sl-preview-card" class="w-full max-w-md p-8 rounded-2xl transition-all duration-150">
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs uppercase font-extrabold tracking-wider">Physics Test Surface</span>
                <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
              </div>
              <h4 class="text-2xl font-black mb-2" id="sl-preview-title">Monolith Block</h4>
              <p class="text-xs opacity-75 mb-6">Real-time light elevation simulation using pure CSS box-shadow equations.</p>
              <button class="demo-btn px-5 py-2.5 rounded-lg text-xs font-bold transition shadow">
                Interact with Surface
              </button>
            </div>
          </div>

          <!-- Generated CSS Output -->
          <div class="bg-black/80 rounded-xl p-4 border border-white/10 text-white font-mono text-xs flex items-center justify-between">
            <code id="sl-code-out" class="text-emerald-300">box-shadow: 8px 8px 0px 0px #000000;</code>
            <button onclick="copyShadowCode()" class="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 rounded text-xs font-bold">Copy CSS</button>
          </div>

        </div>

      </div>
    </div>
  `;

  bindShadowLabEvents();
}

function bindShadowLabEvents() {
  const selectStyle = document.getElementById('sl-style-select');
  const inX = document.getElementById('sl-x');
  const inY = document.getElementById('sl-y');
  const inBlur = document.getElementById('sl-blur');
  const inSpread = document.getElementById('sl-spread');
  const inColor = document.getElementById('sl-color');
  const inOpacity = document.getElementById('sl-opacity');

  function update() {
    const x = inX.value;
    const y = inY.value;
    const blur = inBlur.value;
    const spread = inSpread.value;
    const color = inColor.value;
    const opacity = (inOpacity.value / 100);

    document.getElementById('sl-val-x').textContent = `${x}px`;
    document.getElementById('sl-val-y').textContent = `${y}px`;
    document.getElementById('sl-val-blur').textContent = `${blur}px`;
    document.getElementById('sl-val-spread').textContent = `${spread}px`;
    document.getElementById('sl-val-opacity').textContent = `${inOpacity.value}%`;

    // Hex to RGBA
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;

    const shadowRule = `${x}px ${y}px ${blur}px ${spread}px ${rgba}`;
    const card = document.getElementById('sl-preview-card');
    if (card) {
      card.style.boxShadow = shadowRule;
    }

    const codeOut = document.getElementById('sl-code-out');
    if (codeOut) {
      codeOut.textContent = `box-shadow: ${shadowRule};`;
    }
  }

  [inX, inY, inBlur, inSpread, inColor, inOpacity].forEach(el => {
    el.addEventListener('input', update);
  });

  if (selectStyle) {
    selectStyle.addEventListener('change', () => {
      const style = STYLES_DATA.find(s => s.id === selectStyle.value);
      if (style) {
        const card = document.getElementById('sl-preview-card');
        card.className = `w-full max-w-md p-8 rounded-2xl transition-all duration-150 ${style.cssClass}`;
        document.getElementById('sl-preview-title').textContent = style.name;
        if (typeof soundManager !== 'undefined') soundManager.play('click');
      }
    });
  }

  // Trigger initial
  if (selectStyle) {
    const style = STYLES_DATA.find(s => s.id === selectStyle.value);
    if (style) {
      const card = document.getElementById('sl-preview-card');
      card.className = `w-full max-w-md p-8 rounded-2xl transition-all duration-150 ${style.cssClass}`;
      document.getElementById('sl-preview-title').textContent = style.name;
    }
  }
  update();
}

function applyShadowPreset(x, y, blur, spread, hex, opacity) {
  document.getElementById('sl-x').value = x;
  document.getElementById('sl-y').value = y;
  document.getElementById('sl-blur').value = blur;
  document.getElementById('sl-spread').value = spread;
  document.getElementById('sl-color').value = hex;
  document.getElementById('sl-opacity').value = opacity * 100;

  const event = new Event('input');
  document.getElementById('sl-x').dispatchEvent(event);
  if (typeof soundManager !== 'undefined') soundManager.play('pop');
}

function copyShadowCode() {
  const code = document.getElementById('sl-code-out').textContent;
  navigator.clipboard.writeText(code);
  if (typeof soundManager !== 'undefined') soundManager.play('success');
  if (typeof showToast === 'function') showToast('✔ Box shadow rule copied!');
}
