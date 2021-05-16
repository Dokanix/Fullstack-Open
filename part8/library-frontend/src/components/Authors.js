import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [editAuthor] = useMutation(UPDATE_AUTHOR);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>...loading</div>;
  }

  const authors = result.data.allAuthors;

  const submit = (event) => {
    event.preventDefault();
    editAuthor({
      variables: {
        name,
        year: Number(year),
      },
    });
    setName('');
    setYear('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        name{' '}
        <input value={name} onChange={({ target }) => setName(target.value)} />{' '}
        <br />
        born{' '}
        <input
          type='number'
          value={year}
          onChange={({ target }) => setYear(target.value)}
        />{' '}
        <br />
        <button>update author</button>
      </form>
    </div>
  );
};

export default Authors;
