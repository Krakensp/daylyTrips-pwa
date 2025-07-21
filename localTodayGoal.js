const createTodayGoal = () => {
  let storagedTodayGoal = localStorage.setItem("todayGoal", 0);
};

const getTotalGoal = () => {
  if (!localStorage.getItem("todayGoal")) {
    createTodayGoal();
  }
  return parseInt(localStorage.getItem("todayGoal"));
};

const updateTodayGoal = (todayGoal) => {
  localStorage.setItem("todayGoal", todayGoal);
};

export { getTotalGoal, updateTodayGoal };
