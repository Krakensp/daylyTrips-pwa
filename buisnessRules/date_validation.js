const validateNewDay = (registerDate) => {
  const LIMIT_HOUR = 1;
  const dailyRegisterDate = new Date(registerDate);
  const actualDate = new Date();
  let validation = false;

  if (
    dailyRegisterDate.getFullYear() == actualDate.getFullYear() &&
    dailyRegisterDate.getMonth() == actualDate.getMonth()
  ) {
    if (dailyRegisterDate.getDate() == actualDate.getDate()) {
      return (validation = true);
    } else if (dailyRegisterDate.getDate() == actualDate.getDate() - 1) {
      if (actualDate.getHours() < LIMIT_HOUR) {
        return (validation = true);
      }
    }
  }

  return (validation = false);
};

export default validateNewDay;
