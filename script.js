async function getWeatherByCity() {
    const location = document.getElementById('locationInput').value;
    if (!location) return;
    const weatherData = await fetchWeatherData(location);
    displayWeather(weatherData);
}

async function getWeatherByLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;
        const weatherData = await fetchWeatherData(null, latitude, longitude);
        displayWeather(weatherData);
    });
}

async function fetchWeatherData(location, lat, lon) {
    const apiKey = '4ddcf9f1d218fb963daddd1cfb9bb749'; // Replace with your actual API key
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;
    if (location) {
        url += `&q=${location}`;
    } else if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const body = document.body;
    
    if (!data || data.cod !== 200) {
        weatherDisplay.innerHTML = '<p>Weather data not found. Please try again.</p>';
        weatherDisplay.style.display = 'block';
        return;
    }

    const weatherIcon = getWeatherIcon(data.weather[0].icon);
    const weatherImage = getWeatherImage(data.weather[0].main);
    const backgroundImage = `url('${weatherImage}')`;
    body.style.backgroundImage = backgroundImage;

    weatherDisplay.innerHTML = `
        <div class="weather-details">
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>${data.weather[0].description}</p>
            <img src="${weatherIcon}" alt="${data.weather[0].main}">
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${data.wind.speed} m/s</p>
        </div>
    `;
    weatherDisplay.style.display = 'block';
}

function getWeatherIcon(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
}

function getWeatherImage(weather) {
    switch (weather.toLowerCase()) {
        case 'clear':
            return 'images/clear.jpg';
        case 'clouds':
            return 'images/clouds.jpg';
        case 'rain':
            return 'images/rain.jpg';
        case 'light rain':
            return 'images/rain.jpg';
        case 'snow':
            return 'images/snow.jpg';
        case 'thunderstorm':
            return 'images/thunderstorm.jpg';
        case 'drizzle':
            return 'images/drizzle.jpg';
        case 'mist':
            return 'images/mist.jpg';
        case 'haze':
            return 'images/mist.jpg';
        default:
            return 'images/default.jpg';
    }
}