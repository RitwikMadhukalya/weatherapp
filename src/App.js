import React, { useState } from "react";
import "./assets/fontawesome/css/all.css";
import "./App.css";
const api = {
  key: "f6e1934c05a358f77a7e3125b3a6bcb4",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.weather[0].main === "Clouds"
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}℃</div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="weather_parameters">
                <div className="max_temp">
                  Maximum Temp: {Math.round(weather.main.temp_max)}℃
                  <i className="fas fa-long-arrow-alt-up weather-arrows"></i>
                </div>
                <div className="min_temp">
                  Minimum Temp: {Math.round(weather.main.temp_min)}℃
                  <i className="fas fa-long-arrow-alt-down weather-arrows"></i>
                </div>
                <div className="feels_like">
                  Feels like: {Math.round(weather.main.feels_like)}℃
                </div>
                <div className="humidity">
                  Humidity: {Math.round(weather.main.humidity)}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
