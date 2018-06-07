import React from 'react';

const TodoInput = ({addTodo}) => {
  let input;

  const handleSubmit = e => {
    e.preventDefault();
    addTodo(input.value);
    input.value = '';
  }
  return (
    <form onSubmit={handleSubmit}>
      <input ref={node => input = node}/>
      <button type="submit">Test Add Todo</button>
    </form>
  )
};

export default TodoInput;