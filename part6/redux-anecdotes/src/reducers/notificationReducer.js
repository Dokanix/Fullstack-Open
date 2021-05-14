const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.value;
    case 'CLEAR':
      return '';
    default:
      return state;
  }
};

export const set = (message, time) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      value: message,
    });

    const id = setTimeout(() => {
      dispatch({
        type: 'CLEAR',
      });
    }, time * 1000);
  };
};

export const clear = () => {
  return {
    type: 'CLEAR',
  };
};

export default reducer;
