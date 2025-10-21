const STORAGE_KEY = "totalReached";

const createTotalReached = () => {
  let value = 0;
  localStorage.setItem(STORAGE_KEY, value);
};

const getTotalReached = () => {
  return parseInt(localStorage.getItem(STORAGE_KEY));
};

const saveTotalReached = (value) => {
  localStorage.setItem(STORAGE_KEY, value);
};

const updateTotalReached = (value) => {
  let totalReached = getTotalReached();
  totalReached += parseInt(value);
  saveTotalReached(totalReached);
};

export { createTotalReached, getTotalReached, updateTotalReached };
