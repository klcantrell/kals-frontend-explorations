import React from 'react';

const TodoList = ({todos, toggleTodo, visibilityFilter: filter}) => {
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

  const getVisibleTodos = (todos, filter) => {
    return todos.filter(t => {
      switch (filter) {
        case 'SHOW_ALL':
          return t;
        case 'SHOW_ACTIVE':
          return t.completed === false;
        case 'SHOW_COMPLETED':
          return t.completed === true;
        default:
          return t;
      }
    });
  }

  return (
    <ul>
      {getVisibleTodos(todos, filter).map((t, i) => (
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