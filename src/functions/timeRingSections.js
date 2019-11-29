const sections = [
  {
    id: "astronomical-twilight-morning",
    start: "nightEnd",
    end: "nauticalDawn",
  },
  {
    id: "nautical-dawn",
    start: "nauticalDawn",
    end: "dawn",
  },
  {
    id: "dawn",
    start: "dawn",
    end: "sunrise",
  },
  {
    id: "sunrise",
    start: "sunrise",
    end: "sunriseEnd",
  },
  {
    id: "golden-hour-morning",
    start: "sunriseEnd",
    end: "goldenHourEnd",
  },
  {
    id: "day",
    start: "goldenHourEnd",
    end: "goldenHour",
  },
  {
    id: "golden-hour-evening",
    start: "goldenHour",
    end: "sunsetStart",
  },
  {
    id: "sunset",
    start: "sunsetStart",
    end: "sunset",
  },
  {
    id: "dusk",
    start: "sunset",
    end: "dusk",
  },
  {
    id: "nautical-dusk",
    start: "dusk",
    end: "nauticalDusk",
  },
  {
    id: "astronomical-twilight-eveing",
    start: "nauticalDusk",
    end: "night",
  },
  {
    id: "night",
    start: "night",
    end: "nightEnd",
  },
];

export function timeRingSections(times) {
  // TODO Проверка что заполнено, а что нет.
  return sections.map(s=> ({
    id: s.id,
    start: times[s.start],
    end: times[s.end],
  }) );
}
