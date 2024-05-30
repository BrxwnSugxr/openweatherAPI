# OpenWeatherAPI Weather Dashboard

This project is a weather dashboard application that retrieves weather data for multiple cities using the OpenWeather One Call API. The application features dynamically updated HTML and CSS and stores persistent data using localStorage.

## Mock-up

The following image shows the web application's appearance and functionality:

![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Perth](./Assets/06-server-side-apis-homework-demo.png)

## Usage

1. **Enter a city name**: Type the name of the city you want to search for into the input field.
2. **Search**: Click the "Search" button to fetch and display the current and future weather conditions.
3. **Search History**: The city name will be saved in the search history.
4. **View Saved Cities**: Click on a city name in the search history to view its weather data again.

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/BrxwnSugxr/openweatherAPI.git
   ```

2. **Navigate to the project directory**:
   ```sh
   cd openweatherAPI
   ```

3. **Open the application**:
   Open `index.html` in your web browser to view the application.

## Deployment

- **Live Application**: The application is deployed at [this link](https://brxwnsugxr.github.io/openweatherAPI/).
- **GitHub Repository**: The repository can be found at [this link](https://github.com/BrxwnSugxr/openweatherAPI).

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

## Pseudo Code for HTML

1. **Search Input Field**: Create an input field for users to input city names.
2. **Buttons**: Add buttons for search and location-based weather retrieval.
3. **Weather Data Sections**: Create sections to display current weather, hourly forecast, daily forecast, and additional weather highlights.
4. **HTML Structure**: Use appropriate HTML elements for structuring the layout and content.

## Pseudo Code for CSS

1. **Default Styles**: Set default styles for all elements to reset margins and paddings.
2. **Header Section**: Define styles for the header, including background color, padding, and layout.
3. **Input Field and Buttons**: Style the search input field and buttons for consistent appearance.
4. **Weather Cards**: Define card styles for displaying weather information.
5. **Layout Styles**: Arrange layout styles for the weather data sections using flexbox or grid.
6. **Responsive Design**: Apply media queries for responsiveness across different screen sizes.

## Pseudo Code for JavaScript

1. **Variable Definitions**: Define variables to store DOM elements and API key.
2. **Fetch Weather Data**: Create functions to fetch weather data based on user input and location.
3. **API Utilization**: Use the OpenWeather API to retrieve current weather, hourly forecast, and daily forecast.
4. **DOM Updates**: Populate the DOM with weather data retrieved from the API.
5. **Error Handling**: Handle errors and display appropriate messages to the user.
6. **Event Listeners**: Implement event listeners to trigger weather data retrieval based on user actions (e.g., search, location).
7. **Persistent Data**: Utilize localStorage to store persistent data such as user-selected cities.
8. **Dynamic UI Updates**: Implement functionality to dynamically update the UI based on user interactions.

## Contact

For any questions, please contact me at jsdev.mas@gmail.com

