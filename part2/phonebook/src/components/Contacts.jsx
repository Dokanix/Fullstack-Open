import React from 'react';

const Contacts = ({ persons, children }) => (
  <div>
    <h2>{children}</h2>
    {persons.map((person) => (
      <div key={person.name}>{`${person.name} ${person.number}`}</div>
    ))}
  </div>
);

export default Contacts;
