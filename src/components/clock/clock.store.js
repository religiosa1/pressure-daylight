import { writable, readable, derived, get } from 'svelte/store';
import moment from "moment";

export const ClockState = Object.freeze({
  "default": 0,
  "placeform": 1,
  "dateform": 2,
});


export const tableView = writable(false);
export const state = writable(ClockState.default);

export const default_latitude = 55.7522200;
export const default_longitude = 37.6155600;

export function isValidLatitude(val) {
  return Number.isFinite(val) && val <= 90 && val >= -90;
}

export function isValidLongitude(val) {
  return Number.isFinite(val) && val <= 180 && val >= -180;
}

const LOCATION_KEY = "saved_location"
export function saveLocation() {
  if (!localStorage || typeof localStorage.setItem !== "function") {
    return;
  }
  let lat = get(latitude);
  let long = get(longitude);
  localStorage.setItem(LOCATION_KEY, JSON.stringify({
    latitude: lat,
    longitude: long
  }));
}

export function loadLocation() {
  let latitude, longitude
  try {
    if (localStorage && typeof localStorage.setItem === "function") {
      let loaded = JSON.parse(localStorage.setItem(LOCATION_KEY));
      if (loaded) {
        latitude = loaded.latitude;
        longitude = loaded.longitude;
      }
    }
  } catch (e) {
    console.warn('Error, during loading stored location, using default values', e);
  }

  return {
    latitude: isValidLatitude(latitude)? latitude : default_latitude,
    longitude: isValidLongitude(longitude)? longitude : default_longitude
  };
}

export function restoreLocation() {
  let pos = loadLocation();
  latitude.update(()=>pos.latitude);
  longitude.update(()=>pos.longitude);
}

export const latitude = writable(default_latitude);
export const longitude = writable(default_longitude);

//-----------------------------------------------------------------------------

export const dateType = writable("auto");
export const manualDow = writable(moment().dayOfYear());
export const today = readable(new Date(), set=>{
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

export const date = derived(
  [ dateType, manualDow, today ],
  ([ $dateType, $manualDow, $today] )=> {
    if ($dateType === "manual") {
      return moment($today).dayOfYear($manualDow);
    } else {
      return $today;
    }
  }
);
