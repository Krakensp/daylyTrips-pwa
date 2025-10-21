import inputTodayGoal from "../frontEnd/input_today_goal.js";
import {
  createDailyRegister,
  updateDailyRegisterGoal,
} from "../localStorageHandlers/handler-daily-register.js";
import { createHistory } from "../localStorageHandlers/handler-history.js";
import { createTravels } from "../localStorageHandlers/handler-trip.js";
import { createTotalReached } from "../localStorageHandlers/totalReached.js";

const validateInitialStorage = () => {
  if (!localStorage.getItem("history")) {
    createHistory();
  }

  if (!localStorage.getItem("dailyRegister")) {
    createDailyRegister();
    updateDailyRegisterGoal(inputTodayGoal());
  }

  if (!localStorage.getItem("travels")) {
    createTravels();
  }

  if (!localStorage.getItem("totalReached")) {
    createTotalReached();
  }
};

export default validateInitialStorage;
