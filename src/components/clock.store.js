import { writable } from 'svelte/store';

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
