/**
 * Design Atlas — App Shell Skinning Engine
 * Enables Design Atlas itself to morph its entire UI into Monolith, Glass, or Cyberpunk
 */

/* Skin → sprite icon mapping (real SVGs from the index-only icon sprite) */
const APP_SKINS = [
  { id: 'default', name: 'Standard Modern UI', iconRef: 'palette' },
  { id: 'monolith', name: 'Monolith Architectural Basalt', iconRef: 'box' },
  { id: 'glass', name: 'Obsidian Liquid Glass', iconRef: 'layers' },
  { id: 'cyberpunk', name: 'Cyberpunk HUD Console', iconRef: 'zap' }
];

/* Inline <use> markup — app-skin.js is index-only, where the sprite lives */
function appSkinIcon(name) {
  return '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-' +
    String(name || 'palette').replace(/[^a-z0-9-]/gi, '') + '"></use></svg>';
}

class AppSkinManager {
  constructor() {
    this.storageKey = 'designatlas_app_skin';
    this.currentSkin = (typeof safeLS === 'object'
      ? safeLS.get(this.storageKey, null)
      : (function () { try { return localStorage.getItem('designatlas_app_skin'); } catch (e) { return null; } })()
    ) || 'default';
  }

  init() {
    this.applySkin(this.currentSkin, false);
  }

  applySkin(skinId, playAudio = true) {
    this.currentSkin = skinId;
    if (typeof safeLS === 'object') safeLS.set(this.storageKey, skinId);
    else { try { localStorage.setItem(this.storageKey, skinId); } catch (e) {} }

    // Remove all skin classes
    document.body.classList.remove('skin-monolith', 'skin-glass', 'skin-cyberpunk');

    if (skinId !== 'default') {
      document.body.classList.add(`skin-${skinId}`);
    }

    const skinObj = APP_SKINS.find(s => s.id === skinId);

    // Update banner indicator if present
    const indicator = document.getElementById('skin-indicator-text');
    if (indicator) {
      indicator.innerHTML = skinObj ? appSkinIcon(skinObj.iconRef) + ' ' + skinObj.name : skinId;
    }

    // Update the header skin button
    const iconEl = document.getElementById('app-skin-icon');
    if (iconEl && skinObj) iconEl.innerHTML = appSkinIcon(skinObj.iconRef);
    const btn = document.getElementById('app-skin-btn');
    if (btn && skinObj) btn.title = `App Skin: ${skinObj.name} — click to cycle`;

    if (playAudio && typeof soundManager !== 'undefined') {
      if (skinId === 'monolith') {
        soundManager.play('heavy');
      } else if (skinId === 'glass') {
        soundManager.play('chime');
      } else if (skinId === 'cyberpunk') {
        soundManager.play('terminal');
      } else {
        soundManager.play('click');
      }
    }

    if (playAudio && typeof showToast === 'function') {
      showToast(`🏛️ App Skin Transformed: ${skinObj ? skinObj.name : skinId}!`);
    }
  }

  toggleMonolith() {
    if (this.currentSkin === 'monolith') {
      this.applySkin('default');
    } else {
      this.applySkin('monolith');
    }
  }

  cycleNextSkin() {
    const currentIdx = APP_SKINS.findIndex(s => s.id === this.currentSkin);
    const nextIdx = (currentIdx + 1) % APP_SKINS.length;
    this.applySkin(APP_SKINS[nextIdx].id);
  }
}

const appSkin = new AppSkinManager();
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => appSkin.init());
}
