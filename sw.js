/* Playora service worker — caches the shell, ignores video streams */
const VERSION  = 'v2';
const SHELL    = `playora-shell-${VERSION}`;
const RUNTIME  = `playora-runtime-${VERSION}`;

const SHELL_URLS = [
  './',
  './index.html',
  './manifest.json',

  // PWA Icons
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(SHELL)
      .then((c) => Promise.all(SHELL_URLS.map((u) => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== SHELL && k !== RUNTIME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  /* Never intercept video/audio — we play huge blobs and streams */
  const dest = req.destination;
  if (dest === 'video' || dest === 'audio') return;

  /* Navigation → network-first, fall back to cached shell when offline */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(() =>
        caches.match('./index.html').then((r) => r || caches.match('./'))
      )
    );
    return;
  }

  /* Same-origin assets → cache-first, refresh in background */
if (url.origin === self.location.origin) {
  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) {
        // cache hit → refresh in background, but keep worker alive
        e.waitUntil(
          fetch(req).then((res) => {
            if (res && res.ok) {
              const copy = res.clone();                    // ✅ clone NOW
              caches.open(SHELL)
                .then((c) => c.put(req, copy))
                .catch(() => {});
            }
            return res;
          }).catch(() => {})
        );
        return hit;
      }

      // cache miss → network, cache the clone, return original
      return fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();                        // ✅ clone NOW
          caches.open(SHELL)
            .then((c) => c.put(req, copy))
            .catch(() => {});
        }
        return res;
      });
    })
  );
  return;
}

/* Cross-origin (fonts, Tailwind, Lucide) → stale-while-revalidate */
e.respondWith(
  caches.open(RUNTIME).then(async (cache) => {
    const hit = await cache.match(req);
    const network = fetch(req).then((res) => {
      if (res && res.ok && (res.type === 'basic' || res.type === 'cors')) {
        const copy = res.clone();                          // clone first
        cache.put(req, copy).catch(() => {});              // ← RUNTIME, not SHELL
      }
      return res;
    }).catch(() => hit);
    return hit || network;
  })
);
});
