let cityInput = document.getElementById('city_input');
searchBtn = document.getElementById('searchBtn');
api_key = '9351ee22b0917e5901e60be617cf6f2b';

function getCityCoordinates() {
  let cityName = cityInput.value.trim();
  console.log(cityName);
}

searchBtn.addEventListener('click', getCityCoordinates);
