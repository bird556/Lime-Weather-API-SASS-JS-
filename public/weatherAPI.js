function fetchWeatherData(city = 'Toronto') {
  // fetch(`/weather?city=${city}`)
  fetch(`/api/weather?city=${city}`)
    .then((response) => response.json())
    .then((data) => {
      temp.innerHTML = Math.round(data.current.temp_c) + '&#176;';
      weatherCondition.innerHTML = data.current.condition.text;
      feelsLike.innerHTML = Math.round(data.current.feelslike_c) + '&#176;';
      cityName.innerHTML = `${data.location.name}, ${data.location.region}`;
      wind.innerHTML = `${data.current.wind_kph} km/h`;
      humidityPercentage.innerHTML = `${data.current.humidity}%`;
      cloudPercentage.innerHTML = `${data.current.cloud}%`;
      // Time
      const time = data.location.localtime.substr(11);
      timeOutput.innerHTML = time;

      const iconId = data.current.condition.icon.substr(
        '/cdn.weatherapi.com/weather/64x64/'.length
      );

      iconWeather.src = `/icons1/${iconId}`;

      // Default time of day
      let timeOfDay = `day`;

      // Number code in data condition
      const code = data.current.condition.code;

      // Change to night if time is night time
      if (!data.current.is_day) {
        timeOfDay = `night`;
      }

      if (code == 1000) {
        backgroundImage.src = `/img/${timeOfDay}/clear2.jpg`;
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1030 ||
        code == 1069 ||
        code == 1135 ||
        code == 1276 ||
        code == 1282
      ) {
        backgroundImage.src = `/img/${timeOfDay}/cloudy.jpg`;
      } else if (
        code == 1063 ||
        code == 1150 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1273 ||
        code == 1192 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246
      ) {
        backgroundImage.src = `/img/${timeOfDay}/rain.jpg`;
      } else if (code == 1009) {
        backgroundImage.src = `/img/${timeOfDay}/overcast.jpg`;
      } else if (
        code == 1066 ||
        code == 1169 ||
        code == 1172 ||
        code == 1187 ||
        code == 1114 ||
        code == 1117 ||
        code == 1171 ||
        code == 1210 ||
        code == 1213 ||
        code == 1216 ||
        code == 1219 ||
        code == 1222 ||
        code == 1225 ||
        code == 1237 ||
        code == 1279 ||
        code == 1282
      ) {
        backgroundImage.src = `/img/${timeOfDay}/snow.jpg`;
      } else if (code == 1087) {
        backgroundImage.src = `/img/${timeOfDay}/thunder.jpg`;
      }
      backgroundImage.style.opacity = '0.8';
    })
    .catch((err) => {
      console.log(err);
      document.getElementById('search').scrollIntoView();
      backgroundImage.style.opacity = '0.8';
      alertMessage.innerHTML = `City not found, try again`;
      alertMessage.style.animation =
        'shake-bottom 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both';
      setTimeout(() => {
        alertMessage.style.animation = '';
        alertMessage.innerHTML = ``;
      }, 3000);
    });
}
