const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.value;
    default:
      return state;
  }
};

export const set = (filter) => {
  return {
    type: 'SET_FILTER',
    value: filter,
  };
};

export default reducer;
