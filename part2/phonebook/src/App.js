import React, { useState } from 'react';
import Filter from './components/Filter';
import Contacts from './components/Contacts';
import Form from './components/Form';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-123-123' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!persons.some((person) => person.name === newName)) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toUpperCase().includes(filter.toUpperCase())
      )
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} handleChange={handleFilter}>
        Filter items:
      </Filter>
      <Form
        handleSubmit={handleSubmit}
        handleName={handleName}
        handleNumber={handleNumber}
        newName={newName}
        newNumber={newNumber}
      >
        Add a new Contact
      </Form>
      <Contacts persons={filteredPersons}>Numbers</Contacts>
    </div>
  );
};

export default App;
