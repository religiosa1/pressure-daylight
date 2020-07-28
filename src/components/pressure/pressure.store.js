import { parseJSON } from "date-fns";
import { writable, derived } from 'svelte/store';
import { subDays } from "date-fns";

export const startDate = writable(subDays(new Date(), 3));
export const endDate = writable(null);
export const pressureEntries = derived(startDate, $startDate => {
  let params;
  if ($startDate instanceof Date) {
    params = "?" + encodeURIComponent("page[after]") + '=' + encodeURIComponent($startDate.toISOString());
  }
  return fetch('/api/sensor/default/' + params).then(resp => {
    endDate.set(new Date());
    return resp.json();
  }).then(resp => {
    if (!resp || !Array.isArray(resp.data)) {
      console.error("unexpected server response", resp);
      return [];
    }
    for (let item of resp.data) {
      item.time = parseJSON(item.time);
    }
    return resp;
  });
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
