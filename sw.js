// キャッシュの名前（バージョン）
const CACHE_NAME = 'action-logger-v1';

// オフライン時に読み込むファイルのリスト
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// インストール時にファイルをキャッシュする
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// リクエストをフックして、オフライン時はキャッシュから返す
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュにファイルがあればそれを返し、なければネットワークから取得する
        return response || fetch(event.request);
      })
  );
});
