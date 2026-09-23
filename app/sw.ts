
import { clientsClaim } from "workbox-core";
import {
  cleanupOutdatedCaches,
  precacheAndRoute,
} from "workbox-precaching";
// import {
//   setCatchHandler,
//   setDefaultHandler,
// } from "workbox-routing";
import {
  NavigationRoute,
  registerRoute,
  setCatchHandler,
} from "workbox-routing";
import { NetworkOnly } from "workbox-strategies";

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

// setDefaultHandler(new NetworkOnly());
registerRoute(
  new NavigationRoute(
    new NetworkOnly(),
  ),
);

setCatchHandler(async ({ event }) => {
  if (event.request.destination === "document") {
    const response = await caches.match("/offline.html");

    if (response) {
      return response;
    }
  }

  return Response.error();
});

(self as ServiceWorkerGlobalScope & { skipWaiting: () => Promise<void> }).skipWaiting();

clientsClaim();