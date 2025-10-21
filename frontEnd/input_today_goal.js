const inputTodayGoal = () => {
  let errors = 0;
  let goal = undefined;

  do {
    errors = 0;

    goal = prompt("Cual es tu meta de hoy?");

    if (goal === undefined || !goal || isNaN(goal)) {
      alert("Debes escribir solo números");
      errors++;
    }
    if (goal > 10000 || goal <= 0) {
      if (goal > 10000) {
        alert("La cantidad no puede ser mayor a 10,000");
        errors++;
      }
      if (goal <= 0) {
        alert("La cantidad debe ser mayor a 0");
        errors++;
      }
    }
  } while (errors > 0);

  return goal;
};

export default inputTodayGoal;
