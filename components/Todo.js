import React from 'react';

const Todo = ({ completed, handleClick, text }) => {
  const styles = {
    todoContainer: {
      width: '80%',
      cursor: 'pointer',
    },
    todoItemDefault: {
      textDecoration: 'none',
    },
    todoItemDone: {
      textDecoration: 'line-through',
    },
  };

  return (
    <div onClick={handleClick} style={styles.todoContainer}>
      <li style={completed ? styles.todoItemDone : styles.todoItemDefault}>
        {text}
      </li>
    </div>
  );
};

export default Todo;
