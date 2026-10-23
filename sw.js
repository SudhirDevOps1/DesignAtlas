/*
 * Design Atlas — service worker
 * ---------------------------------------------------------------------------
 * Problem it solves: python's http.server sends NO Cache-Control, so the
 * browser heuristic-caches css/js and hands back STALE assets after an edit.
 * The workaround until now was a manual `?cb=` cache-bust. This worker makes
 * every same-origin request network-first WITH REVALIDATION instead:
 *
 *   fetch(req, { cache: 'no-cache' })   -> conditional request (304 when
 *                                           unchanged, full body when changed)
 *   -> always fresh while online
 *   -> cached copy used only when the network fails (offline)
 *
 * Cross-origin requests (Google Fonts) are NOT intercepted — they pass
 * straight through and are simply not available offline.
 *
 * Bump VERSION when you want to hard-drop every cached copy at once.
 * There is no skipWaiting(): a new worker waits for the next navigation,
 * so assets never swap out from under a page that is already running.
 */

const VERSION = 'design-atlas-v2';

/* Small precache so the first offline use works even if a file was never
   fetched. Everything else is cached opportunistically by the fetch handler.
   Individual failures are tolerated so one 404 cannot fail the install. */
const CORE = [
  'index.html',
  'css/styles.css',
  'css/features.css',
  'css/monolith-shell.css',
  'js/tailwind-browser.js',
  'js/data.js',
  'js/util.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) =>
      Promise.all(CORE.map((url) =>
        cache.add(new Request(url, { cache: 'no-cache' })).catch(() => null)
      ))
    )
  );
  /* no self.skipWaiting() — see header */
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== VERSION).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

function networkFirst(request) {
  return fetch(request, { cache: 'no-cache' })
    .then((response) => {
      if (response && response.ok && response.type === 'basic') {
        const copy = response.clone();
        caches.open(VERSION).then((cache) => cache.put(request, copy)).catch(() => {});
      }
      return response;
    })
    .catch(() =>
      caches.match(request).then((cached) => {
        if (cached) return cached;
        /* Navigations fall back to the shell so a hard-offline deep link
           still renders something usable instead of the browser error page. */
        if (request.mode === 'navigate') return caches.match('index.html');
        return undefined;
      })
    );
}

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch (err) {
    return;
  }

  /* Same-origin only. Everything else (fonts.gstatic.com etc.) passes through. */
  if (url.origin !== self.location.origin) return;

  event.respondWith(networkFirst(request));
});
