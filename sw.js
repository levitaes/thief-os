const cacheName = "os-v1";

// static cache
const contentToCache = [
    "index.html",
    "style.css",
    "appManager.js",
    "functionLoader.js",
    "fuse.js",
    "inputManager.js",
    "kernel.js",
    "manifest.json",
    "terminal.js"
];

self.addEventListener("install", function (e) {
    // console.log("[Service Worker] Install");
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(contentToCache)
        })
    )
})

// on activation, we clean up the previously registered service workers
self.addEventListener('activate', evt =>
    evt.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cn => {
                    if (cn !== cacheName) {
                        return caches.delete(cn);
                    }
                })
            );
        })
    )
);


self.addEventListener("fetch", event => {
    // it should be cache first, then network
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }
            return fetchAndCache(event.request);
        })
    );
});

function fetchAndCache(request) {
    return fetch(request).then(response => {
        // Check if we received a valid response
        if (!response.ok) {
            throw new TypeError('bad response status');
        }
        // If we received a valid response, clone it so we can add it to the cache
        const clone = response.clone();
        caches.open(cacheName).then(cache => {
            // Check if the request is over HTTP
            if (!/^https?:$/i.test(new URL(request.url).protocol)) return;
            // Add the response to the cache
            cache.put(request, clone).then();
        });
        return response;
    });
}


