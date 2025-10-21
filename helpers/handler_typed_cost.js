import frontEndCharge from "../frontEnd/front_end_charge.js";
import { addTravel } from "../localStorageHandlers/handler-trip.js";
import { updateTotalReached } from "../localStorageHandlers/totalReached.js";

const handlerTypedCost = () => {
  const $TYPED_COST_CONTAINER = "diferent-trip-container";
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
    updateTotalReached(costoDiferente);
    addTravel(costoDiferente);
    frontEndCharge();

    let $containerDiferentTrip = document.getElementById($TYPED_COST_CONTAINER);
    $containerDiferentTrip.classList.remove("active");
    $containerDiferentTrip.classList.add("inactive");
    $costoDiferente.value = "";
  }
};

export default handlerTypedCost;
