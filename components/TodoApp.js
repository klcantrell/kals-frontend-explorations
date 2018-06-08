import React from 'react';
import TodoInput from './TodoInput';
import Footer from './Footer';
import VisibleTodoList from './VisibleTodoList';

const TodoApp = ({store}) => {

  const { todos, visibilityFilter: filter } = store.getState();

  return (
    <div>
      <TodoInput store={store} />
      <VisibleTodoList store={store} />
      <Footer store={store} />
    </div>
  );
}

export default TodoApp;
