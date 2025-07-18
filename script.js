const apiKey = '88b5a0734532259c67cb85841827a1d8'; // Replace with your OpenWeatherMap API key

const background = document.querySelector('.background');

document.getElementById('search-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value.trim();
  if (city === '') return;

  const weatherCard = document.getElementById('weather-card');
  const errorMessage = document.getElementById('error-message');

  weatherCard.style.display = 'none';
  errorMessage.style.display = 'none';

  fetchWeatherData(city);
});

async function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    // Update UI
    document.getElementById('city-name').textContent = data.name;
    const desc = data.weather[0].description;
    document.getElementById('weather-desc').textContent = desc.toUpperCase();
    document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = Math.round(data.wind.speed);
    document.getElementById('weather-card').style.display = 'block';

    // Update background
    updateBackground(desc);

  } catch (error) {
    document.getElementById('error-message').textContent = error.message;
    document.getElementById('error-message').style.display = 'block';
  }
}

function updateBackground(description) {
  background.classList.remove('sunny-bg', 'cloudy-bg', 'rainy-bg', 'default-bg');

  if (description.includes('sun')) {
    background.classList.add('sunny-bg');
  } else if (description.includes('cloud')) {
    background.classList.add('cloudy-bg');
  } else if (description.includes('rain') || description.includes('drizzle')) {
    background.classList.add('rainy-bg');
  } else {
    background.classList.add('default-bg');
  }
}

// Clear button
document.getElementById('clear-btn').addEventListener('click', () => {
  document.getElementById('weather-card').style.display = 'none';
  document.getElementById('city-input').value = '';
  background.classList.remove('sunny-bg', 'cloudy-bg', 'rainy-bg');
  background.classList.add('default-bg');
});

// Allow Enter key
document.getElementById('city-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    document.getElementById('search-btn').click();
  }
});

// Auto-focus
document.getElementById('city-input').focus();