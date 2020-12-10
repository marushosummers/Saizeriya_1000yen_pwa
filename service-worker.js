// キャッシュファイルの指定
var CACHE_NAME = 'saizeriya-chache-v1';
var urlsToCache = [
    '/saizeriya-1000yen.marusho.io/',
    '/saizeriya-1000yen.marusho.io/index.html',
    '/saizeriya-1000yen.marusho.io/gacha.js',
    '/saizeriya-1000yen.marusho.io/menu.json.js',
];

// install
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
});

// reload
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches
        .match(event.request)
        .then(function (response) {
            return response ? response : fetch(event.request);
        })
    );
});

