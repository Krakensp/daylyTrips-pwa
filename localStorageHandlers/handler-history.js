import createId from "../helpers/helper-create-id.js";
import dateComparation from "../helpers/helper-date-comparation.js";

class History {
  constructor(id) {
    this.id = id;
    this.registers = [];
  }
}

const HISTORY_KEY = "history";

const getHistory = () => {
  return JSON.parse(localStorage.getItem(HISTORY_KEY));
};

const setHistory = (data) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
};

const createHistory = () => {
  const history = new History(createId);
  setHistory(history);
};

const updateHistory = (dailyRegister) => {
  const history = getHistory();
  if (!history) {
    createHistory();
  }
  history.registers.push(dailyRegister);
  setHistory(history);
};

const getOneDayRegister = (registerDate) => {
  let history = getHistory();

  //IMPLEMENTAR MANEJO DE ERROR HISTORIAL VACIO
  for (let i = 0; i < history.registers.length; i++) {
    let historyDate = new Date(history.registers[i].dateTime);
    if (dateComparation(registerDate, historyDate)) {
      return history.registers[i];
    }
  }
};

export { createHistory, updateHistory, getOneDayRegister };
