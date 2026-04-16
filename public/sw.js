const CACHE_NAME = 'docz-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json'
];

// #TODO: configuracao de cache pra sw
const FORCE_DEV_MODE = true;  // dev ou prod

self.addEventListener('install', (event) => {
  if (FORCE_DEV_MODE) {
    console.log('SW: Dev mode - skipping cache');
    return;
  }
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (FORCE_DEV_MODE) {
    // Vai direto na rede, sem cache
    event.respondWith(fetch(event.request));
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});