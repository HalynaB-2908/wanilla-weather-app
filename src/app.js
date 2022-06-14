let apiKey = "2a6e140dffa5532ccd19daa46590a3bb";

let sourceApi = "https://api.openweathermap.org/data/2.5/weather?";

let units = "metric";

let form = document.querySelector("#search-form");

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
