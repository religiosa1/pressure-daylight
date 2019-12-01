import SunCalc from "suncalc";
import moment from "moment";

const isWinter = function(date, latitude) {
  // TODO правильный просчёт равноденствия ?
  let equinoxVernal = moment(date).set({"month": 2, "date": 20 });
  let equinoxAutumnal =  moment(date).set({"month": 8, "date": 22 });
  let cm = moment(date);

  if (latitude >= 0) {
    return ( cm.isBefore(equinoxVernal) || cm.isAfter(equinoxAutumnal) );
  } else {
    return ( cm.isAfter(equinoxVernal) && cm.isBefore(equinoxAutumnal) );
  }
}

export default function getTimes(time, latitude, longitude) {
  return {
    isWinter: isWinter(time, latitude),
    ...SunCalc.getTimes(time, latitude, longitude)
  }
}
