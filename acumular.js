const d = document;

const acumular = (costValue, totalLabel) => {
  const $totalLabel = d.getElementById(totalLabel);
  const totalValue = $totalLabel.textContent;

  let newValue = parseInt(costValue) + parseInt(totalValue);

  modificar(costValue, newValue, totalLabel);
};

const revertir = (totalLabel) => {
  const $totalLabel = d.getElementById(totalLabel);
  const totalValue = $totalLabel.textContent;
  const lastValue = $totalLabel.dataset.lastValue;
  let newValue = parseInt(totalValue) - parseInt(lastValue);
  let costValue = 0;

  modificar(costValue, newValue, totalLabel);

  return lastValue;
};

const modificar = (costValue, newValue, totalLabel) => {
  const $totalLabel = d.getElementById(totalLabel);
  $totalLabel.dataset.lastValue = costValue;
  $totalLabel.innerText = newValue;
};

const resetMoneyLabel = (totalLabel) => {
  const $totalLabel = d.getElementById(totalLabel);
  $totalLabel.innerText = 0;
};

export { acumular, revertir, resetMoneyLabel };
