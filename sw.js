// Service worker ini hanya untuk mengaktifkan fungsionalitas PWA (instalasi)
// dan strategi caching sederhana.

const CACHE_NAME = 'catatan-keuangan-cache-v1';
const urlsToCache = [
  '/',
  '/index.html' 
  // Anda bisa menambahkan URL lain di sini jika ada, seperti file CSS atau gambar utama
];

// Event install: menyimpan aset dasar ke cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event fetch: menyajikan aset dari cache jika tersedia (strategi cache-first)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Jika ada di cache, langsung kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak, ambil dari jaringan
        return fetch(event.request);
      }
    )
  );
});
