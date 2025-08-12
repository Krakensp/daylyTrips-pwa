import { acumular, resetMoneyLabel, revertir } from "./acumular.js";
import { setAdvance, resetAdvance } from "./calculateAdvance.js";
import { getTotalGoal, updateTodayGoal } from "./localTodayGoal.js";
import {
  getTodayMoney,
  resetTodayMoney,
  updateTodayMoney,
} from "./setLocalMoney.js";
import getLocation from "./handlers/handler-location.js";
import {
  transformTimeStampToDate,
  transformTimeStampToTime,
} from "./helpers/helper-timeConversor.js";

import { getTravels, createTravel } from "./handlers/handler-trip.js";

let latitude,
  longitude,
  date = "",
  time,
  cost;

let tripData = {
  latitude,
  longitude,
  date,
  time,
  cost,
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((reg) => console.log("Registro de SW exitoso", reg))
    .catch((err) => console.warn("Error al tratar de registrar el sw", err));
}

document.addEventListener("DOMContentLoaded", (e) => {
  let todayGoal = getTotalGoal();

  if (todayGoal == 0) {
    resetTravelApp();
  }

  let storagedMoney = getTodayMoney();
  acumular(storagedMoney, "trips-total");
  setAdvance(".goal-advance", todayGoal, storagedMoney);
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".trip-button")) {
    let money = e.target.value;
    let $monnn = document.getElementById("total-label");

    acumular(money, "trips-total");
    updateTodayMoney(money);

    let storagedMoney = getTodayMoney();
    let todayGoal = getTotalGoal();

    saveTravelData(money);

    setAdvance(".goal-advance", todayGoal, storagedMoney);

    $monnn.classList.add("more-money");

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
    resetTravelApp();
  }

  if (e.target.matches("#prev-date-btn")) {
    let $dateLabel = document.getElementById("history-date");
    let labelDate = $dateLabel.dataset.date;
    let actualDate = new Date(labelDate);
    let actualDay = actualDate.getDate();
    actualDate.setDate(actualDay - 1);
    console.log(actualDate);

    let $tabla = document.getElementById("table");
    $dateLabel.dataset.date = actualDate;
    $tabla.innerHTML =
      " <thead> Tabla de viajes </thead> <tr> <td>Ubicación</td><td>Hora</td><td>Costo</td></tr>";
    $dateLabel.innerText =
      actualDate.getDate() +
      "/" +
      (actualDate.getMonth() + 1) +
      "/" +
      actualDate.getFullYear();

    getTravels(actualDate);
  }

  if (e.target.matches("#next-date-btn")) {
    let $dateLabel = document.getElementById("history-date");
    let labelDate = $dateLabel.dataset.date;
    let actualDate = new Date(labelDate);
    let actualDay = actualDate.getDate();
    actualDate.setDate(actualDay + 1);
    console.log(actualDate);

    let $tabla = document.getElementById("table");
    $dateLabel.dataset.date = actualDate;
    $tabla.innerHTML =
      " <thead> Tabla de viajes </thead> <tr> <td>Ubicación</td><td>Hora</td><td>Costo</td></tr>";

    $dateLabel.innerText =
      actualDate.getDate() +
      "/" +
      (actualDate.getMonth() + 1) +
      "/" +
      actualDate.getFullYear();
    getTravels(actualDate);
  }

  if (e.target.matches("#history-btn")) {
    let $history = document.getElementById("table-container");

    let actualDate = new Date();
    let $tabla = document.getElementById("table");
    let $dateLabel = document.getElementById("history-date");

    $history.classList.add("active");

    $dateLabel.dataset.date = actualDate;
    $tabla.innerHTML =
      " <thead> Tabla de viajes </thead> <tr> <td>Ubicación</td><td>Hora</td><td>Costo</td></tr>";

    getTravels(actualDate);
  }

  if (e.target.matches("#close-btn")) {
    let $history = document.getElementById("table-container");
    $history.classList.remove("active");
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
    saveTravelData(costoDiferente);

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

const resetTravelApp = () => {
  resetTodayMoney();

  let pass = false;
  let goal = undefined;
  do {
    goal = prompt("Cual es tu meta de hoy?");

    if (
      isNaN(goal) ||
      goal === undefined ||
      !goal ||
      goal > 10000 ||
      goal <= 0
    ) {
      alert("Error");
      if (goal > 10000) {
        alert("La cantidad no puede ser mayor a 10,000");
      }
      if (goal <= 0) {
        alert("La cantidad debe ser mayor a 0");
      }
      if (isNaN(goal) || goal === undefined || !goal) {
        alert("Debes escribir solo números");
      }
      pass = false;
    } else {
      pass = true;
    }
  } while (!pass);

  updateTodayGoal(goal);
  resetMoneyLabel("trips-total");
  resetAdvance(".goal-advance");
};

const saveTravelData = (cost) => {
  (async () => {
    try {
      const { latitude, longitude, time } = await getLocation();

      // let textDate = transformTimeStampToDate(time);
      let textTime = transformTimeStampToTime(time);

      tripData.longitude = longitude;
      tripData.latitude = latitude;
      tripData.date = time;
      tripData.time = textTime;
      tripData.cost = cost;

      createTravel(tripData);
    } catch (err) {
      console.log("Ocurrió un error:", err);
    }
  })();
};
