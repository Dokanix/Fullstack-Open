import React, { useState } from 'react';
import Header from './components/Header';
import Button from './components/Button';
import Statistics from './components/Statistics';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header>give feedback</Header>
      <Button handleClick={() => setGood(good + 1)}>Good</Button>
      <Button handleClick={() => setNeutral(neutral + 1)}>Neutral</Button>
      <Button handleClick={() => setBad(bad + 1)}>Bad</Button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
