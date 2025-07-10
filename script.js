import { acumular, revertir } from "./acumular.js";
import connection from "./connection.js";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((reg) => console.log("Registro de SW exitoso", reg))
    .catch((err) => console.warn("Error al tratar de registrar el sw", err));
}

document.addEventListener("click", (e) => {
  if (e.target.matches("#trip-cost-btn")) {
    acumular(e.target.value, "trips-total");
  }

  if (e.target.matches("#reverse-button")) {
    if (document.getElementById("trips-total").dataset.lastValue == 0) {
      alert("No es posible revertir el movimiento anterior");
    } else {
      revertir("trips-total");
    }
  }

  if (e.target.matches("#test-json")) {
    connection();
  }
});
