export const TimeRanges = [
  {
    value: 1,
    name: "За сутки",
    markerResolution: 6*60*60*1000, // 6 hours
    markerSecondaryResolution: 60*60*1000, // 1 hour
    markerSnap: "hour",
    format: "HH:mm",
  },
  {
    value: 3,
    name: "За три дня",
    markerResolution: 24*60*60*1000, // 24 hours
    markerSecondaryResolution: 3*60*60*1000, // 3 hours
    markerSnap: "hour",
    format: "DD HH:mm",
  },
  {
    value: 7,
    name: "За неделю",
    markerResolution:  24*60*60*1000, // 24 hours
    markerSecondaryResolution: 6*60*60*1000, // 6 hours
    markerSnap: "day",
    format: "DD HH:mm",
  },
];
