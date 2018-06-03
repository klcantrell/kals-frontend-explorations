import React from 'react';
import ReactDOM from 'react-dom';
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

const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h2>{value}</h2>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const store = createStore(
  counter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState().count}
      onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
      onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
    />,
    document.getElementById('root')
  );
};

const unsubscribeRender = store.subscribe(render);
render();
