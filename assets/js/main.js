import { cityInput, locationBtn, searchBtn } from './dom.js';
import { getCityCoordinates, getUserCoordinates } from './geolocation.js';

searchBtn.addEventListener('click', getCityCoordinates);
locationBtn.addEventListener('click', getUserCoordinates);
cityInput.addEventListener(
  'keyup',
  (e) => e.key === 'Enter' && getCityCoordinates()
);
window.addEventListener('load', getUserCoordinates);
