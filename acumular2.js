const d = document;

const acumular = (costValue, totalLabel) => {
  modificar(costValue, totalLabel);
};

const agregar = (costValue, totalValue) => {
  return costValue + totalValue;
};

const revertir = (totalLabel) => {
  last;
};

const modificar = (costValue, totalLabel) => {
  const $totalLabel = d.getElementById(totalLabel);
  const totalValue = $totalLabel.textContent;

  let newTotal = agregar(parseInt(costValue), parseInt(totalValue));

  $totalLabel.dataset.lastValue = costValue;
  $totalLabel.innerText = newTotal;
};

export default acumular;
