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

    tripData.cost = money;
    getCurrentPosition();

    let storagedMoney = getTodayMoney();
    let todayGoal = getTotalGoal();

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
    tripData.cost = costoDiferente;
    getCurrentPosition();

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
  updateTodayGoal(prompt("Cual es tu meta de hoy?"));
  resetMoneyLabel("trips-total");
  resetAdvance(".goal-advance");
};

const getCurrentPosition = () => {
  (async () => {
    try {
      const { latitude, longitude, time } = await getLocation();

      let textDate = transformTimeStampToDate(time);
      let textTime = transformTimeStampToTime(time);

      tripData.date = textDate;
      tripData.latitude = latitude;
      tripData.longitude = longitude;
      tripData.time = textTime;

      console.log(tripData);
    } catch (err) {
      console.log("Ocurrió un error:", err);
    }
  })();
};
