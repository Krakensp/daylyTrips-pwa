const getLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.log("navigator does not support geolocation");
      reject("Geolocation not supported");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const time = position.timestamp;

          resolve({ latitude, longitude, time });
        },
        (error) => {
          console.error("Geolocation error:", error);
          reject("error");
        }
      );
    }
  });
};

export default getLocation;
