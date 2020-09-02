// Periksa service worker
if (!('serviceWorker' in navigator)) {
  console.log("Service worker tidak didukung browser ini.");
} else {
  registerServiceWorker();
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

document.addEventListener("DOMContentLoaded", () => {
  let url = new URLSearchParams(window.location.search);
  const btnFavorite = document.getElementById("save");
  const btnDelete = document.getElementById("delete");
  const itemTeam = getTeamById();

  url = parseInt(url.get("id")) // Ambil akhiran id dari tim untuk di cek di IndexedDB     
  getAll().then((teams) => {
    teams.forEach((team) => {   // Mengecek isi dari setiap data di IndexedDB       
      if (team.id === url) {
        btnFavorite.style.display = "none";
        btnDelete.style.display = "block";
      }
    });
  })

  btnDelete.addEventListener('click', () => {
    console.log("Tombol diklik.");
    itemTeam.then((teams) => {
      deleteFavTeam(teams);
      btnFavorite.style.display = "block";
      btnDelete.style.display = "none";
    });
  });

  btnFavorite.addEventListener('click', () => {
    console.log("Tombol diklik.");
    itemTeam.then((teams) => {
      addtoFavorite(teams);
      btnFavorite.style.display = "none";
      btnDelete.style.display = "block";
    });
  });

});