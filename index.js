import { createStore } from 'redux';

const initialState = {
  count: 0,
};

const counter = (state = initialState, action) => {
  let count;
  switch (action.type) {
    case 'INCREMENT':
      count = state.count + 1;
      return { ...state, count };
    case 'DECREMENT':
      count = state.count - 1;
      return { ...state, count };
    default:
      return state;
  }
};

const store = createStore(counter);

const render = () => {
  const { count } = store.getState();
  document.getElementById('countDisplay').textContent = count;
};

store.subscribe(render);
render();

document.getElementById('inc').addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
