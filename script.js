import { acumular, revertir } from "./acumular.js";

import { getTodayMoney, updateTodayMoney } from "./setLocalMoney.js";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((reg) => console.log("Registro de SW exitoso", reg))
    .catch((err) => console.warn("Error al tratar de registrar el sw", err));
}

document.addEventListener("DOMContentLoaded", (e) => {
  let storagedMoney = getTodayMoney();
  storagedMoney = parseInt(storagedMoney);
  acumular(storagedMoney, "trips-total");
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".trip-button")) {
    let money = e.target.value;
    acumular(money, "trips-total");
    updateTodayMoney(money);
  }

  if (e.target.matches("#reverse-button")) {
    if (document.getElementById("trips-total").dataset.lastValue == 0) {
      alert("No es posible revertir el movimiento anterior");
    } else {
      updateTodayMoney(revertir("trips-total") * -1);
    }
  }

  if (e.target.matches("#other-cost-btn")) {
    let $containerDiferentTrip = document.getElementById(
      "diferent-trip-container"
    );

    $containerDiferentTrip.classList.add("active");
  }

  if (e.target.matches("#cancel-trip-btn")) {
    let $containerDiferentTrip = document.getElementById(
      "diferent-trip-container"
    );

    let $costoDiferente = document.getElementById("diferent-trip-value");

    $costoDiferente.value = "";

    $containerDiferentTrip.classList.remove("active");
  }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();

  let $costoDiferente = document.getElementById("diferent-trip-value");

  let costoDiferente = $costoDiferente.value;

  if (!costoDiferente) {
    console.error("el campo esta vacio");
  } else {
    acumular(costoDiferente, "trips-total");
    updateTodayMoney(costoDiferente);
    $costoDiferente.value = "";
    let $containerDiferentTrip = document.getElementById(
      "diferent-trip-container"
    );

    $containerDiferentTrip.classList.remove("active");
  }
});
