// キャッシュファイルの指定
var CACHE_NAME = 'saizeriya-chache-v1';
var urlsToCache = [
    '/saizeriya-1000yen.marusho.io/',
    '/saizeriya-1000yen.marusho.io/index.html',
    '/saizeriya-1000yen.marusho.io/gacha.js',
    '/saizeriya-1000yen.marusho.io/menu.json.js',
];

// install cache
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

// use cache
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    return caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            });
        })
    );
});

// refresh cache
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName !== CACHE_NAME;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        }).then(function () {
            clients.claim();
        })
    );
});

