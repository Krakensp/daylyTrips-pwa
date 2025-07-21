const calculateAdvance = (todayGoal, actualAdvance) => {
  let advancePorcentage = Math.floor((actualAdvance / todayGoal) * 100);
  return advancePorcentage;
};

const setAdvance = (advanceLabel, todayGoal, actualAdvance) => {
  const goalClass = "goal-completed";

  let porcentageAdvance = calculateAdvance(todayGoal, actualAdvance);

  let $advanceItems = document.querySelectorAll(advanceLabel);
  $advanceItems.forEach((element) => {
    let goalValue = parseInt(element.innerText);
    if (goalValue <= porcentageAdvance) {
      element.classList.add(goalClass);
    } else {
      if (element.classList.contains(goalClass)) {
        element.classList.remove(goalClass);
      }
    }
  });
};

export default setAdvance;
