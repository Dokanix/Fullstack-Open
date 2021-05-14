import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { init } from './reducers/anecdoteReducer';
import AnectodeForm from './components/AnectodeForm';
import AnectodeList from './components/AnectodeList';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnectodeList />
      <AnectodeForm />
    </div>
  );
};

export default App;
