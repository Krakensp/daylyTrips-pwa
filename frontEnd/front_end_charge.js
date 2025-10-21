import { getTotalReached } from "../localStorageHandlers/totalReached.js";
import { setProgressBarAdvance } from "./progress_bar_handler.js";

const d = document;

const TOTAL_TAG = "total-label";

const chargeTotalLabel = (value) => {
  let $totalLabel = d.getElementById(TOTAL_TAG);
  $totalLabel.innerText = "$" + value;
  $totalLabel.classList.add("more-money");

  setTimeout(function () {
    $totalLabel.classList.remove("more-money");
  }, 1000);
};

const frontEndCharge = () => {
  setProgressBarAdvance();
  chargeTotalLabel(getTotalReached());
};

export default frontEndCharge;
