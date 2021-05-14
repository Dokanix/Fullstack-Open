import { getAll, addAnecdote, updateAnecdote } from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map((item) => {
        if (item.id === action.value) {
          return {
            ...item,
            votes: item.votes + 1,
          };
        } else {
          return item;
        }
      });
    case 'ADD':
      return [
        ...state,
        { content: action.value.content, votes: 0, id: action.value.id },
      ];
    case 'INIT':
      return action.value;
    default:
      return state;
  }
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    const response = await updateAnecdote(anecdote);
    dispatch({
      type: 'VOTE',
      value: response.id,
    });
  };
};

export const add = (anecdote) => {
  return async (dispatch) => {
    const response = await addAnecdote(anecdote);
    dispatch({
      type: 'ADD',
      value: response,
    });
  };
};

export const init = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    dispatch({
      type: 'INIT',
      value: anecdotes,
    });
  };
};

export default reducer;
