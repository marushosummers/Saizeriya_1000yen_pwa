// キャッシュファイルの指定
var CACHE_NAME = 'saizeriya-chache';
var urlsToCache = [
    '/marushosummers.github.io/',
    '/marushosummers.github.io/index.html',
    '/marushosummers.github.io/gacha.js',
    '/marushosummers.github.io/menu.json.js',
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

