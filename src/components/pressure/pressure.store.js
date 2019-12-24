import { writable, derived } from 'svelte/store';
import moment from "moment";

export const startDate = writable(moment().subtract(3, "days").toDate());

export const pressureEntries = derived(startDate, $startDate => {
  let params;
  if ($startDate instanceof Date) {
    params = "?" + encodeURIComponent("page[after]") + '=' + encodeURIComponent($startDate.toISOString());
  }
  return fetch('/api/sensor/default/' + params).then(resp => resp.json());
});

export const currentPressure = derived(pressureEntries, $pressureEntries => {
  return $pressureEntries.then(pressureEntries => {
    if (pressureEntries && Array.isArray(pressureEntries.data) && pressureEntries.data.length) {
      let data = pressureEntries.data;
      return data[data.length - 1].pressure;
    } else {
      return NaN;
    }
  });
});
