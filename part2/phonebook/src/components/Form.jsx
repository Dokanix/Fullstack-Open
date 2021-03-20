import React from 'react';

const Form = ({
  handleSubmit,
  handleName,
  handleNumber,
  newName,
  newNumber,
  children,
}) => {
  return (
    <div>
      <h2>{children}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleName} />
          <br />
          number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
