// Periksa service worker
if (!('serviceWorker' in navigator)) {
  console.log("Service worker tidak didukung browser ini.");
} else {
  registerServiceWorker();
  requestPermission();
}
// Register service worker
const registerServiceWorker = () => {
  return navigator.serviceWorker.register('./service-worker.js')
    .then((registration) => {
      console.log('Registrasi service worker berhasil.');
      return registration;
    })
    .catch((err) => {
      console.error('Registrasi service worker gagal.', err);
    });
}

const requestPermission = () => {
  if ('Notification' in window) {
    Notification.requestPermission().then((result) => {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }

      navigator.serviceWorker.ready.then(() => {
        if (('PushManager' in window)) {
          navigator.serviceWorker.getRegistration().then((registration) => {
            registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                "BOlqWkFhEfHY-Ck5VtqiaABVJ4nh_-w6I9yKSkk2trhcVSq7kH9OE4cS0UuHFFQdGYj1MkCpPX5KbZzpaYzzvcc"
              )
            }).then((subscribe) => {
              console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
              console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode
                .apply(
                  null, new Uint8Array(subscribe.getKey('p256dh')))));
              console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode
                .apply(
                  null, new Uint8Array(subscribe.getKey('auth')))));
            }).catch((e) => {
              console.error('Tidak dapat melakukan subscribe ', e.message);
            });
          });
        }
      });
    });
  }
}

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

document.addEventListener("DOMContentLoaded", () => {
  getStandings();
});