importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '5' },
    { url: '/manifest.json', revision: '5' },
    { url: '/index.html', revision: '5' },
    { url: '/detailteams.html', revision: '5' },
    { url: '/nav.html', revision: '5' },
    { url: '/favicon.ico', revision: '5' },
    { url: '/icons/icon-192.png', revision: '5' },
    { url: '/icons/icon-512.png', revision: '5' },
    { url: '/pages/home.html', revision: '5' },
    { url: '/pages/teams.html', revision: '5' },
    { url: '/pages/favorite.html', revision: '5' },
    { url: '/css/style.css', revision: '5' },
    { url: '/css/materialize.min.css', revision: '5' },
    { url: '/js/materialize.min.js', revision: '5' },
    { url: '/js/api.js', revision: '5' },
    { url: '/js/db.js', revision: '5' },
    { url: '/js/idb.js', revision: '5' },
    { url: '/js/nav.js', revision: '5' },
    { url: '/js/indexfun.js', revision: '5' },
    { url: '/js/detailfun.js', revision: '5' }
  ], {
    ignoreURLParametersMatching: [/.*/]
  });

  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );

  workbox.routing.registerRoute(
    ({ url }) => url.origin === 'https://api.football-data.org',
    workbox.strategies.staleWhileRevalidate()
  );

  // Caching Google Fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  workbox.routing.registerRoute(
    /\.(?:html|js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/detailTeams'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'team-detail'
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
    })
  );

} else {
  console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', function (event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'icons/icon-512.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});