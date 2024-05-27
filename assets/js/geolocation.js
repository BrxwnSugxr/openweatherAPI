import { API_KEY } from './constants.js';
import { cityInput } from './dom.js';
import { getWeatherDetails } from './weather.js';

export function getCityCoordinates() {
  let cityName = cityInput.value.trim();
  cityInput.value = '';
  if (!cityName) return;
  let GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        let { name, lat, lon, country, state } = data[0];
        getWeatherDetails(name, lat, lon, country, state);
      } else {
        alert(`No data found for city: ${cityName}`);
      }
    })
    .catch((err) => {
      console.error('Error fetching city coordinates:', err);
      alert(`Failed to fetch coordinates of ${cityName}`);
    });
}

export function getUserCoordinates() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let { latitude, longitude } = position.coords;
      let REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;

      fetch(REVERSE_GEOCODING_URL)
        .then((res) => res.json())
        .then((data) => {
          let { name, country, state } = data[0];
          getWeatherDetails(name, latitude, longitude, country, state);
        })
        .catch((err) => {
          console.error('Error fetching your coordinates:', err);
          alert(`Failed to fetch coordinates of  ${latitude}, ${longitude}`);
        });
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        alert(
          'Geolocation permission denied, Please reset location permission to grant access again'
        );
      }
    }
  );
}
