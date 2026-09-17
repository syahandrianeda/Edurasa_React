export function registerServiceWorker() {
  console.log("[PWA] registerServiceWorker() dipanggil");

  if (!("serviceWorker" in navigator)) {
    console.log("[PWA] Service Worker tidak didukung");
    return;
  }

  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log(
        "[PWA] Service Worker berhasil terdaftar:",
        registration.scope
      );
    })
    .catch((error) => {
      console.error(
        "[PWA] Service Worker gagal didaftarkan:",
        error
      );
    });
}

// export function registerServiceWorker() {
//   console.log("[PWA] registerServiceWorker() dipanggil");

//   if (!("serviceWorker" in navigator)) {
//     console.log("[PWA] Service Worker tidak didukung browser");
//     return;
//   }

//   console.log("[PWA] Service Worker API tersedia");

//   window.addEventListener("load", () => {
//     console.log("[PWA] window load");

//     navigator.serviceWorker
//       .register("/sw.js")
//       .then((registration) => {
//         console.log(
//           "[PWA] Service Worker berhasil terdaftar:",
//           registration.scope
//         );
//       })
//       .catch((error) => {
//         console.error(
//           "[PWA] Service Worker gagal didaftarkan:",
//           error
//         );
//       });
//   });
// }