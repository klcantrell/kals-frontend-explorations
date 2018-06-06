import { combineReducers } from 'redux';

// TODOS

const todos = (state=[], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [ ...state, todo(undefined, action) ];
    case 'TOGGLE_TODO':
      return state.map(t => {
        return todo(t, action);
      });
    default:
      return state;
  }
};

const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return { id: action.id, text: action.text, completed: false };
    case 'TOGGLE_TODO':
      if (state.id === action.id) {
        return { ...state, completed: !state.completed };
      }
      return state;
    default:
      return state;
  }
};

// VISIBILITY

const visibilityFilter = (state='SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state;
  }
};

// ID

const id = (state=0, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return state + 1;
    default:
      return state;
  }
};

// COMBINED

const todoApp = combineReducers({
    todos,
    visibilityFilter,
    id
});

export default todoApp;