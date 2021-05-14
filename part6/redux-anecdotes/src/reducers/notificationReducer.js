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

let timeoutId;

export const set = (message, time) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      value: message,
    });

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
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
