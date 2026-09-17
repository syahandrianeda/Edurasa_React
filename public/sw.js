const CACHE_NAME = "edurasa-app-shell-v4";

const APP_SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  console.log("[SW] Installing:", CACHE_NAME);

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Caching app shell");

      return cache.addAll(APP_SHELL);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activating:", CACHE_NAME);

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => {
              console.log("[SW] Deleting old cache:", cacheName);

              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Kita hanya menangani GET.
  // POST, termasuk axios.post() ke Google Apps Script,
  // tetap berjalan normal melalui network.
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Jangan campuri Google Apps Script.
  if (url.hostname === "script.google.com") {
    return;
  }

  // =========================
  // NAVIGATION / HALAMAN
  // =========================

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          return response;
        })
        .catch(() => {
          return caches.match("/");
        })
    );

    return;
  }

  // =========================
  // STATIC ASSETS
  // =========================

  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }

          const responseClone = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });

          return response;
        });
      })
    );

    return;
  }
});