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

const getTravels = () => {
  const data = localStorage.getItem("travels");
  return data ? JSON.parse(data) : [];
};

const saveTravels = (travels) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(travels));
};

const createTravels = () => {
  saveTravels([]);
};

const addTravel = (cost) => {
  (async () => {
    try {
      const travels = await getTravels();

      const { latitude, longitude, time } = await getLocation();

      let travelData = new Travel(latitude, longitude, time, cost);

      travels.push(travelData);
      saveTravels(travels);
    } catch (err) {
      console.log("Ocurrió un error:", err);
    }
  })();
};

const getLastTravel = () => {
  const travels = getTravels();
  const lastTravel = travels.length - 1;
  return travels[lastTravel];
};

const removeTravel = () => {
  const travels = getTravels();

  travels.pop();
  saveTravels(travels);
};

export { createTravels, addTravel, getTravels, removeTravel, getLastTravel };
