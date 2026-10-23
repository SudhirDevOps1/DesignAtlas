/**
 * Design Atlas — Global Command Palette (`Ctrl+K` / `Cmd+K`)
 * Universal spotlight search to jump to styles, switch app skins, toggle views, or export specs.
 */

class CommandPalette {
  constructor() {
    this.isOpen = false;
    this.selectedIndex = 0;
    this.results = [];
  }

  init() {
    this.createDOM();
    this.bindEvents();
  }

  createDOM() {
    const existing = document.getElementById('cmd-palette-modal');
    if (existing) return;

    const modal = document.createElement('div');
    modal.id = 'cmd-palette-modal';
    modal.className = 'fixed inset-0 z-50 bg-black/75 backdrop-blur-md hidden items-start justify-center pt-20 px-4';
    modal.innerHTML = `
      <div id="cmd-palette-card" class="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
        
        <!-- Search Input -->
        <div class="p-4 border-b border-slate-800 flex items-center gap-3">
          <span class="text-slate-400 text-lg">🔍</span>
          <input
            id="cmd-palette-input"
            type="text"
            placeholder="Type a style name, skin ('monolith'), or command..."
            class="w-full bg-transparent text-white placeholder-slate-500 outline-none text-sm font-semibold"
            autocomplete="off"
          >
          <kbd class="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">ESC</kbd>
        </div>

        <!-- Results List -->
        <div id="cmd-palette-results" class="flex-1 overflow-y-auto p-2 space-y-1">
          <!-- Dynamically populated -->
        </div>

        <!-- Footer -->
        <div class="px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
          <span>Navigate: ↑ / ↓ · Select: Enter</span>
          <span>Design Atlas Command Hub</span>
        </div>

      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.close();
    });
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.close();
      } else if (this.isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.moveSelection(1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.moveSelection(-1);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          this.executeSelected();
        }
      }
    });

    const input = document.getElementById('cmd-palette-input');
    if (input) {
      input.addEventListener('input', () => this.search(input.value));
    }
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  open() {
    this.isOpen = true;
    const modal = document.getElementById('cmd-palette-modal');
    const input = document.getElementById('cmd-palette-input');
    if (modal) modal.classList.remove('hidden');
    if (modal) modal.classList.add('flex');
    if (input) {
      input.value = '';
      input.focus();
    }
    this.search('');
    if (typeof soundManager !== 'undefined') soundManager.play('pop');
  }

  close() {
    this.isOpen = false;
    const modal = document.getElementById('cmd-palette-modal');
    if (modal) modal.classList.add('hidden');
    if (modal) modal.classList.remove('flex');
  }

  search(query) {
    const q = query.toLowerCase().trim();
    const actions = [];

    // 1. App Skin Actions
    actions.push(
      { type: 'skin', label: '🏛️ Switch App Skin: Monolith Architecture', action: () => appSkin.applySkin('monolith'), match: 'monolith skin theme basalt concrete' },
      { type: 'skin', label: '💎 Switch App Skin: Obsidian Glass', action: () => appSkin.applySkin('glass'), match: 'glass obsidian skin theme' },
      { type: 'skin', label: '⚡ Switch App Skin: Cyberpunk HUD Console', action: () => appSkin.applySkin('cyberpunk'), match: 'cyberpunk skin theme' },
      { type: 'skin', label: '🎨 Reset App Skin to Standard Modern UI', action: () => appSkin.applySkin('default'), match: 'default standard skin reset' }
    );

    // 2. Navigation Actions
    actions.push(
      { type: 'nav', label: '🏛️ Go to Main Gallery', action: () => switchView('gallery'), match: 'gallery home browse' },
      { type: 'nav', label: '⚔️ Open Versus Mode', action: () => switchView('compare'), match: 'compare versus side-by-side' },
      { type: 'nav', label: '🎛️ Open Component Playground', action: () => switchView('playground'), match: 'playground sandbox test' },
      { type: 'nav', label: '⏳ Open Historical Design Timeline', action: () => switchView('timeline'), match: 'timeline history eras' },
      { type: 'nav', label: '🎯 Open Style Matchmaker Quiz', action: () => switchView('quiz'), match: 'quiz matchmaker test' },
      { type: 'nav', label: '🪄 Open AI Prompt Studio', action: () => switchView('prompt-builder'), match: 'prompt studio generator ai' },
      { type: 'tool', label: '🎲 Surprise Me — Roll Random Style', action: () => rollRandomStyle(), match: 'roll random surprise dice' },
      { type: 'tool', label: '📑 Export Client Spec Sheet (PDF/Print)', action: () => exportClientMoodboard(), match: 'export print pdf moodboard spec' }
    );

    // 3. All Styles from STYLES_DATA
    if (typeof STYLES_DATA !== 'undefined') {
      STYLES_DATA.forEach(s => {
        actions.push({
          type: 'style',
          label: `${s.name} (${s.category})`,
          sub: s.vibe,
          action: () => openDashboardModal(s.id),
          match: `${s.name} ${s.category} ${s.vibe} ${s.tags.join(' ')}`
        });
      });
    }

    // Filter
    this.results = q ? actions.filter(a => a.match.toLowerCase().includes(q)) : actions.slice(0, 15);
    this.selectedIndex = 0;
    this.renderList();
  }

  renderList() {
    const list = document.getElementById('cmd-palette-results');
    if (!list) return;

    if (this.results.length === 0) {
      list.innerHTML = `<div class="p-6 text-center text-xs text-slate-500 font-mono">No matching commands or styles found.</div>`;
      return;
    }

    list.innerHTML = this.results.map((item, idx) => `
      <div
        onclick="cmdPalette.selectIndex(${idx})"
        class="px-3.5 py-2.5 rounded-xl text-xs cursor-pointer flex items-center justify-between transition-all ${
          idx === this.selectedIndex
            ? 'bg-sky-600 text-white shadow-md'
            : 'text-slate-200 hover:bg-slate-800'
        }"
      >
        <div class="flex flex-col truncate pr-2">
          <span class="font-bold truncate">${item.label}</span>
          ${item.sub ? `<span class="text-[10px] opacity-75 truncate mt-0.5">${item.sub}</span>` : ''}
        </div>
        <span class="text-[10px] font-mono opacity-60 uppercase shrink-0">${item.type}</span>
      </div>
    `).join('');
  }

  moveSelection(direction) {
    if (this.results.length === 0) return;
    this.selectedIndex = (this.selectedIndex + direction + this.results.length) % this.results.length;
    this.renderList();
    if (typeof soundManager !== 'undefined') soundManager.play('click');
  }

  selectIndex(idx) {
    this.selectedIndex = idx;
    this.executeSelected();
  }

  executeSelected() {
    const item = this.results[this.selectedIndex];
    if (item && item.action) {
      this.close();
      item.action();
    }
  }
}

const cmdPalette = new CommandPalette();
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => cmdPalette.init());
}
