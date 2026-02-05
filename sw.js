self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('forro-pvc').then(cache => {
      return cache.addAll([
        './',
        './index.html',
      ]);
    })
  );
});
