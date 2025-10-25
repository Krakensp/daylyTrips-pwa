import createId from "../helpers/helper-create-id.js";

class Register {
  statusOptions = ["process", "closed"];

  constructor(id, goal, dateTime, totalReached) {
    (this.id = id),
      (this.goal = goal),
      (this.dateTime = dateTime),
      (this.totalReached = totalReached),
      (this.trips = []);
  }

  setStatus(option) {
    this.status = this.statusOptions[option];
  }

  setTravels(travels) {
    this.trips = travels;
  }

  setTotalReached(totalReached) {
    this.totalReached = totalReached;
  }
}

const STORAGE_KEY = "dailyRegister";

const getDailyRegister = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
};

const setDailyRegister = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const createDailyRegister = () => {
  let dateTime = new Date();
  let goal = 0;
  let totalReached = 0;
  const dailyRegister = new Register(createId(), goal, dateTime, totalReached);
  dailyRegister.setStatus(0);
  setDailyRegister(dailyRegister);
};

const closeDailyRegister = (totalReached, travels) => {
  const storageData = getDailyRegister();
  const dailyRegister = new Register(
    storageData.id,
    storageData.goal,
    storageData.dateTime,
    totalReached
  );

  dailyRegister.setStatus(1);
  dailyRegister.setTravels(travels); //si persiste el bug en el que no se guardan los viajes, revisar esta linea
  setDailyRegister(dailyRegister);
};

const updateDailyRegisterGoal = (goal) => {
  const storageData = getDailyRegister();
  let totalReached = 0;

  const dailyRegister = new Register(
    storageData.id,
    goal,
    storageData.dateTime,
    totalReached
  );

  dailyRegister.setStatus(1);
  setDailyRegister(dailyRegister);
};

export {
  createDailyRegister,
  closeDailyRegister,
  updateDailyRegisterGoal,
  getDailyRegister,
};
