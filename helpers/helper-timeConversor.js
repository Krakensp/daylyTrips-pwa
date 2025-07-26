const transformTimeStampToDate = (timeStamp) => {
  const date = new Date(timeStamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let textDate = day + "/" + month + "/" + year;

  return textDate;
};

const transformTimeStampToTime = (timeStamp) => {
  const date = new Date(timeStamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let textTime = hours + ":" + minutes + ":" + seconds;

  return textTime;
};

export { transformTimeStampToDate, transformTimeStampToTime };
