/*
 * Design Atlas — service worker registration.
 * Separate file (not in util.js) so the helper library stays side-effect free.
 *
 * Guarded three ways: no navigator, no serviceWorker API, or a file:// page
 * (workers are not allowed there). Any registration failure is swallowed —
 * the site must behave identically whether or not the worker is present.
 */
(function () {
  'use strict';

  if (typeof navigator === 'undefined') return;
  if (!('serviceWorker' in navigator)) return;
  if (typeof location === 'undefined') return;
  if (!/^https?:$/.test(location.protocol)) return;

  function register() {
    /* Relative URL so the site also works served from a sub-directory. */
    navigator.serviceWorker.register('sw.js').catch(function () {
      /* Silent: a missing/failed sw.js must never surface as a page error. */
    });
  }

  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register);
})();
