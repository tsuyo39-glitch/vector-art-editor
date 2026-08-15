const CACHE_NAME = "vector-art-editor-v2";
const APP_ASSETS = [
  "./",
  "index.html",
  "vector_art_editor.html",
  "manifest.webmanifest",
  "apple-touch-icon.png",
  "vector-icon-192.png",
  "vector-icon-512.png",
  "vector-icon-1024.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(APP_ASSETS.map((asset) => cache.add(asset).catch(() => null)))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isHtmlRequest = event.request.mode === "navigate" || requestUrl.pathname.endsWith(".html") || requestUrl.pathname.endsWith("/");
  if (isHtmlRequest) {
    // ブラウザのHTTPキャッシュに古い本体が残ると更新に気づけないので、毎回取り直す
    event.respondWith(
      fetch(event.request, { cache: "no-store" }).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
