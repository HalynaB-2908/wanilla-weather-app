let apiKey = "2a6e140dffa5532ccd19daa46590a3bb";

let sourceApi = "https://api.openweathermap.org/data/2.5/weather?";

let units = "metric";

let form = document.querySelector("#search-form");

let displayedCity = document.querySelector("#currentCity");

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

function displayTemperature(response) {
  let temperature = document.querySelector("#temperatureValue");
  let description = document.querySelector("#weatherDescriptionValue");
  let humidity = document.querySelector("#humidityValue");
  let wind = document.querySelector("#windSpeedValue");
  let dateTime = document.querySelector("#dayTime");
  let icon = document.querySelector("#icon");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  dateTime.innerHTML = displayDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function searchWeather(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#cityInput");
  displayedCity.innerHTML = `${searchedCity.value}`;
  let url = `${sourceApi}q=${searchedCity.value}&appid=${apiKey}&&units=${units}`;
  axios.get(url).then(displayTemperature);
  searchedCity.value = "";
}

form.addEventListener("submit", searchWeather);
