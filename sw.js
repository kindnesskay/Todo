const site_cache = "site-cache";
const files = [
  "/",
  "index.html",
  "/assets/app.js",
  "/assets/main.js",
  "/assets/trash.svg",
  "/assets/style.css",
  "/assets/modules/localStorage.js",
  "/assets/modules/textField.js",
  "manifest.json",
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
