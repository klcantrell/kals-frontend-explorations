importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
);
importScripts('/src/js/idb.js');
importScripts('/src/js/utils.js');

workbox.routing.registerRoute(
  /.*(?:firebasestorage\.googleapis)\.com.*$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'post-images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 3,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com.*$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts',
  })
);

workbox.routing.registerRoute(
  'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'material-css',
  })
);

workbox.routing.registerRoute(
  'https://pwagram-d5dac.firebaseio.com/posts.json',
  ctx => {
    return fetch(ctx.event.request).then(res => {
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
    });
  }
);

workbox.routing.setDefaultHandler(
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.setCatchHandler(ctx => {
  console.log('hitting catch handler');
  return caches
    .match(workbox.precaching.getCacheKeyForURL('/offline.html'))
    .then(res => {
      return res;
    });
});

workbox.precaching.precacheAndRoute([]);
