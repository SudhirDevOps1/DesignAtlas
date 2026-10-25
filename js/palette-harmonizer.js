/**
 * Design Atlas — Palette Harmonizer & Brand Color Customizer
 * Allows users to test any design style dynamically adapted to their brand's primary color.
 */

const PRESET_BRAND_PALETTES = [
  { name: "Default System", color: null },
  { name: "Royal Indigo", color: "#6366f1" },
  { name: "Electric Emerald", color: "#10b981" },
  { name: "Cyber Magenta", color: "#f43f5e" },
  { name: "Sunset Amber", color: "#f59e0b" },
  { name: "Sky Cyan", color: "#0ea5e9" },
  { name: "Amethyst Violet", color: "#a855f7" }
];

class PaletteHarmonizer {
  constructor() {
    this.storageKey = 'designatlas_brand_color';
    this.activeColor = typeof safeLS === 'object' ? safeLS.get(this.storageKey, null) : null;
    // Restore the saved brand color as soon as the document is ready
    if (typeof document !== 'undefined') {
      const boot = () => this.applyBrandColor(this.activeColor);
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
      else boot();
    }
  }

  setBrandColor(hexColor) {
    this.activeColor = hexColor;
    this.applyBrandColor(hexColor);
    if (typeof safeLS === 'object') {
      if (hexColor) safeLS.set(this.storageKey, hexColor);
      else safeLS.set(this.storageKey, '');
    }
    return hexColor;
  }

  applyBrandColor(hexColor) {
    const root = document.documentElement;
    if (!hexColor) {
      root.style.removeProperty('--user-brand-accent');
      root.style.removeProperty('--user-brand-glow');
      root.classList.remove('brand-harmonized');
      return;
    }

    root.style.setProperty('--user-brand-accent', hexColor);
    root.style.setProperty('--user-brand-glow', `${hexColor}55`);
    root.classList.add('brand-harmonized');
  }

  renderHarmonizerToolbar(containerId, onColorChangeCallback) {
    const el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = `
      <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">Brand Color:</span>
        <div class="flex items-center gap-1.5">
          ${PRESET_BRAND_PALETTES.map(p => `
            <button
              onclick="harmonizer.selectPreset('${p.color || ''}')"
              class="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-sky-500 transition"
              title="${p.name}"
            >
              ${p.color ? `<span class="w-3 h-3 rounded-full border border-black/10 inline-block" style="background-color: ${p.color}"></span>` : '<span>✦</span>'}
              <span class="text-[11px]">${p.name}</span>
            </button>
          `).join('')}

          <!-- Free-form brand color picker -->
          <label
            class="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-sky-500 transition cursor-pointer"
            title="Pick any custom brand color"
          >
            <input
              type="color"
              id="harmonizer-custom-color"
              value="${this.activeColor || '#6366f1'}"
              class="w-4 h-4 rounded border-0 p-0 bg-transparent cursor-pointer"
              aria-label="Custom brand color"
            >
            <span class="text-[11px]">Custom</span>
          </label>

          <button
            onclick="harmonizer.selectPreset('')"
            class="px-2.5 py-1 text-xs font-semibold rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 hover:border-rose-400 hover:text-rose-500 transition"
            title="Reset every accent back to the style's own palette"
          >
            ⟲ Reset
          </button>
        </div>
      </div>
      <p class="text-[10px] text-slate-400 mt-1 leading-snug">
        Recolors every live demo button, card edge and focus ring across all ${STYLES_DATA.length} styles to your brand hue — without touching the source CSS.
      </p>
    `;

    const picker = document.getElementById('harmonizer-custom-color');
    if (picker) {
      picker.addEventListener('input', (e) => this.selectPreset(e.target.value, true));
      picker.addEventListener('change', (e) => this.selectPreset(e.target.value));
    }

    this.onColorChange = onColorChangeCallback;
  }

  selectPreset(color, silent = false) {
    this.setBrandColor(color || null);
    if (this.onColorChange) this.onColorChange(color || null);
    if (silent) return;
    soundManager.play('pop');
    showToast(color ? `✔ Brand color applied: ${color}` : `Reset to style defaults`);
  }
}

const harmonizer = new PaletteHarmonizer();
