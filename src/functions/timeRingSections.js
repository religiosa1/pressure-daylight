export function timeRingSections(times) {
  // TODO Проверка что заполнено, а что нет.
  return [
      {
        id: "astronomical-twilight-morning",
        name: "астрономические сумерки",
        start: times.nightEnd,
        end: times.nauticalDawn,
      },
      {
        id: "nautical-dawn",
        name: "навигационные сумерки",
        start: times.nauticalDawn,
        end: times.dawn,
      },
      {
        id: "dawn",
        name: "гражданские сумерки",
        start: times.dawn,
        end: times.sunrise,
      },
      {
        id: "sunrise",
        name: "восход",
        start: times.sunrise,
        end: times.sunriseEnd,
      },
      {
        id: "golden-hour-morning",
        name: "золотой час",
        start: times.sunriseEnd,
        end: times.goldenHourEnd,
      },
      {
        id: "day",
        name: "день",
        start: times.goldenHourEnd,
        end: times.goldenHour,
      },
      {
        id: "golden-hour-evening",
        name: "золотой час",
        start: times.goldenHour,
        end: times.sunsetStart,
      },
      {
        id: "sunset",
        name: "закат",
        start: times.sunsetStart,
        end: times.sunset,
      },
      {
        id: "dusk",
        name: "гражданские сумерки",
        start: times.sunset,
        end: times.dusk,
      },
      {
        id: "nautical-dusk",
        name: "навигационные сумерки",
        start: times.dusk,
        end: times.nauticalDusk,
      },
      {
        id: "astronomical-twilight-eveing",
        name: "астрономические сумерки",
        start: times.nauticalDusk,
        end: times.night,
      },
      {
        id: "night",
        name: "ночь",
        start: times.night,
        end: times.nightEnd,
      },
    ]
}
