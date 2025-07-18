const createTodayMoney = () => {
  localStorage.setItem("todayMoney", 0);
  console.log("today money creation success");
};

const getTodayMoney = () => {
  if (!localStorage.getItem("todayMoney")) {
    console.error("today money do not exist");
    createTodayMoney();
    let todayMoney = localStorage.getItem("todayMoney");
    return todayMoney;
  } else {
    let todayMoney = localStorage.getItem("todayMoney");
    return todayMoney;
  }
};

const updateTodayMoney = (money) => {
  let actualMoney = getTodayMoney();
  actualMoney = parseInt(actualMoney);
  money = parseInt(money);
  let totalMoney = actualMoney + money;
  localStorage.setItem("todayMoney", totalMoney);
};

export { getTodayMoney, updateTodayMoney };
