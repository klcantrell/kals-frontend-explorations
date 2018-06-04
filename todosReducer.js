import initialState from './todosInitialState';

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

export default todosReducer;