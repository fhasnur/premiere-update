document.addEventListener("DOMContentLoaded", () => {
  // Activate sidebar nav
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
          elm.innerHTML = xhttp.responseText;
        });

        //Daftarkan event Listener untuk setiap tautan menu
        document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
          elm.addEventListener("click", (event) => {
            //Tutup sidenav
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            //Muat konten halaman yang dipanggil 
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  //load page content
  const page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);

  function loadPage(page) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (this.readyState == 4) {
        const content = document.querySelector("#body-content");

        if (page === "home") {
          getStandings();
        } else if (page === "teams") {
          getTeams();
        } else if (page === "favorite") {
          getAddFavorite();
        }

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});