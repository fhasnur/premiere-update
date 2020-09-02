const API_KEY = "d5e2983cab2a4dbbbf5a09e3540b883c";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2021;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const ENDPOINT_TEAM = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;
const ENDPOINT_DETAIL_TEAM = `${BASE_URL}/teams`;

// Blok kode yang akan di panggil jika fetch berhasil
const status = (response) => {
  if (response.status !== 200) {
    console.log(`Error : ${response.status}`);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
const json = (response) => {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
const error = (error) => {
  // Parameter error berasal dari Promise.reject()
  console.log(`Error : ${error}`);
}

// Blok kode untuk melakukan request data json
const getStandings = () => {
  if ("caches" in window) {
    caches.match(ENDPOINT_COMPETITION).then((response) => {
      if (response) {
        response.json().then((data) => {
          let standings = "";
          let standingElement = document.getElementById("homeStandings");

          let number = 1;
          data.standings[0].table.forEach((standing) => {
            let clubImage = standing.team.crestUrl;
            if (clubImage !== null) {
              clubImage = standing.team.crestUrl.replace(/^http:\/\//i, 'https://');
            }
            standings += `
              <tr>
                <td>${number++}</td>
                <td><img src="${clubImage}" width="50px" alt="badge"/></td>
                <td>${standing.team.name}</td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
                <td>${standing.goalsFor}</td>
                <td>${standing.goalsAgainst}</td>
                <td>${standing.goalDifference}</td>
                <td style="font-weight: bold;">${standing.points}</td>
              </tr>
            `;
          });

          standingElement.innerHTML = `
            <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
              <table class="striped responsive-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th></th>
                    <th>Team Name</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>P</th>
                  </tr>
                </thead>
                <tbody id="standings">
                    ${standings}
                </tbody>
              </table>
            </div>
          `;
        });
      }
    });
  }

  fetch(ENDPOINT_COMPETITION, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  })
    .then(status)
    .then(json)
    .then((data) => {
      let standings = "";
      let standingElement = document.getElementById("homeStandings");

      let number = 1;
      data.standings[0].table.forEach((standing) => {
        let clubImage = standing.team.crestUrl;
        if (clubImage !== null) {
          clubImage = standing.team.crestUrl.replace(/^http:\/\//i, 'https://');
        }
        standings += `
          <tr>
            <td>${number++}</td>
            <td><img src="${clubImage}" width="50px" alt="badge"/></td>
            <td>${standing.team.name}</td>
            <td>${standing.won}</td>
            <td>${standing.draw}</td>
            <td>${standing.lost}</td>
            <td>${standing.goalsFor}</td>
            <td>${standing.goalsAgainst}</td>
            <td>${standing.goalDifference}</td>
            <td style="font-weight: bold;">${standing.points}</td>
          </tr>
        `;
      });

      standingElement.innerHTML = `
        <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
          <table class="striped responsive-table">
            <thead>
              <tr>
                <th>No</th>
                <th></th>
                <th>Team Name</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>P</th>
              </tr>
            </thead>
            <tbody id="standings">
                ${standings}
            </tbody>
          </table>
        </div>
      `;
    })
    .catch(error);
}

const getTeams = () => {
  if ("caches" in window) {
    caches.match(ENDPOINT_TEAM).then((response) => {
      if (response) {
        response.json().then((data) => {
          let teamElement = "";

          data.teams.forEach((team) => {
            let clubImage = team.crestUrl;
            if (clubImage !== null) {
              clubImage = team.crestUrl.replace(/^http:\/\//i, 'https://');
            }
            teamElement += `  
              <div class="col m6 s12">
                <div class="card team-card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                  <div class="card-image">
                    <img class="team-image" width="60px" src="${clubImage}" width="100px" />
                  </div>
                  <div class="card-content center-align">
                    <span class="card-title truncate"><h4>${team.name}</h4></span>
                    <a href="./detailteams.html?id=${team.id}" class="waves-effect waves-light blue btn">Detail</a>
                  </div>
                </div>
              </div>
              `;
          });
          document.getElementById("homeTeams").innerHTML = teamElement;
        });
      }
    });
  }

  fetch(ENDPOINT_TEAM, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  })
    .then(status)
    .then(json)
    .then((data) => {
      let teamElement = "";

      data.teams.forEach((team) => {
        let clubImage = team.crestUrl;
        if (clubImage !== null) {
          clubImage = team.crestUrl.replace(/^http:\/\//i, 'https://');
        }
        teamElement += `
        <div class="col m6 s12">
          <div class="card team-card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
            <div class="card-image">
              <img class="team-image" width="60px" src="${clubImage}" />
            </div>
            <div class="card-content center-align">
              <span class="card-title truncate"><h4>${team.name}</h4></span>
              <a href="./detailteams.html?id=${team.id}" class="waves-effect waves-light blue btn">Detail</a>
            </div>
          </div>
        </div>
        `;
      });
      document.getElementById("homeTeams").innerHTML = teamElement;
    });

}

const getTeamById = () => {
  return new Promise((resolve, reject) => {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(`${ENDPOINT_DETAIL_TEAM}/${idParam}`).then((response) => {
        if (response) {
          response.json().then((data) => {
            let teams = "";
            let teamElement = document.getElementById("body-content");

            let clubImage = data.crestUrl;
            if (clubImage !== null) {
              clubImage = data.crestUrl.replace(/^http:\/\//i, 'https://');
            }
            teams += `
            <div class="card">
              <div class="card-image">
              <img style="max-width: 300px; max-height: 300px; object-position: center; margin: 30px auto; padding-top: 20px;" src="${clubImage}" /
              </div>
              <div class="card-content">
                <ul class="collection with-header">
                  <li class="collection-header center-align"><h4>${data.name}</h4></li>
                  <li class="collection-item">Short Name : ${data.shortName}</li>
                  <li class="collection-item">Venue : ${data.venue}</li>
                  <li class="collection-item">Address : ${data.address}</li>
                  <li class="collection-item">Website : ${data.website}</li>
                  <li class="collection-item">Phone : ${data.phone}</li>
                  <li class="collection-item">Founded : ${data.founded}</li>
                </ul>
              </div>
            </div>
            `;

            for (let i = 0; i < data.squad.length; i++) {
              teams += `
              <tr>
                <td class="center-align">${i + 1}</td>
                <td>${data.squad[i].name}</td>
                <td class="center-align">${data.squad[i].position}</td>
                <td class="center-align">${data.squad[i].nationality}</td>
                <td class="center-align">${data.squad[i].role}</td>
              </tr>
              `;
            }

            teamElement.innerHTML = `
            <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
              <table class="striped responsive-table">
                <thead>
                  <tr>
                    <th class="center-align">No</th>
                    <th>Name</th>
                    <th class="center-align">Position</th>
                    <th class="center-align">Nationality</th>
                    <th class="center-align">Role</th>
                  </tr>
                </thead>
                <tbody id="teams">
                    ${teams}
                </tbody>
              </table>
            </div>
          </div>`;
            resolve(data);
          });
        }
      });
    }

    fetch(`${ENDPOINT_DETAIL_TEAM}/${idParam}`, {
      headers: {
        'X-Auth-Token': API_KEY
      }
    })
      .then(status)
      .then(json)
      .then((data) => {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        let teams = "";
        let teamElement = document.getElementById("body-content");

        let clubImage = data.crestUrl;
        if (clubImage !== null) {
          clubImage = data.crestUrl.replace(/^http:\/\//i, 'https://');
        }
        teams += `
          <div class="card-image">
            <img style="max-width: 300px; max-height: 300px; object-position: center; margin: 30px auto; padding-top: 20px;" src="${clubImage}" /
          </div>
          <div class="card-content">
            <ul class="collection with-header">
              <li class="collection-header center-align"><h4>${data.name}</h4></li>
              <li class="collection-item">Short Name : ${data.shortName}</li>
              <li class="collection-item">Venue : ${data.venue}</li>
              <li class="collection-item">Address : ${data.address}</li>
              <li class="collection-item">Website : ${data.website}</li>
              <li class="collection-item">Phone : ${data.phone}</li>
              <li class="collection-item">Founded : ${data.founded}</li>
            </ul>
          </div>
        `;

        for (let i = 0; i <= data.squad.length; i++) {
          teams += `
          <tr>
            <td class="center-align">${i + 1}</td>
            <td>${data.squad[i].name}</td>
            <td class="center-align">${data.squad[i].position}</td>
            <td class="center-align">${data.squad[i].nationality}</td>
            <td class="center-align">${data.squad[i].role}</td>
          </tr>
          `;
        }

        teamElement.innerHTML = `
        <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
          <table class="striped responsive-table">
            <thead>
              <tr>
                <th class="center-align">No</th>
                <th>Name</th>
                <th class="center-align">Position</th>
                <th class="center-align">Nationality</th>
                <th class="center-align">Role</th>
              </tr>
            </thead>
            <tbody id="teams">
                ${teams}
            </tbody>
          </table>
        </div>
      </div>`;
        resolve(data);
      });
  });
}

const getAddFavorite = () => {
  getAll().then((teams) => {
    console.log(teams);

    let teamsHTML = "";
    let favoriteTeamElement = document.getElementById("homeFavorite");
    let number = 1;

    teams.forEach((data) => {
      teamsHTML += `
        <tr>
          <td>${number++}</td>
          <td>${data.name}</td>
          <td>${data.tla}</td>
          <td class="right-align">
            <a href="./detailteams.html?id=${data.id}" class="btn-floating btn-medium white">
              <i class="medium material-icons green-text">library_books</i>
            </a>
          </td>
        </tr>    
      `;
    });

    favoriteTeamElement.innerHTML = `
      <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
        <table class="striped responsive-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Team Name</th>
              <th>TLA</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="favorite">
            ${teamsHTML}
          </tbody>
        </table>
      </div>
    `;
  })
}