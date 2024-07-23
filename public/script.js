// Date
const event = new Date();
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
const day = event.toLocaleDateString('en-US', options);
document.querySelector('.day').innerHTML = day;

// Weather, Form, Video & Image etc Elements Dom

const temp = document.querySelector('.temp'),
  timeOutput = document.querySelector('.time'),
  dayOutput = document.querySelector('.day'),
  iconWeather = document.querySelector('.weather-icon'),
  cities = document.querySelectorAll('.city'),
  weatherCondition = document.querySelector('.weather'),
  cloudPercentage = document.querySelector('.cloudy'),
  humidityPercentage = document.querySelector('.humidity'),
  wind = document.querySelector('.wind'),
  feelsLike = document.querySelector('.feels-like'),
  form = document.getElementById('locationInput'),
  searchArea = document.getElementById('search'),
  backgroundImage = document.querySelector('.image'),
  body = document.body,
  video = document.querySelector('.video'),
  alertMessage = document.getElementById('alert');

// Button Element Dom
const btn = document.getElementById('btn');

// Input Element Dom
const searchInput = document.querySelector('.search-location');

//city Display Name
let cityName = document.querySelector('.name');

//Default city when page loads
let cityInput = localStorage.getItem('city') || 'Toronto';

// Fetch Weather on Loadup
fetchWeatherData(cityInput);

// Click event changes city name to whatever city was clicked on <li>!
cities.forEach((city) => {
  city.addEventListener('click', (e) => {
    // Changes City Heading to whatever li Name was clicked
    cityInput = e.target.innerHTML;
    cityName.innerHTML = cityInput;
    backgroundImage.style.opacity = '0';
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    fetchWeatherData(cityInput);
    localStorage.setItem('city', cityInput);
  });
});

// add submit event to form
form.addEventListener('submit', (e) => {
  // IF the input field (search) is empty, throw an alert
  if (searchInput.value.length == 0) {
    e.preventDefault();
    // Enter alert message via innerHTML
    alertMessage.innerHTML = `Please Enter a City`;
    // Add's animation
    alertMessage.style.animation =
      'shake-bottom 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both';
    setTimeout(() => {
      //Removes animation to refresh when input is empty and entered
      alertMessage.style.animation = '';
    }, 1000);
    setTimeout(() => {
      // Remove alert message
      alertMessage.innerHTML = ``;
    }, 2000);
  } else {
    // change from default city to the one entered in search
    cityInput = searchInput.value;
    // Background Opacity to Zero
    backgroundImage.style.opacity = '0';
    // Clears search value after a city is searched
    searchInput.value = '';
    //Scroll to the top when city is entered
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    fetchWeatherData(cityInput);
    localStorage.setItem('city', cityInput);
    e.preventDefault();
  }
});

backgroundImage.style.opacity = '0.8';
