const API_KEY = ""; 
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const weatherCard = document.getElementById('weatherCard');
    const errorMsg = document.getElementById('errorMsg');
    const loader = document.getElementById('loader');
    const cacheStatus = document.getElementById('cacheStatus');

    let weatherCache = {};

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchBtn.click();
    });

    async function fetchWeather(city) {
        errorMsg.classList.add('hidden');
        weatherCard.classList.add('hidden');
        loader.classList.remove('hidden');
        
        const cacheKey = city.toLowerCase();
        if (weatherCache[cacheKey]) {
            console.log("Serving from Cache...");
            setTimeout(() => {
                displayWeather(weatherCache[cacheKey]);
                cacheStatus.classList.remove('hidden');
                loader.classList.add('hidden');
            }, 300);
            return;
        }

        try {
            let data;

            if (API_KEY === "") {
                data = await mockApiCall(city);
            } else {
                const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
                
                if (!response.ok) {
                    if (response.status === 404) throw new Error("City not found.");
                    if (response.status === 401) throw new Error("Invalid API Key.");
                    throw new Error("Network error.");
                }
                data = await response.json();
            }

            weatherCache[cacheKey] = data;

            displayWeather(data);
            cacheStatus.classList.add('hidden');

        } catch (error) {
            showError(error.message);
        } finally {
            loader.classList.add('hidden');
        }
    }

    function displayWeather(data) {
        document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country || ''}`;
        document.getElementById('temperature').textContent = Math.round(data.main.temp);
        document.getElementById('condition').textContent = data.weather[0].main;
        document.getElementById('humidity').textContent = data.main.humidity;
        
        weatherCard.classList.remove('hidden');
    }

    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.classList.remove('hidden');
    }

    function mockApiCall(city) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockDB = {
                    "london": { name: "London", sys: { country: "GB" }, main: { temp: 15, humidity: 72 }, weather: [{ main: "Drizzle" }] },
                    "india": { name: "India", sys: { country: "IND" }, main: { temp: 32, humidity: 54 }, weather: [{ main: "Sunny" }] },
                    "new york": { name: "New York", sys: { country: "US" }, main: { temp: 22, humidity: 45 }, weather: [{ main: "Clear" }] },
                    "tokyo": { name: "Tokyo", sys: { country: "JP" }, main: { temp: 28, humidity: 60 }, weather: [{ main: "Cloudy" }] }
                };

                const key = city.toLowerCase();
                if (mockDB[key]) {
                    resolve(mockDB[key]);
                } else {
                    reject(new Error("City not found (Demo Mode: Try London, India, New York, or Tokyo)"));
                }
            }, 1000);
        });
    }
});