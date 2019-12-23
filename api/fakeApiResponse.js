// Пробегаемся по реальному сохранённому ответу из api и обновляем в нём даты,
// чтобы было чего отображать.
const moment = require("moment");
const data = require("./index.json");
const apiDataInterval = 5 * 60 * 1000; // интервал с которым забиты данные в api: 5 минут в мс

module.exports = function() {
  let now = moment();
  const base = moment().set({
    year: now.year(),
    month: now.month(),
    date: now.date(),
    hours: now.hours(),
  }).toDate().getTime();
  for (let i = 0; i < data.data.length; i++) {
    let entry = data.data[i];
    entry.time = (new Date(base - apiDataInterval * i)).toISOString();
  }
  return data;
};
