let apiKey = "2a6e140dffa5532ccd19daa46590a3bb";

let sourceApi = "https://api.openweathermap.org/data/2.5/weather?";

let units = "metric";

let form = document.querySelector("#search-form");

let displayedCity = document.querySelector("#currentCity");

let celsiusTemperature = null;

function displayDate(timestamp) {
  let today = new Date(timestamp);

  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[today.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  function displayDay(timestamp) {
    let days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let today = new Date(timestamp);
    let day = days[today.getDay()];
    return `${day}`;
  }
  let forecastContainer = document.querySelector("#forecastContainer");
  let forecastHTMLTemplate = "";

  let forecastArray = response.data.daily;
  // forecastArray.length = 6;
  forecastArray.forEach((item, index) => {
    if(index < 6) {
    forecastHTMLTemplate =
      forecastHTMLTemplate +
      ` <div class="col-2 forecastItem">
              <span class="day-week">${displayDay(item.dt * 1000)}</span>
              <img src="http://openweathermap.org/img/wn/${
                item.weather[0].icon
              }@2x.png" />
              <span class="max-temperature">${Math.round(item.temp.max)}°</span>
              <span class="min-temperature">${Math.round(item.temp.min)}°</span>  
            </div>`;
  }
  });
  forecastContainer.innerHTML = forecastHTMLTemplate;
}

function getForecast(coordinates) {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&&units=${units}`;
  axios.get(url).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data.sys.sunrise);
  let temperature = document.querySelector("#temperatureValue");
  let description = document.querySelector("#weatherDescriptionValue");
  let humidity = document.querySelector("#humidityValue");
  let wind = document.querySelector("#windSpeedValue");
  let dateTime = document.querySelector("#dayTime");
  let icon = document.querySelector("#icon");
  celsiusTemperature = `${response.data.main.temp}`;
  temperature.innerHTML = Math.round(celsiusTemperature);
  description.innerHTML = `${response.data.weather[0].description}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  displayedCity.innerHTML = `${response.data.name}`;
  dateTime.innerHTML = displayDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function searchWeather(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#cityInput");
  let url = `${sourceApi}q=${searchedCity.value}&appid=${apiKey}&&units=${units}`;
  axios.get(url).then(displayTemperature);
  searchedCity.value = "";
}

form.addEventListener("submit", searchWeather);

function connectNavigator() {
  function showCurrentLocationWeather(response) {
    console.log(response.data.sys.sunrise);
    let currentTemperature = Math.round(response.data.main.temp);
    let temperature = document.querySelector("#temperatureValue");
    temperature.innerHTML = `${currentTemperature}`;
    let weatherDescription = document.querySelector("#weatherDescriptionValue");
    let descriptionData = response.data.weather[0].description;
    weatherDescription.innerHTML = descriptionData;
    currentCity.innerHTML = `${response.data.name}`;
    getForecast(response.data.coord);
  }

  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let url = `${sourceApi}lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=${units}`;
    axios.get(url).then(showCurrentLocationWeather);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

connectNavigator();