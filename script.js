
const apiKey = '88b5a0734532259c67cb85841827a1d8'; // Replace with your OpenWeatherMap API key

document.getElementById('search-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value.trim();
  if (city === '') return;

  fetchWeatherData(city);
});

async function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.getElementById('city-name').textContent = data.name;
    document.getElementById('weather-desc').textContent = data.weather[0].description;
    document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = Math.round(data.wind.speed);

    document.getElementById('weather-card').style.display = 'block';
  } catch (error) {
    alert(error.message);
  }
}