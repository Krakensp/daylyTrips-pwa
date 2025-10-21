const CACHE_NAME = "v3_cache_viajes",
  urlsToCache = [
    "./",
    // "./frontEnd...",
    "./frontEnd/front_end_charge.js",
    "./frontEnd/front_history_handler.js",
    "./frontEnd/input_today_goal.js",
    "./frontEnd/progress_bar_handler.js",
    // "./helpers",
    "./helpers/handler_typed_cost.js",
    "./helpers/handler-location.js",
    "./helpers/helper-create-id.js",
    "./helpers/helper-date-comparation.js",
    // "./icons",
    "./icons/regular.png",
    "./icons/small.png",
    // "./images",
    "./images/favicon.png",
    "./images/LogoKraken.png",
    // "./localStorageHandlers",
    "./localStorageHandlers/handler-daily-register.js",
    "./localStorageHandlers/handler-history.js",
    "./localStorageHandlers/handler-trip.js",
    "./localStorageHandlers/totalReached.js",
    //root
    "./style.css",
    "./index.html",
    "./script.js",
  ];

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
