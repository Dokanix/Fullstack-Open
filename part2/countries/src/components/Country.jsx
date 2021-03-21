import { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({
  country: { name, capital, population, languages, flag },
}) => {
  const [temperature, setTemperature] = useState(0);
  const [wind, setWind] = useState(0);
  const [direction, setDirection] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
      )
      .then((response) => {
        console.log(response.data);
        setTemperature(response.data.current.temperature);
        setWind(response.data.current.wind_speed);
        setDirection(response.data.current.wind_dir);
        setWeatherIcon(response.data.current.weather_icons[0]);
        setWeatherDescription(response.data.current.weather_descriptions[0]);
      });
  }, [capital]);

  return (
    <div>
      <h2>{name}</h2>
      <div>Capital: {capital}</div>
      <div>Population: {population}</div>
      <h3>Languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={flag}
        alt={`Flag of ${name}`}
        style={{ border: '2px solid black', width: '200px' }}
      />
      <h3>Weather in {capital}</h3>
      <div>Temperature: {temperature} Celcius</div>
      <img src={weatherIcon} alt={weatherDescription} />
      <div>
        Wind: {wind} mph direction {direction}
      </div>
      <br />
      <br />
    </div>
  );
};

export default Country;
