let db;

const connDb = async () => {
  try {
    let request = window.indexedDB.open("travels_db", 1);

    request.onerror = function () {
      throw new Error(`No se pudo abrir la base de datos: `);
    };

    request.onsuccess = function () {
      console.log("Base de datos abierta con éxito");
    };

    db = request.result;

    displayData();

    request.onupgradeneeded = function (e) {
      let db = e.target.result;
      let objectStore = db.createObjectStore("travels_os", {
        keyPath: "id",
        autoIncrement: true,
      });
    };

    objectStore.createIndex("title", "title", { unique: false });
    objectStore.createIndex("body", "body", { unique: false });
  } catch (error) {
    // console.error(`Ocurrio un error ${error}`);
  }
};

export default connDb;
