# Lime Weather ☁️⛅

Lime Weather is a simple and elegant weather application that provides real-time weather information for cities around the world. The application fetches weather data from the [WeatherAPI](https://www.weatherapi.com/) and displays it in a user-friendly interface. Users can search for weather information by city name or click on predefined city names to get instant updates.

## Features

- **Real-time Weather Data**: Get current weather conditions, including temperature, humidity, wind speed, and more.
- **Dynamic Backgrounds**: Background images change based on the weather condition and time of day.
- **Responsive Design**: The application is fully responsive and works seamlessly on both desktop and mobile devices.
- **Search Functionality**: Users can search for weather information by entering a city name.
- **Predefined Cities**: Quick access to weather information for popular cities like Toronto, Dallas, Los Angeles, and more.
- **Local Storage**: The last searched city is saved in local storage, so the app remembers your preference.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **API**: [WeatherAPI](https://www.weatherapi.com/)
- **Dependencies**:
  - `axios`: For making HTTP requests to the WeatherAPI.
  - `colors`: For adding colored console outputs.
  - `cors`: For enabling Cross-Origin Resource Sharing.
  - `dotenv`: For managing environment variables.
  - `express`: For creating the server.
  - `path`: For handling file paths.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/lime-weather.git
   cd lime-weather
   
2. **Install dependencies**:
   ```bash
   npm install
   
3. **Set up environment variables**:
   ```bash
   Create a .env file in the root directory.
   Add your WeatherAPI key to the .env file:
   KEY=your_weatherapi_key_here
   
4. **Run the server**:
   ```bash
   npm start
   
5. **Open the application**:
   ```bash
   Visit http://localhost:8080 in your browser.
## Usage
Search for a City: Enter the name of a city in the search bar and press Enter.

Select a Predefined City: Click on one of the predefined city names to get weather information instantly.

View Weather Details: The application displays temperature, weather condition, humidity, wind speed, and more.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
