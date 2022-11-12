const dayjs = require("dayjs");

const timestamp = (date) => {
  const time = dayjs().format("DD,MM,YYYY");
  return time;
};

module.exports = timestamp;
