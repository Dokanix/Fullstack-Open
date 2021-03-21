import { useState } from 'react';
import Country from './Country';

const Countries = ({ countries, filter, maxLength }) => {
  const [country, setCountry] = useState({});

  const filteredCountries = countries.filter((country) =>
    country.name.toUpperCase().includes(filter.toUpperCase())
  );

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];

    return <Country country={country} />;
  }

  return filteredCountries.length <= maxLength ? (
    <ul>
      {country.name ? <Country country={country} /> : null}
      {filteredCountries.map((country) => (
        <li key={country.name}>
          {country.name}{' '}
          <button onClick={() => setCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  ) : (
    <div>Too many matches, enter a more specific filter</div>
  );
};

export default Countries;
