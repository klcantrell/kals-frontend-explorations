const CACHE_STATIC_NAME = 'static-v8';
const CACHE_DYNAMIC_NAME = 'dynamic-v2';

self.addEventListener('install', event => {
  console.log('[Service Worker] Installing Service Worker...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(cache => {
      console.log('[Service Worker] Precaching App Shell');
      cache.addAll([
        '/',
        '/index.html',
        '/offline.html',
        '/src/js/app.js',
        '/src/js/feed.js',
        '/src/js/material.min.js',
        '/src/css/app.css',
        '/src/css/feed.css',
        '/src/images/main-image.jpg',
        'https://fonts.googleapis.com/css?family=Roboto:400,700',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating Service Worker...', event);
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// cache first w/ network fallback strategy
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request).then(res => {
//       return res
//         ? res
//         : fetch(event.request)
//             .then(serverRes => {
//               if (event.request.url.includes('browser-sync')) {
//                 return serverRes;
//               }
//               return caches.open(CACHE_DYNAMIC_NAME).then(cache => {
//                 cache.put(event.request.url, serverRes.clone());
//                 return serverRes;
//               });
//             })
//             .catch(err => {
//               return caches.open(CACHE_STATIC_NAME).then(cache => {
//                 return cache.match('/offline.html');
//               });
//             });
//     })
//   );
// });

// cache then network strategy, service worker side
self.addEventListener('fetch', event => {
  const url = 'https://httpbin.org/get';

  if (event.request.url.includes(url)) {
    event.respondWith(
      caches.open(CACHE_DYNAMIC_NAME).then(cache => {
        return fetch(event.request).then(res => {
          cache.put(event.request, res.clone());
          return res;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(res => {
        return res
          ? res
          : fetch(event.request)
              .then(serverRes => {
                if (event.request.url.includes('browser-sync')) {
                  return serverRes;
                }
                return caches.open(CACHE_DYNAMIC_NAME).then(cache => {
                  cache.put(event.request.url, serverRes.clone());
                  return serverRes;
                });
              })
              .catch(err => {
                return caches.open(CACHE_STATIC_NAME).then(cache => {
                  if (event.request.url.includes('/help')) {
                    return cache.match('/offline.html');
                  }
                });
              });
      })
    );
  }
});

// network first w/ cache fallback strategy
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     fetch(event.request)
//       .then(serverRes => {
//         if (event.request.url.includes('browser-sync')) {
//           return serverRes;
//         }
//         return caches.open(CACHE_DYNAMIC_NAME).then(cache => {
//           cache.put(event.request.url, serverRes.clone());
//           return serverRes;
//         });
//       })
//       .catch(err => {
//         return caches.match(event.request);
//       })
//   );
// });
