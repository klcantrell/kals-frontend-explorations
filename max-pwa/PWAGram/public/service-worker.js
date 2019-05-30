importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
);

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

workbox.precaching.precacheAndRoute([
  {
    "url": "404.html",
    "revision": "0a27a4163254fc8fce870c8cc3a3f94f"
  },
  {
    "url": "favicon.ico",
    "revision": "2cab47d9e04d664d93c8d91aec59e812"
  },
  {
    "url": "index.html",
    "revision": "e62cab3450daf0f78d8357fb1c1e9e84"
  },
  {
    "url": "manifest.json",
    "revision": "8592a66e13df7c700521bdf30b069c35"
  },
  {
    "url": "offline.html",
    "revision": "69600d9e4705c97d42de16f1e1943b5e"
  },
  {
    "url": "src/css/app.css",
    "revision": "f27b4d5a6a99f7b6ed6d06f6583b73fa"
  },
  {
    "url": "src/css/feed.css",
    "revision": "cd52ace0efca489a040a3f57cd5d7c0c"
  },
  {
    "url": "src/css/help.css",
    "revision": "1c6d81b27c9d423bece9869b07a7bd73"
  },
  {
    "url": "src/js/app.js",
    "revision": "c193815b4b21e1cd6e345b0fa6939b05"
  },
  {
    "url": "src/js/feed.js",
    "revision": "1d95e6da972d5853e9cfd7dee7ad9adf"
  },
  {
    "url": "src/js/fetch.js",
    "revision": "6b82fbb55ae19be4935964ae8c338e92"
  },
  {
    "url": "src/js/idb.js",
    "revision": "017ced36d82bea1e08b08393361e354d"
  },
  {
    "url": "src/js/material.min.js",
    "revision": "713af0c6ce93dbbce2f00bf0a98d0541"
  },
  {
    "url": "src/js/promise.js",
    "revision": "10c2238dcd105eb23f703ee53067417f"
  },
  {
    "url": "src/js/utils.js",
    "revision": "b4cb64a9a39656ddee8e009bd2e5bdbc"
  },
  {
    "url": "sw-base.js",
    "revision": "9e9af20b89d77e92c6fe827ec992e31e"
  },
  {
    "url": "sw.js",
    "revision": "b6cb5cd86fbbf663f465a2a1e4f5692e"
  },
  {
    "url": "src/images/main-image-lg.jpg",
    "revision": "31b19bffae4ea13ca0f2178ddb639403"
  },
  {
    "url": "src/images/main-image-sm.jpg",
    "revision": "c6bb733c2f39c60e3c139f814d2d14bb"
  },
  {
    "url": "src/images/main-image.jpg",
    "revision": "5c66d091b0dc200e8e89e56c589821fb"
  },
  {
    "url": "src/images/sf-boat.jpg",
    "revision": "0f282d64b0fb306daf12050e812d6a19"
  }
]);
