const createId = () => {
  let today = new Date();
  let id = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();
  return id;
};

export default createId;
