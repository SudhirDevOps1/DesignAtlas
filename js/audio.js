/**
 * Design Atlas — Web Audio API Tactile Sound Synthesizer
 * Provides synthesized auditory feedback for UI testing (beeps, clicks, chimes, CRT blips)
 * Completely self-contained with no external audio file downloads.
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    // Hardened: localStorage can throw on file:// or in private mode
    this.enabled = (typeof safeLS === 'object'
      ? safeLS.get('designatlas_sound', 'false')
      : (function () { try { return localStorage.getItem('designatlas_sound'); } catch (e) { return 'false'; } })()
    ) === 'true';
  }

  init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (typeof safeLS === 'object') {
      safeLS.set('designatlas_sound', this.enabled ? 'true' : 'false');
    } else {
      try { localStorage.setItem('designatlas_sound', this.enabled ? 'true' : 'false'); } catch (e) {}
    }
    if (this.enabled) {
      this.play('chime');
    }
    return this.enabled;
  }

  play(tone = 'click') {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      switch (tone) {
        case 'click':
        case 'subtle':
          // Subtle mechanical click
          osc.type = 'sine';
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.start(now);
          osc.stop(now + 0.04);
          break;

        case 'pop':
          // Bouncy clay/pill pop
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(580, now + 0.08);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.08);
          break;

        case 'chime':
          // Glassy ethereal chime
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15);
          gain.gain.setValueAtTime(0.07, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
          osc.start(now);
          osc.stop(now + 0.22);
          break;

        case 'terminal':
          // CRT retro terminal blip
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(960, now);
          osc.frequency.setValueAtTime(1200, now + 0.02);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
          osc.start(now);
          osc.stop(now + 0.06);
          break;

        case 'pixel':
        case 'arcade':
          // 8-bit arcade arpeggio
          osc.type = 'square';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.setValueAtTime(660, now + 0.03);
          osc.frequency.setValueAtTime(880, now + 0.06);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
          break;

        case 'heavy':
          // Heavy brutalist thud
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(150, now);
          osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.08);
          break;

        case 'success':
          // Success prompt copy chime
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, now); // C5
          osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
          osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
          break;

        default:
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, now);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }
}

const soundManager = new SoundEngine();
