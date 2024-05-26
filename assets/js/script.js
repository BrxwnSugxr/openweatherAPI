document.addEventListener('DOMContentLoaded', function () {
  let cityInput = document.getElementById('city_input'),
    searchBtn = document.getElementById('searchBtn'),
    api_key = '9351ee22b0917e5901e60be617cf6f2b',
    currentWeatherCard = document.querySelectorAll('.weather-left .card')[0],
    fiveDaysForecastCard = document.querySelector('.day-forecast'),
    aqiCard = document.querySelectorAll('.highlights .card')[0],
    sunriseCard = document.querySelectorAll('.highlights .card')[1],
    humidityVal = document.getElementById('humidityVal'), // Added
    pressureVal = document.getElementById('pressureVal'), // Changed to pressureVal
    visibilityVal = document.getElementById('visibilityVal'), // Added
    windSpeedVal = document.getElementById('windSpeedVal'), // Added
    feelsVal = document.getElementById('feelsVal'), // Added
    hourlyForuecastCard = document.querySelector('.hourly-forecast');
  aqiList = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];

  function getWeatherDetails(name, lat, lon, country, state) {
    const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    const AIR_POLLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    fetch(AIR_POLLUTION_API_URL)
      .then((res) => res.json())
      .then((data) => {
        let { co, no, no2, o3, pm2_5, pm10, nh3 } = data.list[0].components;
        aqiCard.innerHTML = `
        <div class="card-head">
          <p>Air Quality Index</p>
          <p class="air-index aqi-${data.list[0].main.aqi}">${
          aqiList[data.list[0].main.aqi - 1]
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
          <p><i class="fa-light fa-calander"></i> ${
            days[date.getDay()]
          }, ${date.getDate()} ${
          months[date.getMonth()]
        } ${date.getFullYear()}</p>
          <p><i class="fa-light fa-location-dot"></i>${name}, ${country}</p>
        </div>`;

        let { sunrise, sunset } = data.sys,
          { timezone, visibility } = data, // Changed to visibility
          { humidity, pressure, feels_like } = data.main, // Changed to humidity and pressure
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
            </div>
            <p>sunrise</p>
            <h2>${sRiseTime}</h2>
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
        `;
        humidityVal.innerHTML = `${humidity}%`; // Updated
        pressureVal.innerHTML = `${pressure}hPa`; // Updated
        visibilityVal.innerHTML = `${visibility / 1000}km`; // Updated
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
        let hourlyForuecastCard = data.list;
        hourlyForuecastCard.innerHTML = '';

        for (i = 0; i <= 7; i++) {
          let hrForecastDate = new Date(hourlyForuecastCard[i].dt_txt);
          let hr = hrForecastDate.getHours();
          let a = 'PM';
          if (hr < 12) a = 'AM';
          if (hr == 0) hr = 12;
          if (hr > 12) hr = hr - 12;
          hourlyForuecastCard.innerHTML += `
          <div class="card">
          <p>${hr} ${}</p>
          <img src="https://openweathermap.org/img/wn/${
            hourlyForuecastCard[i].weather[0].icon
          }.png" alt="" />
          <p>${(hourlyForuecastCard[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
        </div>
          `;
        }

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
              <p>${date.getDate()} ${months[date.getMonth()]}</p>
              <p>${days[date.getDay()]}</p>
            </div>`;
          }
        });
      })
      .catch((err) => {
        console.error('Error fetching weather forecast:', err);
        alert('Failed to fetch weather forecast');
      });
  }

  function getCityCoordinates() {
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if (!cityName) return;
    let GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
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

  searchBtn.addEventListener('click', getCityCoordinates);
});
