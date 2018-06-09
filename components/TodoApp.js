import React from 'react';
import TodoInput from './TodoInput';
import Footer from './Footer';
import VisibleTodoList from './VisibleTodoList';

const TodoApp = () => {
  return (
    <div>
      <TodoInput />
      <VisibleTodoList />
      <Footer />
    </div>
  );
}

export default TodoApp;
