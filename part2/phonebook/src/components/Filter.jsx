import React from 'react';

const Filter = ({ value, handleChange, children }) => (
  <div>
    {children}
    <input value={value} onChange={handleChange} />
  </div>
);

export default Filter;
