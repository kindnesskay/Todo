if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/Todo/sw.js", { scope: "/Todo/" })
    .then(() => {
      console.log("service worker registered");
    })
    .catch((error) => {
      console.error(error);
    });
}
