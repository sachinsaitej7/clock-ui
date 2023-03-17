// This is the service worker with the following features:
// 1. combined offline experience(Offline page + Offline copy of pages)
// 2. the code for handling the "skip waiting" event.
// 3. the code for handling the "offline fallback page" event.
// 4. the code for handling the "offline copy of pages" event.
// 5. the code for handling the "background sync" event.
// 6. the code for handling the "push notification" event.
// 7. updates the service worker when the app is updated.
// 8. the code for handling the "precache" event.
// 9. cache the google fonts.
// 10. cache the page's static assets.
// 11. cache the page's content as it changes.
// 12. cache the google analytics script.
// 13. updates the caches when the app is updated.


/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const CACHE = "clock-offline-page";
const OFFLINE_URL = "offline.html";

const precacheFiles = [
  /* Add an array of files to precache for your app */
  "index.html",
  "offline.html",
  "Favicon.png",
  "manifest.json",
  "logo.png",
  "logo-192.png",
  "logo-512.png",
]

self.addEventListener("install", (event) => {
  console.log("[PWA Builder] Install Event processing");

  console.log("[PWA Builder] Skip waiting on install");
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      console.log("[PWA Builder] Cached offline page during install");
      return cache.add(OFFLINE_URL);
    })
  );
});

// Allow sw to control of current page
self.addEventListener("activate", (event) => {
  console.log("[PWA Builder] Claiming clients for current page");
  event.waitUntil(self.clients.claim());
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  if (event.request.mode !== "navigate") {
    // Not a page navigation, bail.
    return;
  }

  event.respondWith(
    fetch(event.request)
      .catch((error) => {
        // Return the offline page
        console.log("[PWA Builder] Network request Failed. Serving offline page " + error);
        return caches.open(CACHE).then((cache) => cache.match(OFFLINE_URL));
      })
  );
});

// This is an event that can be fired from your page to tell the SW to update the offline page
self.addEventListener("refreshOffline", () => {
  const offlineRequest = new Request(OFFLINE_URL);

  return fetch(offlineRequest).then((response) => {
    return caches.open(CACHE).then((cache) => {
      console.log("[PWA Builder] Offline page updated from refreshOffline event: " + response.url);
      return cache.put(offlineRequest, response);
    });
  });
});

self.addEventListener("push", (event) => {
  if (!(self.Notification && self.Notification.permission === "granted")) {
    return;
  }

  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const title = data.title || "Something Has Happened";
  const message = data.message || "Here's something you might want to check out.";
  const icon = "logo.png";

  const notification = self.registration.showNotification(title, {
    body: message,
    icon: icon,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  });

  event.waitUntil(notification);
});

self.addEventListener("notificationclick", (event) => {
  console.log("[Service Worker] Notification click Received.");

  event.notification.close();

  event.waitUntil(
    clients.openWindow("https://theclock.xyz/")
  );
});

self.addEventListener("sync", (event) => {
  if (event.tag === "myFirstSync") {
    event.waitUntil(
      doSomeStuff()
    );
  }
});

self.addEventListener("message", (event) => {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});

//updates the caches when the app is updated.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE) {
          console.log("[ServiceWorker] Removing old cache", key);
          return caches.delete(key);
        }
      }));
    })
  );
});

//precache the static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(precacheFiles);
    })
  );
});

//cache the google fonts
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll([
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      ]);
    })
  );
});

//cache the page's static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll([
        "index.html",
        "offline.html",
        "Favicon.png",
        "manifest.json",
        "logo.png",
        "logo-192.png",
        "logo-512.png",
      ]);
    })
  );
});

// update the service worker every time the app is updated
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

//cache the page's content as it changes
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      return cache.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          //Uncaught (in promise) TypeError: Failed to execute 'put' on 'Cache': Request method 'POST' is unsupported
          if (event.request.method === "GET") {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});