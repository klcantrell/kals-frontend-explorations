import React from 'react';

const TodoList = ({todos, toggleTodo}) => {
  const styles = {
    todoContainer: {
      width: '80%',
      cursor: 'pointer'
    },
    todoItemDefault: {
      textDecoration: 'none',
    },
    todoItemDone: {
      textDecoration: 'line-through',
    },
  };

  return (
    <ul>
      {todos.map((t, i) => (
        <div key={t.id} onClick={() => toggleTodo(t.id)} style={styles.todoContainer}>
          <li  
            style={t.completed ? styles.todoItemDone : styles.todoItemDefault}>
            {t.text}
          </li>
        </div>
      ))}
    </ul>
  );
}

export default TodoList;