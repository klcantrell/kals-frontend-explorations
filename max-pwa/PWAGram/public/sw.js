importScripts('/src/js/idb.js');
importScripts('/src/js/utils.js');

const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const STATIC_FILES = [
  '/',
  '/index.html',
  '/offline.html',
  '/src/js/app.js',
  '/src/js/feed.js',
  '/src/js/idb.js',
  '/src/js/material.min.js',
  '/src/css/app.css',
  '/src/css/feed.css',
  '/src/images/main-image.jpg',
  'https://fonts.googleapis.com/css?family=Roboto:400,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
];

function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then(cache => {
    return cache.keys().then(keys => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
      }
    });
  });
}

self.addEventListener('install', event => {
  console.log('[Service Worker] Installing Service Worker...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(cache => {
      console.log('[Service Worker] Precaching App Shell');
      cache.addAll(STATIC_FILES);
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

function isInArray(string, array) {
  var cachePath;
  if (string.indexOf(self.origin) === 0) {
    // request targets domain where we serve the page from (i.e. NOT a CDN)
    cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
  } else {
    cachePath = string; // store the full request (for CDNs)
  }
  return array.indexOf(cachePath) > -1;
}

// cache then network strategy, service worker side
self.addEventListener('fetch', event => {
  const url = 'https://pwagram-d5dac.firebaseio.com/posts';

  if (event.request.url.includes(url)) {
    event.respondWith(
      fetch(event.request).then(res => {
        // trimCache(CACHE_DYNAMIC_NAME, 3);
        const clonedRes = res.clone();
        clearAllData('posts')
          .then(() => {
            return clonedRes.json();
          })
          .then(data => {
            for (const key in data) {
              writeData('posts', data[key]);
            }
          });
        return res;
      })
    );
  } else if (isInArray(event.request.url, STATIC_FILES)) {
    event.respondWith(caches.match(event.request));
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
                  // trimCache(CACHE_DYNAMIC_NAME, 3);
                  cache.put(event.request.url, serverRes.clone());
                  return serverRes;
                });
              })
              .catch(err => {
                return caches.open(CACHE_STATIC_NAME).then(cache => {
                  if (
                    event.request.headers.get('accept').includes('text/html')
                  ) {
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

const url =
  'https://us-central1-pwagram-d5dac.cloudfunctions.net/storePostData';

self.addEventListener('sync', event => {
  console.log('[Service Worker] Background syncing', event);
  if (event.tag === 'sync-new-posts') {
    console.log('[Service Worker] Syncing new posts');
    event.waitUntil(
      readAllData('sync-posts').then(data => {
        for (const dt of data) {
          const postData = new FormData();
          postData.append('id', dt.id);
          postData.append('title', dt.title);
          postData.append('location', dt.location);
          postData.append('file', dt.picture, dt.id + '.png');

          fetch(url, {
            method: 'POST',
            body: postData,
            mode: 'no-cors',
          })
            .then(res => {
              console.log('Sent data', res);
              if (res.ok) {
                res.json().then(data => {
                  deleteItemFromData('sync-posts', data.id);
                });
              }
            })
            .catch(err => {
              console.log('Error while sending data', err);
            });
        }
      })
    );
  }
});

self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  const action = event.action;
  console.log('notification', notification);
  console.log('action', action);

  if (action === 'confirm') {
    console.log('Confirm was chosen!');
    notification.close();
  } else {
    event.waitUntil(
      clients.matchAll().then(allClients => {
        const client = allClients.find(c => c.visibilityState === 'visible');

        if (client) {
          client.navigate(notification.data.url);
          client.focus();
        } else {
          clients.openWindow(notification.data.url);
        }
        notification.close();
      })
    );
  }
});

self.addEventListener('notificationclose', event => {
  console.log('Notification was closed', event);
});

self.addEventListener('push', event => {
  console.log('Push Notification received', event);

  let data = { title: 'New!', content: 'Something new happend!', openUrl: '/' };
  if (event.data) {
    data = JSON.parse(event.data.text());
  }

  const options = {
    body: data.content,
    icon: '/src/images/icons/app-icon-96x96.png',
    badge: '/src/images/icons/app-icon-96x96.png',
    data: {
      url: data.openUrl,
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
