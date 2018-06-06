import React from 'react';

const TodoList = ({todos}) => {
  return (
    <ul>
      {todos.map((t, i) => (
        <li key={t.id}>{t.text}</li>
      ))}
    </ul>
  );
}

export default TodoList;