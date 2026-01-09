const API_KEY = "e7d2c80ba78ea52a5720e9c380e77c70";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM elements
const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const tempEl = document.querySelector(".temp");
const cityEl = document.querySelector(".city");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");

console.log(searchInput.value);



// Fetch weather data
async function getWeather(city) {
  try {
    console.log(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    updateUI(data);
  } catch (error) {
    alert(error.message);
  }
}
 
// Update UI
function updateUI(data) {
  tempEl.textContent = `${Math.round(data.main.temp)}°C`;
  cityEl.textContent = data.name;
  humidityEl.textContent = `${data.main.humidity}%`;
  windEl.textContent = `${data.wind.speed} km/hr`;

  const condition = data.weather[0].main.toLowerCase();

  if (condition.includes("cloud")) {
    weatherIcon.src = "clouds.jpeg";
  } else if (condition.includes("rain")) {
    weatherIcon.src = "rain.jpeg";
  } else if (condition.includes("clear")) {
    weatherIcon.src = "clear.jpeg";
  } else if (condition.includes("snow")) {
    weatherIcon.src = "snow.jpeg";
  } else {
    weatherIcon.src = "mist.jpeg";
  }
}

// Button click
searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  console.log(city);
  if (city !== "") {
    getWeather(city);
    searchInput.value = "";
  }
});

// Enter key support
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// Default city on load (optional)
getWeather("Kolkata");