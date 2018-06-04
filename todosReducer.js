import initialState from './todosInitialState';

const todosReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      const { id, text } = action;
      return [ ...state, {id, text, completed: false} ]
    case 'TOGGLE_TODO':
      return state.map(todo => {
        return todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo;
      })
  }
};

export default todosReducer;