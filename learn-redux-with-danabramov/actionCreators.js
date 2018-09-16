export const ADD_TODO = 'ADD_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export const addTodo = (text, id) => {
  return {
    type: ADD_TODO,
    text,
    id,
  };
};

export const filterTodos = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  }
};

export const toggleTodo = id => {
  return {
    type: TOGGLE_TODO,
    id,
  }
};