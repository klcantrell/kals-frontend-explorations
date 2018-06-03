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

const createStore = reducer => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.length && listeners.forEach(listener => listener());
  };

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};

const store = createStore(counter);

const render = () => {
  const { count } = store.getState();
  document.getElementById('countDisplay').textContent = count;
};

const unsubscribeRender = store.subscribe(render);
render();

document.getElementById('inc').addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});

document.getElementById('unsub').addEventListener('click', () => {
  unsubscribeRender();
});
