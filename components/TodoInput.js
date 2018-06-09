import React from 'react';
import Connect from './Connect';

const TodoInput = ({store}) => {
  let input;

  const handleSubmit = e => {
    e.preventDefault();
    addTodo(input.value);
    input.value = '';
  }

  const addTodo = text => {
    const { id } = store.getState();
    store.dispatch({
      type: 'ADD_TODO',
      text,
      id,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={node => input = node}/>
      <button type="submit">Test Add Todo</button>
    </form>
  )
};

export default Connect(TodoInput);