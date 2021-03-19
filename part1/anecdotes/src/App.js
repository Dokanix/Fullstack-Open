import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  const drawAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const addVote = () => {
    setPoints({
      ...points,
      [selected]: points[selected] + 1,
    });
  };

  console.log(points);

  const maxVotes = () => {
    let max = 0;

    for (const key in points) {
      if (points[key] > points[max]) {
        max = key;
      }
    }

    return max;
  };

  return (
    <div>
      <h1>Anecdotes</h1>
      <h2>Anecdote of the Day</h2>
      <div>{anecdotes[selected]}</div>
      <div>{`${points[selected]} votes`}</div>
      <button onClick={addVote}>Vote</button>
      <button onClick={drawAnecdote}>Draw Anecdote</button>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[maxVotes()]}</div>
    </div>
  );
};

export default App;
