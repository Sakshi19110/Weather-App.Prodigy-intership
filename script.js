const apiKey = 'cb480c7617c4ec860cf5e350fe31ac43'; // Replace with your actual API key
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const locationDisplay = document.getElementById('location');
const temperatureDisplay = document.getElementById('temperature');
const descriptionDisplay = document.getElementById('description');
const humidityDisplay = document.getElementById('humidity');
const windDisplay = document.getElementById('wind');
const iconDisplay = document.getElementById('icon');

// Fetch weather by city name
async function fetchWeatherByCity(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert('City not found. Please try again.');
        console.error(error);
    }
}

// Fetch weather by geolocation
async function fetchWeatherByLocation(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert('Error fetching weather for your location.');
        console.error(error);
    }
}

// Display weather data
function displayWeather(data) {
    locationDisplay.textContent = `${data.name}, ${data.sys.country}`;
    temperatureDisplay.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionDisplay.textContent = data.weather[0].description;
    humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
    windDisplay.textContent = `Wind: ${data.wind.speed} m/s`;
    iconDisplay.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">`;
}

// Event listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
    } else {
        alert('Please enter a city name');
    }
});

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByLocation(latitude, longitude);
            },
            (error) => {
                alert('Error getting your location. Please enable location services.');
                console.error(error);
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

// Initial load (optional)
fetchWeatherByCity('London'); // Default city