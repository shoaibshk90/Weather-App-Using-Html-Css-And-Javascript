// Replace with your OpenWeatherMap API key
const apiKey = '5dc98402239f45c61c363803a62121ac';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

// Select elements from the DOM
const searchBox = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-box button');
const weatherIcon = document.querySelector('.weather img');
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const humidityElement = document.querySelector('.humidity .info-humidity span');
const windSpeedElement = document.querySelector('.wind .info-humidity span');

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const city = searchBox.value;
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

// Function to fetch weather data from OpenWeatherMap API
function getWeather(city) {
    fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                // Update the UI with the fetched data
                temperatureElement.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
                descriptionElement.textContent = data.weather[0].description;
                humidityElement.textContent = `${data.main.humidity}%`;
                windSpeedElement.textContent = `${Math.round(data.wind.speed)} Km/h`;

                // Set the weather icon based on the weather condition
                const weatherCondition = data.weather[0].main.toLowerCase();
                updateWeatherIcon(weatherCondition);
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to retrieve weather data. Please try again later.');
        });
}

// Function to update the weather icon
function updateWeatherIcon(condition) {
    let iconSrc = 'images/cloud.png'; // Default image

    if (condition.includes('clear')) {
        iconSrc = 'images/clear.png';
    } else if (condition.includes('rain')) {
        iconSrc = 'images/rain.png';
    } else if (condition.includes('snow')) {
        iconSrc = 'images/snow.png';
    } else if (condition.includes('clouds')) {
        iconSrc = 'images/cloud.png';
    } else if (condition.includes('mist')) {
        iconSrc = 'images/mist.png';
    } else if (condition.includes('haze')) {
        iconSrc = 'images/haze.png';
    }

    weatherIcon.src = iconSrc;
}
