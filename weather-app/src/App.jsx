import './App.css';
import { Search, MapPin, Wind } from 'react-feather';
import getWeather from './assets/api/api';
import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState('');

  const getWeatherbyCity = async () => {
    if (!city) return;

    const weatherData = await getWeather({ city });

    if (weatherData.error || weatherData.cod === '404') {
      setError('City not found. Please try again.');
      setWeather({});
    } else {
      setError('');
      setWeather(weatherData);
    }

    setCity('');
  };

  const hasWeather = weather && weather.weather;

  return (
    <div className="app">
      <h1>Weather App</h1>

      <div className="input-wrapper">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City"
        />
        <button onClick={getWeatherbyCity}>
          <Search />
        </button>
      </div>

      {error && (
        <div className="content">
          <h4 className="error">{error}</h4>
        </div>
      )}

      {hasWeather && !error && (
        <div className="content">
          <div className="location d-flex">
            <MapPin />
            <h2>
              {weather.name} <span>({weather.sys.country})</span>
            </h2>
          </div>

          <p className="datetext">{new Date().toLocaleDateString()}</p>

          <div className="weatherdesc">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <h3>{weather.weather[0].description}</h3>
          </div>

          <div className="tempstats d-flex flex-c">
            <h1>
              {Math.round(weather.main.temp)} <span>&deg;C</span>
            </h1>
            <h3>
              Feels Like {Math.round(weather.main.feels_like)}{' '}
              <span>&deg;C</span>
            </h3>
          </div>

          <div className="windstats d-flex">
            <Wind />
            <h3>
              Wind is {weather.wind.speed} m/s in {weather.wind.deg}&deg;
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
