import { createDailyRegister } from "../localStorageHandlers/handler-daily-register.js";
import { createTravels } from "../localStorageHandlers/handler-trip.js";
import { createTotalReached } from "../localStorageHandlers/totalReached.js";

const resetLocalStorage = () => {
  createDailyRegister();
  createTravels();
  createTotalReached();
};

export default resetLocalStorage;
