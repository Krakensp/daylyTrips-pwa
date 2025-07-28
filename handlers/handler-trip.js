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
  let travels = localStorage.getItem("travels");
  let objectTravels = JSON.parse(travels);
  let listOfTravels = objectTravels.travels;

  listOfTravels.forEach((travel) => {
    displayTravels(travel, "table");
  });
};

const displayTravels = (travel, table) => {
  let { latitude, longitude, date, time, cost } = travel;
  let array = [latitude, longitude, date, time, cost];
  let $table = document.getElementById(table);

  let row = document.createElement("tr");
  for (let i = 0; i < array.length; i++) {
    let cellCost = document.createElement("td");
    let cellText = document.createTextNode(array[i]);
    cellCost.appendChild(cellText);
    row.appendChild(cellCost);
  }

  $table.appendChild(row);
};

const updateTodayTravels = () => {};

export { getTravels, createTravel };
