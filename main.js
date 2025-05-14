// const apiKey = "e349553e4be1f3a108798ec32604942e----";
// const apiUrl =
//   "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherIcons = {
  Clouds: "image/clouds.png",
  Rain: "image/rain.png",
  Drizzle: "image/drizzle.png",
  Clear: "image/clear.png",
  Mist: "image/mist.png",
};
const cityElem = document.querySelector(".city");
const tempElem = document.querySelector(".term");
const humidityElem = document.querySelector(".humidity");
const windElem = document.querySelector(".wind");
const weatherElem = document.querySelector(".weather");
const errorElem = document.querySelector(".error");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    cityElem.innerHTML = data.name;
    tempElem.innerHTML = Math.round(data.main.temp) + "°C";
    humidityElem.innerHTML = data.main.humidity + "%";
    windElem.innerHTML = data.wind.speed + " km/h";

    const weatherMain = data.weather[0].main;

    if (weatherIcons[weatherMain]) {
      weatherIcon.src = weatherIcons[weatherMain];
    }

    weatherElem.style.display = "block";
    errorElem.style.display = "none";
  } catch (e) {
    weatherElem.style.display = "none";
    errorElem.style.display = "block";
    console.error("Помилка при отриманні погоди:", error.message);
  }

}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
