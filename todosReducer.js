import initialState from './todosInitialState';

const todosReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      const { id, text } = action;
      return [ ...state, {id, text, completed: false} ]
  }
};

export default todosReducer;