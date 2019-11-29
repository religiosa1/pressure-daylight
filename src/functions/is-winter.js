module.exports = function(date, latitude) {
  return latitude > 0;
  // TODO правильный просчёт равноденствия
  // let equinoxSep = moment(cm).set({"month":8, "date": 22 });
  // let equinoxMar = moment(cm).set({"month": 2, "date": 20 });
  //
  // let isNorthenWinter = cm.isAfter(equinoxSep) && cm.isBefore(equinoxMar);
  // console.log(isNorthenWinter, cm.isAfter(equinoxSep), cm.isBefore(equinoxMar));
  // if ((lattitude >= 0 && isNorthenWinter) || (lattitude < 0 && !isNorthenWinter) ) {}
}
