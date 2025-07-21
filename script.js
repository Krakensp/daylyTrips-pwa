import { acumular, resetMoneyLabel, revertir } from "./acumular.js";
import setAdvance from "./calculateAdvance.js";
import { getTotalGoal, updateTodayGoal } from "./localTodayGoal.js";

import {
  getTodayMoney,
  resetTodayMoney,
  updateTodayMoney,
} from "./setLocalMoney.js";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((reg) => console.log("Registro de SW exitoso", reg))
    .catch((err) => console.warn("Error al tratar de registrar el sw", err));
}

document.addEventListener("DOMContentLoaded", (e) => {
  let todayGoal = getTotalGoal();
  if (todayGoal == 0) {
    resetTodayMoney();
    updateTodayGoal(prompt("Cual es tu meta de hoy?"));
  }

  let storagedMoney = getTodayMoney();
  storagedMoney = parseInt(storagedMoney);

  acumular(storagedMoney, "trips-total");

  setAdvance(".goal-advance", todayGoal, storagedMoney);
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".trip-button")) {
    let money = e.target.value;
    acumular(money, "trips-total");
    updateTodayMoney(money);
    let $monnn = document.getElementById("total-label");
    $monnn.classList.add("more-money");

    let storagedMoney = getTodayMoney();
    storagedMoney = parseInt(storagedMoney);

    let todayGoal = getTotalGoal();

    setAdvance(".goal-advance", todayGoal, storagedMoney);

    setTimeout(function () {
      $monnn.classList.remove("more-money");
    }, 1000);
  }

  if (e.target.matches("#reverse-button")) {
    if (document.getElementById("trips-total").dataset.lastValue == 0) {
      alert("No es posible revertir el movimiento anterior");
    } else {
      updateTodayMoney(revertir("trips-total") * -1);
      let storagedMoney = getTodayMoney();
      storagedMoney = parseInt(storagedMoney);
      let todayGoal = getTotalGoal();

      setAdvance(".goal-advance", todayGoal, storagedMoney);
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
    $containerDiferentTrip.classList.add("inactive");
  }

  if (e.target.matches("#test-json")) {
    resetTodayMoney();
    updateTodayGoal(prompt("Cual es tu meta de hoy?"));
    let storagedMoney = getTodayMoney();
    storagedMoney = parseInt(storagedMoney);

    let todayGoal = getTotalGoal();

    resetMoneyLabel("trips-total");

    setAdvance(".goal-advance", todayGoal, storagedMoney);
  }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();

  let $costoDiferente = document.getElementById("diferent-trip-value");

  let costoDiferente = $costoDiferente.value;

  if (!costoDiferente) {
    let $errorContainer = document.getElementById("error-container");
    $errorContainer.classList.add("error-finded");
    setTimeout(function () {
      $errorContainer.classList.remove("error-finded");
    }, 3000);
    console.error("el campo esta vacio");
  } else {
    acumular(costoDiferente, "trips-total");
    updateTodayMoney(costoDiferente);

    let storagedMoney = getTodayMoney();
    storagedMoney = parseInt(storagedMoney);
    let todayGoal = getTotalGoal();

    setAdvance(".goal-advance", todayGoal, storagedMoney);
    $costoDiferente.value = "";
    let $containerDiferentTrip = document.getElementById(
      "diferent-trip-container"
    );

    $containerDiferentTrip.classList.remove("active");
    $containerDiferentTrip.classList.add("inactive");
  }
});
