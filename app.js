const initialState = {
  count: 0
}

function counter(state=initialState, action) {
  let count;
  switch (action.type) {
    case 'INCREMENT':
      count = state.count + 1;
      return {...state, count};
    case 'DECREMENT':
      count = state.count - 1;
      return {...state, count};
    default:
      return state;
  }
}

export { counter };