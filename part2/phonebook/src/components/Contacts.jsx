import React from 'react';

const Contacts = ({ persons, handleClick, children }) => (
  <div>
    <h2>{children}</h2>
    {persons.map((person) => (
      <div key={person.id}>
        {`${person.name} ${person.number}`}{' '}
        <button onClick={() => handleClick(person.id)}>Delete</button>
      </div>
    ))}
  </div>
);

export default Contacts;
