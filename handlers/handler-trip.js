let latitude = "500",
  longitude = "000001",
  date = "25",
  time = "17",
  cost = "20";

let travelData = {
  latitude,
  longitude,
  date,
  time,
  cost,
};

const travels = { travels: [travelData] };

const createMainObject = () => {
  if (!localStorage.getItem("travels")) {
    const viajesJSON = JSON.stringify(travels);
    localStorage.setItem("travels", viajesJSON);
  }
};

const createTravel = (tripData) => {
  let { latitude, longitude, date, time, cost } = tripData;

  let travelData2 = {
    latitude,
    longitude,
    date,
    time,
    cost,
  };

  let travels = localStorage.getItem("travels");
  let objectTravels = JSON.parse(travels);

  let travelsArray = objectTravels.travels;

  travelsArray.push(travelData2);

  const travelsData = { travels: travelsArray };

  const viajesJSON = JSON.stringify(travelsData);
  localStorage.setItem("travels", viajesJSON);
};

const getTravels = () => {
  createMainObject();
  localStorage.getItem("travels");
  console.log(localStorage.getItem("travels"));
};

const updateTodayTravels = () => {};

export { getTravels, createTravel };
