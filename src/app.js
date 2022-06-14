let apiKey = "2a6e140dffa5532ccd19daa46590a3bb";

let sourceApi = "https://api.openweathermap.org/data/2.5/weather?";

let units = "metric";

let form = document.querySelector("#search-form");

let displayedCity = document.querySelector("#currentCity");

function displayTemperature(response) {
  console.log(response.data);
  let temperatureData = Math.round(response.data.main.temp);
  let descriptionData = response.data.weather[0].description;
  let humidityData = response.data.main.humidity;
  let windData = response.data.wind.speed;
  let temperature = document.querySelector("#temperatureValue");
  let description = document.querySelector("#weatherDescriptionValue");
  let humidity = document.querySelector("#humidityValue");
  let wind = document.querySelector("#windSpeedValue");
  temperature.innerHTML = `${temperatureData}`;
  description.innerHTML = `${descriptionData}`;
  humidity.innerHTML = `${humidityData}`;
  wind.innerHTML = `${windData}`;
}

function searchWeather(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#cityInput");
  displayedCity.innerHTML = `${searchedCity.value}`;
  let url = `${sourceApi}q=${searchedCity.value}&appid=${apiKey}&&units=${units}`;
  axios.get(url).then(displayTemperature);
}
form.addEventListener("submit", searchWeather);
// date and time section
let today = new Date();

function displayDayOfTheWeek() {
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

  let currentDay = document.querySelector("#dayOfTheWeek");

  currentDay.innerHTML = `${day}`;
}

displayDayOfTheWeek();

function displayTime() {
  let hours = today.getHours();

  let minutes = today.getMinutes();

  let currentTime = document.querySelector("#time");

  if (hours < 10) {
    currentTime.innerHTML = `0${hours}:${minutes}`;
  } else if (minutes < 10) {
    currentTime.innerHTML = `${hours}:0${minutes}`;
  } else {
    currentTime.innerHTML = `${hours}:${minutes}`;
  }
}

displayTime();
