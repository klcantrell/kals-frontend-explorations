self.addEventListener('install', event => {
  console.log('[Service Worker] Installing Service Worker...', event);
  event.waitUntil(
    caches.open('static').then(cache => {
      console.log('[Service Worker] Precaching App Shell');
      cache.add('/src/js/app.js');
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating Service Worker...', event);
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res ? res : fetch(event.request);
    })
  );
});
