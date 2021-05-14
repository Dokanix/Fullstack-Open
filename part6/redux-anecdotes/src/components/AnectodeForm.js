import { useDispatch } from 'react-redux';
import { add } from '../reducers/anecdoteReducer';
import { set, clear } from '../reducers/notificationReducer';

const AnectodeForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    dispatch(set(`Added "${event.target.name.value}"`, 2));
    dispatch(add(event.target.name.value));
  };

  return (
    <div>
      <h2>create new</h2>
      <form
        onSubmit={(event) => {
          addAnecdote(event);
        }}
      >
        <div>
          <input name='name' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnectodeForm;
