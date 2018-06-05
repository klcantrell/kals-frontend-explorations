import { createStore } from 'redux';
import todoAppCombinedReducers from './todosReducer';

const store = createStore(todoAppCombinedReducers);

store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
});

console.log(store.getState());

store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Learn React'
});

console.log(store.getState());

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 1,
});

console.log(store.getState());

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});

console.log(store.getState());