const connection = async () => {
  let data = await getJson();

  addTravel(data);
};

async function getJson() {
  try {
    const response = await fetch("./viajes.json");

    if (!response) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:', error");
  }
}

const addTravel = (data) => {
  let coordenadaInicial = "0001";
  let coordenadaFinal = "0001";
  let costo = 10;
  let fecha = new Date();
  let horaInicio = "15:00";
  let horaFinal = "15:20";
  let idUser = "001";
  let turno = "tarde";

  let newTravel = {
    coordenadaInicial: coordenadaInicial,
    coordenadaFinal: coordenadaFinal,
    costo: costo,
    fecha: fecha,
    horaInicio: horaInicio,
    horaFinal: horaFinal,
    idUser: idUser,
    turno: turno,
  };

  data.viajes.push(newTravel);
  console.log(data);

  const nuevoJson = JSON.stringify(data, null, 2);
};

export default connection;
