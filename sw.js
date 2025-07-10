const CACHE_NAME = "v1_cache_viajes",
  urlsToCache = ["./", "./style.css", "script.js", "./images/favicon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(urlsToCache).then(() => self.skipWaiting());
    })
    .catch((err) => console.log("Falló registro de cache"), err);
});

self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches.keys().then((cacheNames) => {
      cacheNames.map((cacheName) => {
        if (cacheName.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      });
    })
  ).then(() => self.clients.claim());
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});
