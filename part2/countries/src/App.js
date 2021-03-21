import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Countries from './components/Countries';

function App() {
  const [searchedValue, setSearchedValue] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  }, []);

  const handleChange = (event) => {
    setSearchedValue(event.target.value);
  };

  return (
    <div className='App'>
      <h2>Find countries: </h2>
      <Search value={searchedValue} handleChange={handleChange} />
      <h2>Searched: {searchedValue}</h2>
      <Countries countries={countries} filter={searchedValue} maxLength={10} />
    </div>
  );
}

export default App;
