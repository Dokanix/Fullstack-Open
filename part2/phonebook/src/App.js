import React, { useState, useEffect } from 'react';
import Notification from './components/Notification';
import Filter from './components/Filter';
import Contacts from './components/Contacts';
import Form from './components/Form';
import services from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState('');

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

    const newPerson = { name: newName, number: newNumber };

    if (persons.some((person) => person.name === newName)) {
      if (!window.confirm('The person already exists. Update the number?')) {
        return;
      }

      const updatedPerson = persons.find((person) => person.name === newName);

      services
        .update(updatedPerson.id, newPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== updatedPerson.id ? person : returnedPerson
            )
          );
          setMessage(
            `Updated ${returnedPerson.name} number to ${returnedPerson.number}`
          );
          setTimeout(() => setMessage(''), 2000);
        })
        .catch((error) => {
          setMessage('User already deleted');
          setTimeout(() => setMessage(''), 2000);
        });
    } else {
      services.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage(`Added ${returnedPerson.name} to Contacts`);
        setTimeout(() => setMessage(''), 2000);
      });
    }
  };

  const deletePerson = (id) => {
    services.deletePerson(id).then((person) => {
      setPersons(persons.filter((person) => person.id !== id));
      setMessage(`Successfully removed user from Contacts`);
      setTimeout(() => setMessage(''), 2000);
    });
  };

  useEffect(() => {
    services.getAll().then((persons) => setPersons(persons));
  }, []);

  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toUpperCase().includes(filter.toUpperCase())
      )
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
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
      <Contacts persons={filteredPersons} handleClick={deletePerson}>
        Numbers
      </Contacts>
    </div>
  );
};

export default App;
