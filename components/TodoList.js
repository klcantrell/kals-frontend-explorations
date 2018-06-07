import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, handleTodoClick, visibilityFilter: filter }) => {
  return (
    <ul>
      {todos.map((t, i) => (
        <Todo
          key={t.id}
          handleClick={() => handleTodoClick(t.id)}
          completed={t.completed}
          text={t.text}
        />
      ))}
    </ul>
  );
};

export default TodoList;
