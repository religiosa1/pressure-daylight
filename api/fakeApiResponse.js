// Пробегаемся по реальному сохранённому ответу из api и обновляем в нём даты,
// чтобы было чего отображать.
const set = require('date-fns/set');
const formatISO = require('date-fns/formatISO');
const data = require("./index.json");
const apiDataInterval = 5 * 60 * 1000; // интервал с которым забиты данные в api: 5 минут в мс

module.exports = function() {
  const base = set(new Date(), {
    minutes: 0,
    seconds: 0,
    millisecond: 0,
  }).getTime();

  for (let i = 0; i < data.data.length; i++) {
    let entry = data.data[i];
    entry.time = formatISO(new Date(base - apiDataInterval * i));
  }
  return data;
};
