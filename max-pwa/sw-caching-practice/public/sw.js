const CACHE_STATIC_NAME = 'static-v3';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

self.addEventListener('install', event => {
  console.log('[Service Worker] Installing', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(cache => {
      cache.addAll([
        '/',
        '/index.html',
        '/src/js/main.js',
        '/src/js/material.min.js',
        '/src/css/app.css',
        '/src/css/main.css',
        'https://fonts.googleapis.com/css?family=Roboto:400,700',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating', event);
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Woker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res
        ? res
        : fetch(event.request)
            .then(serverRes => {
              return caches.open(CACHE_DYNAMIC_NAME).then(cache => {
                cache.put(event.request.url, serverRes.clone());
                return serverRes;
              });
            })
            .catch(console.log);
    })
  );
});
