import validateInitialStorage from "./buisnessRules/validate_initial_storage.js";
import {
  closeDailyRegister,
  getDailyRegister,
  updateDailyRegisterGoal,
} from "./localStorageHandlers/handler-daily-register.js";
import {
  getTotalReached,
  updateTotalReached,
} from "./localStorageHandlers/totalReached.js";
import {
  addTravel,
  getLastTravel,
  getTravels,
  removeTravel,
} from "./localStorageHandlers/handler-trip.js";
import { updateHistory } from "./localStorageHandlers/handler-history.js";
import validateNewDay from "./buisnessRules/date_validation.js";
import frontEndCharge from "./frontEnd/front_end_charge.js";
import inputTodayGoal from "./frontEnd/input_today_goal.js";
import resetLocalStorage from "./buisnessRules/reset_local_storage.js";
import {
  showHistoryWindow,
  hideHistoryWindow,
  displayHistory,
  removeHistory,
  previousDayHistory,
  nextDayHistory,
} from "./frontEnd/front_history_handler.js";
import handlerTypedCost from "./helpers/handler_typed_cost.js";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((reg) => console.log("Registro de SW exitoso", reg))
    .catch((err) => console.warn("Error al tratar de registrar el sw", err));
}

document.addEventListener("DOMContentLoaded", (e) => {
  validateInitialStorage();
  let today = new Date();

  let dailyRegister = getDailyRegister();

  if (!validateNewDay(dailyRegister.dateTime)) {
    closeDailyRegister(getTotalReached(), getTravels());
    dailyRegister = getDailyRegister();
    updateHistory(dailyRegister);

    resetLocalStorage();
    updateDailyRegisterGoal(inputTodayGoal());
  }
  frontEndCharge();
});

document.addEventListener("click", (e) => {
  // *************BUTTONS**********
  const $TRIP_BUTTON = ".trip-button";
  const $REVERSE_BUTTON = "#reverse-button";
  const $TYPED_COST_BUTTON = "#other-cost-btn";
  const $TYPED_COST_CANCEL_BUTTON = "#cancel-trip-btn";
  const $HISTORY_BUTTON = "#history-btn";
  const $CLOSE_HISTORY_BUTTON = "#close-btn";
  const $BACK_HISTORY_BTN = "#prev-date-btn";
  const $FORWARD_HISTORY_BTN = "#next-date-btn";
  // ************ TAGS*************
  const $TYPED_COST_CONTAINER = "diferent-trip-container";

  // **********MAIN TRIGGERS************
  if (e.target.matches($TRIP_BUTTON)) {
    (async () => {
      showLoader();
      try {
        const res = await addTravel(e.target.value);

        if (!res) {
          console.error("Error al agregar el viaje");
        } else {
          updateTotalReached(e.target.value);
          frontEndCharge();
        }
      } catch (error) {
        console.error("Error inesperado al agregar viaje:", error);
      } finally {
        hideLoader();
      }
    })();
  }

  if (e.target.matches($REVERSE_BUTTON)) {
    (async () => {
      let lastTravel = getLastTravel();
      showLoader();
      try {
        const result = await removeTravel();
        if (result === 1) {
          updateTotalReached(lastTravel.cost * -1);
          frontEndCharge();
        }
      } catch (error) {
        console.error("Error inesperado al eliminar viaje:", error);
      } finally {
        hideLoader();
      }
    })();
  }

  // ********** TYPED COST MENU ******************
  if (e.target.matches($TYPED_COST_BUTTON)) {
    let $containerDiferentTrip = document.getElementById($TYPED_COST_CONTAINER);
    $containerDiferentTrip.classList.add("active");
  }
  if (e.target.matches($TYPED_COST_CANCEL_BUTTON)) {
    let $containerDiferentTrip = document.getElementById($TYPED_COST_CONTAINER);
    $containerDiferentTrip.classList.remove("active");
    $containerDiferentTrip.classList.add("inactive");
  }

  // ************ HISTORY MENU********************
  if (e.target.matches($HISTORY_BUTTON)) {
    let today = new Date();
    showHistoryWindow();
    displayHistory(today);
  }
  if (e.target.matches($CLOSE_HISTORY_BUTTON)) {
    hideHistoryWindow();
    removeHistory();
  }

  if (e.target.matches($BACK_HISTORY_BTN)) {
    displayHistory(previousDayHistory());
  }
  if (e.target.matches($FORWARD_HISTORY_BTN)) {
    displayHistory(nextDayHistory());
  }
});

document.addEventListener("submit", async (e) => {
  showLoader();
  try {
    e.preventDefault();
    e.stopPropagation();
    await handlerTypedCost();
  } catch (error) {
    console.error("Error al procesar el costo tipeado:", error);
  } finally {
    hideLoader();
  }
});

function showLoader() {
  document.getElementById("app-loader").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("app-loader").classList.add("hidden");
}
