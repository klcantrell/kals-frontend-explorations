import initialState from './todosInitialState';

// TODOS

const todosReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [ ...state, todoReducer(undefined, action) ];
    case 'TOGGLE_TODO':
      return state.map(todo => {
        return todoReducer(todo, action);
      });
    default:
      return state;
  }
};

const todoReducer = (state, action) => {
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

const visibilityReducer = (state='SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state;
  }
}

// COMBINED

const todoAppCombinedReducers = (state = {}, action) => {
  return {
    todos: todosReducer(state.todos, action),
    visibilityFilter: visibilityReducer(state.visibilityFilter, action)
  }
}

export default todoAppCombinedReducers;