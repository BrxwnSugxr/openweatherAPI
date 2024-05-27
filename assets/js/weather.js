import { API_KEY, AQI_LIST, DAYS, MONTHS } from './constants.js';
import {
  aqiCard,
  currentWeatherCard,
  feelsVal,
  fiveDaysForecastCard,
  hourlyForecastCard,
  humidityVal,
  pressureVal,
  sunriseCard,
  visibilityVal,
  windSpeedVal,
} from './dom.js';

export function getWeatherDetails(name, lat, lon, country, state) {
  const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const AIR_POLLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(AIR_POLLUTION_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let { co, no, no2, o3, pm2_5, pm10, nh3 } = data.list[0].components;
      aqiCard.innerHTML = `
        <div class="card-head">
          <p>Air Quality Index</p>
          <p class="air-index aqi-${data.list[0].main.aqi}">${
        AQI_LIST[data.list[0].main.aqi - 1]
      }</p>
        </div>
        <div class="air-indices">
          <i class="fa-regular fa-wind fa-3x"></i>
          <div class="item">
            <p>PM2.5</p>
            <h2>${pm2_5}</h2>
          </div>
          <div class="item">
            <p>PM10</p>
            <h2>${pm10}</h2>
          </div>
          <div class="item">
            <p>SO2</p>
            <h2>${data.list[0].components.so2}</h2>
          </div>
          <div class="item">
            <p>CO</p>
            <h2>${co}</h2>
          </div>
          <div class="item">
            <p>NO</p>
            <h2>${no}</h2>
          </div>
          <div class="item">
            <p>NO2</h2>
            <h2>${no2}</h2>
          </div>
          <div class="item">
            <p>NH3</p>
            <h2>${nh3}</h2>
          </div>
          <div class="item">
            <p>O3</p>
            <h2>${o3}</h2>
          </div>
        </div>`;
    })
    .catch((err) => {
      console.error('Error fetching AQI:', err);
      alert('Failed to fetch Air Quality Index');
    });

  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let date = new Date();
      currentWeatherCard.innerHTML = `
        <div class="current-weather">
          <div class="details">
            <p>Now</p>
            <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
            <p>${data.weather[0].description}</p>
          </div>
          <div class="weather-icon">
            <img src="https://openweathermap.org/img/wn/${
              data.weather[0].icon
            }@2x.png" alt="" />
          </div>
        </div>
        <hr />
        <div class="card-footer">
          <p><i class="fa-light fa-calendar"></i> ${
            DAYS[date.getDay()]
          }, ${date.getDate()} ${
        MONTHS[date.getMonth()]
      } ${date.getFullYear()}</p>
          <p><i class="fa-light fa-location-dot"></i>${name}, ${country}</p>
        </div>`;

      let { sunrise, sunset } = data.sys,
        { timezone, visibility } = data,
        { humidity, pressure, feels_like } = data.main,
        { speed } = data.wind,
        sRiseTime = moment
          .utc(sunrise, 'X')
          .add(timezone, 'seconds')
          .format('hh:mm A'),
        sSetTime = moment
          .utc(sunset, 'X')
          .add(timezone, 'seconds')
          .format('hh:mm A');

      sunriseCard.innerHTML = `
          <div class="card-head">
            <p>sunrise & sunset</p>
          </div>
          <div class="sunrise-sunset">
            <div class="item">
              <div class="icon">
                <i class="fa-light fa-sunrise fa-4x"></i>
              </div>
              <div>
                <p>sunrise</p>
                <h2>${sRiseTime}</h2>
              </div>
            </div>
            <div class="item">
              <div class="icon">
                <i class="fa-light fa-sunset fa-4x"></i>
              </div>
              <div>
                <p>sunset</p>
                <h2>${sSetTime}</h2>
              </div>
            </div>
         </div>
        `;
      humidityVal.innerHTML = `${humidity}%`;
      pressureVal.innerHTML = `${pressure}hPa`;
      visibilityVal.innerHTML = `${visibility / 1000}km`;
      windSpeedVal.innerHTML = `${speed}m/s`;
      feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;
    })
    .catch((err) => {
      console.error('Error fetching current weather:', err);
      alert('Failed to fetch current weather');
    });

  fetch(FORECAST_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let hourlyForecasts = data.list.slice(0, 8); // Take only the first 8 forecasts for the hourly section
      hourlyForecastCard.innerHTML = '';

      hourlyForecasts.forEach((forecast) => {
        let hrForecastDate = new Date(forecast.dt_txt);
        let hr = hrForecastDate.getHours();
        let a = 'PM';
        if (hr < 12) a = 'AM';
        if (hr == 0) hr = 12;
        if (hr > 12) hr -= 12;
        hourlyForecastCard.innerHTML += `
          <div class="card">
            <p>${hr} ${a}</p>
            <img src="https://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }.png" alt="" />
            <p>${(forecast.main.temp - 273.15).toFixed(2)}&deg;C</p>
          </div>`;
      });

      let uniqueForecastDays = [];
      let fiveDaysForecast = data.list.filter((forecast) => {
        let forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          uniqueForecastDays.push(forecastDate);
          return true;
        }
        return false;
      });

      fiveDaysForecastCard.innerHTML = '';
      fiveDaysForecast.forEach((forecast, i) => {
        if (i > 0) {
          // Skip today
          let date = new Date(forecast.dt_txt);
          fiveDaysForecastCard.innerHTML += `
            <div class="forecast-item">
              <div class="icon-wrapper">
                <img src="https://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }.png" alt="" />
                <span>${(forecast.main.temp - 273.15).toFixed(2)}&deg;C</span>
              </div>
              <p>${date.getDate()} ${MONTHS[date.getMonth()]}</p>
              <p>${DAYS[date.getDay()]}</p>
            </div>`;
        }
      });
    })
    .catch((err) => {
      console.error('Error fetching weather forecast:', err);
      alert('Failed to fetch weather forecast');
    });
}
