import React from 'react';
import TodoInput from './TodoInput';
import Footer from './Footer';
import TodoList from './TodoList';

const TodoApp = () => {
  return (
    <div>
      <TodoInput />
      <TodoList />
      <Footer />
    </div>
  );
}

export default TodoApp;
