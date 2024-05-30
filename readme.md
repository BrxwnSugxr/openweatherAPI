# 06 Server-Side APIs: OpenWeatherAPI

This project is a weather dashboard application that retrieves weather data for multiple cities using the OpenWeather One Call API. The application features dynamically updated HTML and CSS and stores persistent data using localStorage.

## Mock-up

The following image shows the web application's appearance and functionality:

The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Perth

## Usage

1.Enter a city name into the input field.
2.Click the "Search" button to fetch and display the current and future weather conditions.
3.The city name will be saved in the search history.
4.Click on a city name in the search history to view its weather data again.

## Installation

1.Clone the repository:
git clone https://github.com/yourusername/weather-dashboard.git

2.Navigate to the project directory:
cd weather-dashboard

3.Open index.html in your web browser to view the application.

## Deployment

The application is deployed at: [this](https://brxwnsugxr.github.io//).
The Github repository can be found at: [this](https://brxwnsugxr.github.io//).

## User Story

```md
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```md
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

The following animation demonstrates the application functionality:

## Pseudo Code for HTML

1. Create a search input field for users to input city names.
2. Create buttons for search and location-based weather retrieval.
3. Create sections to display current weather, hourly forecast, daily forecast, and additional weather highlights.
4. Use appropriate HTML elements for structuring the layout and content.


## Pseudo Code for CSS

1. Set default styles for all elements to reset margins and paddings.
2. Define styles for the header section, including background color, padding, and layout.
3. Style the search input field and buttons for consistent appearance.
4. Define card styles for displaying weather information.
5. Arrange layout styles for the weather data sections, such as flexbox or grid.
6. Apply media queries for responsiveness across different screen sizes.


## Pseudo Code for JavaScript

1. Define variables to store DOM elements and API key.
2. Create functions to fetch weather data based on user input and location.
3. Utilize the OpenWeather API to retrieve current weather, hourly forecast, and daily forecast.
4. Populate the DOM with weather data retrieved from the API.
5. Handle errors and display appropriate messages to the user.
6. Implement event listeners to trigger weather data retrieval based on user actions (e.g., search, location).
7. Utilize localStorage to store persistent data such as user-selected cities.
8. Implement functionality to dynamically update the UI based on user interactions.


Below are images of the user interface of the calendar as displayed to the user:

![A user submits search then saved in local storaged displays.](.![alt text](image.png))
![A user clicks on slots on the color-coded calendar and edits the events.](./img/workday_scheduler_screenshot2.png)

URL to deployed application:

URL to GitHub repository:

For any questions, please contact me at jsdev.mas@gmail.com

