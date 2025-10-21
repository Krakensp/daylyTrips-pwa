import { getDailyRegister } from "../localStorageHandlers/handler-daily-register.js";
import { getTotalReached } from "../localStorageHandlers/totalReached.js";

const d = document;
const COMPLETED_GOAL_CLASS = "goal-completed";
const PROGRESS_BAR_TAGS = ".goal-advance";

const calculatePorcentageAdvance = () => {
  let dailyRegister = getDailyRegister();
  let advancePorcentage = Math.floor(
    (getTotalReached() / dailyRegister.goal) * 100
  );
  return advancePorcentage;
};

const setProgressBarAdvance = () => {
  let porcentageAdvance = calculatePorcentageAdvance();
  let $progressBarCells = d.querySelectorAll(PROGRESS_BAR_TAGS);
  $progressBarCells.forEach((cell) => {
    let cellValue = parseInt(cell.innerText);
    if (cellValue <= porcentageAdvance) {
      cell.classList.add(COMPLETED_GOAL_CLASS);
    } else {
      if (cell.classList.contains(COMPLETED_GOAL_CLASS)) {
        cell.classList.remove(COMPLETED_GOAL_CLASS);
      }
    }
  });
};

const resetProgressBarAdvance = () => {
  let $progressBarCells = d.querySelectorAll(PROGRESS_BAR_TAGS);

  $progressBarCells.forEach((cell) => {
    if (cell.classList.contains(COMPLETED_GOAL_CLASS)) {
      cell.classList.remove(COMPLETED_GOAL_CLASS);
    }
  });
};

export { setProgressBarAdvance, resetProgressBarAdvance };
