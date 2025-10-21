import getLocation from "../helpers/handler-location.js";

class Travel {
  constructor(latitude, longitude, datetime, cost) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.datetime = datetime;
    this.cost = cost;
  }
}

const STORAGE_KEY = "travels";

const getTravels = async () => {
  const data = localStorage.getItem("travels");
  return data ? JSON.parse(data) : [];
};

const saveTravels = async (travels) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(travels));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const createTravels = async () => {
  await saveTravels([]);
};

const addTravel = (cost) => {
  (async () => {
    try {
      const travels = await getTravels();

      const { latitude, longitude, time } = await getLocation();

      let travelData = new Travel(latitude, longitude, time, cost);

      travels.push(travelData);
      await saveTravels(travels);
    } catch (err) {
      console.log("Ocurrió un error:", err);
    }
  })();
};

const getLastTravel = async () => {
  const travels = await getTravels();
  const lastTravel = travels.length - 1;
  return travels[lastTravel];
};

const removeTravel = async () => {
  const travels = await getTravels();

  travels.pop();
  await saveTravels(travels);
};

export { createTravels, addTravel, getTravels, removeTravel, getLastTravel };
