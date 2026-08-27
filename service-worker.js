const CACHE_NAME = 'pending-orders-dashboard-v2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Three tiers, in priority order:
// 1. The shared data file (data/pending_orders.xlsx) — this changes daily, so it must
//    ALWAYS be fetched fresh from the network. Never served from cache unless fully offline.
// 2. The dashboard's own HTML — network-first too, so code/feature updates show up on next
//    load instead of being stuck on whatever was cached at install time.
// 3. Everything else same-origin (icons, manifest) — cache-first, rarely changes, keeps the
//    app usable offline. Cross-origin (fonts, xlsx CDN library) — network-first with cache fallback.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isDataFile = isSameOrigin && url.pathname.endsWith('/data/pending_orders.xlsx');
  const isHTML = isSameOrigin && (req.mode === 'navigate' || url.pathname.endsWith('index.html') || url.pathname.endsWith('/'));

  if (isDataFile) {
    event.respondWith(
      fetch(req, { cache: 'no-store' }).catch(() => caches.match(req))
    );
    return;
  }

  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  if (isSameOrigin) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req))
    );
  } else {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req))
    );
  }
});
