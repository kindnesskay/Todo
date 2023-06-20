const site_cache = "site-cache";
const files = [
  "/Todo/",
  "/Todo/index.html",
  "/Todo/assets/app.js",
  "/Todo/assets/main.js",
  "/Todo/assets/trash.svg",
  "/Todo/assets/style.css",
  "/Todo/assets/modules/localStorage.js",
  "/Todo/assets/modules/textField.js",
  "/Todo/manifest.json",
];
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(site_cache).then((cache) => {
      try {
        cache.addAll(files);
      } catch (error) {
        console.error(error);
      }
    })
  );
});
//
//
self.addEventListener("fetch", (evt) => {
  // console.log(evt);
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request);
    })
  );
});
