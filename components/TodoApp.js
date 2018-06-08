import React from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import Footer from './Footer';

const TodoApp = ({store}) => {
  const addTodo = text => {
    const { id } = store.getState();
    store.dispatch({
      type: 'ADD_TODO',
      text,
      id,
    });
  };

  const toggleTodo = id => {
    store.dispatch({
      type: 'TOGGLE_TODO',
      id,
    });
  };

  const filterTodos = filter => {
    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter,
    });
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
  };

  const { todos, visibilityFilter: filter } = store.getState();

  return (
    <div>
      <TodoInput addTodo={addTodo} />
      <TodoList
        handleTodoClick={toggleTodo}
        todos={getVisibleTodos(todos, filter)}
      />
      <Footer filter={filter} filterTodos={filterTodos} store={store} />
    </div>
  );
}

export default TodoApp;
