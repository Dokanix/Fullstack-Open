import React from 'react';

const Search = ({ handleChange, value }) => (
  <input value={value} onChange={handleChange} type='text' />
);

export default Search;
