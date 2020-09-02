const dbPromised = idb.open("premiere-updateDB", 1, (upgradeDb) => {
  const teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("team_name", "name", {
    unique: false
  });
});

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.getAll();
      })
      .then((teams) => {
        resolve(teams);
      })
      .catch(() => {
        console.log("Team gagal dimuat.");
      })
  });
}

const addtoFavorite = (teams) => {
  dbPromised
    .then((db) => {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");
      console.log(teams);
      store.put(teams);
      return tx.complete;
    })
    .then(() => {
      M.toast({
        html: "Team Favorit berhasil disimpan."
      })
    })
    .catch(() => {
      console.log("Team Favorit gagal disimpan.")
    })
}

const deleteFavTeam = (teams) => {
  dbPromised
    .then((db) => {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");

      store.delete(teams.id);
      return tx.complete;
    }).then(() => {
      M.toast({
        html: "Team Favorit berhasil dihapus."
      })
    }).catch(() => {
      console.log("Team Favorite gagal dihapus.")
    })
}