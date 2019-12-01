import { writable, readable } from 'svelte/store';

export const tableView = writable(false);
export const state = writable(false);

export const ClockState = Object.freeze({
  "default": 0,
  "placeform": 1,
  "dateform": 2,
});


export const default_latitude = 55.7522200;
export const default_longitude = 37.6155600;

export function saveLocation() {
  // TODO
}

export function loadLocation() {
  // TODO
  return {
    latitude: default_latitude,
    longitude: default_longitude,
  };
}

export function restoretLocation() {
  let pos = loadLocation();
  latitude.update(()=>pos.latitude);
  longitude.update(()=>pos.longitude);
}

export const latitude = writable(default_latitude);
export const longitude = writable(default_longitude);


export const dateType = writable("auto");
export const date = readable(new Date(), set=>{
  let day_to;
  let setDayTO = () => {
    let now = new Date();
    let tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    tomorrow.setMilliseconds(0);
    setTimeout(() => {
       set(new Date());
       setDayTO();
    }, tomorrow.getTime() - now.getTime() );
  };

  day_to = setDayTO();

  return () => clearTimeout(day_to);
});
