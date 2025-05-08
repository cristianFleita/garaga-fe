const CACHE_NAME = "spine-assets";

self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // Intercept requests for Spine animations
  if (url.includes("/spine-animations/")) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(event.request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        })
      )
    );
  }
});
