let latitude = "000001",
  longitude = "000001",
  date = "31/06/2025",
  time = "17:05",
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
  createMainObject();

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

// const getTravels = () => {
//   createMainObject();
//   let travels = localStorage.getItem("travels");
//   let objectTravels = JSON.parse(travels);
//   let listOfTravels = objectTravels.travels;

//   listOfTravels.forEach((travel) => {
//     displayTravels(travel, "table");
//   });
// };

// const displayTravels = (travel, table) => {
//   let { latitude, longitude, date, time, cost } = travel;
//   let array = [latitude, longitude, date, time, cost];
//   let $table = document.getElementById(table);

//   let row = document.createElement("tr");
//   for (let i = 0; i < array.length; i++) {
//     let cellCost = document.createElement("td");
//     let cellText = document.createTextNode(array[i]);
//     cellCost.appendChild(cellText);
//     row.appendChild(cellCost);
//   }

//   $table.appendChild(row);
// };

const getTravels = (date) => {
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

  createMainObject();
  let travels = localStorage.getItem("travels");
  let objectTravels = JSON.parse(travels);
  let listOfTravels = objectTravels.travels;
  listOfTravels.forEach((travel) => {
    let actualDate = new Date(date);
    let travelDate = new Date(travel.date);
    if (
      actualDate.getDate() == travelDate.getDate() &&
      actualDate.getMonth() == travelDate.getMonth() &&
      actualDate.getFullYear() == travelDate.getFullYear()
    ) {
      displayTravels(travel, "table");
    }
  });
};

const updateTodayTravels = () => {};

export { getTravels, createTravel };
