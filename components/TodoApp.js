import React from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import FilterLink from './FilterLink';

class TodoApp extends React.Component {
  addTodo = text => {
    const { store } = this.props;
    const { id } = store.getState();
    store.dispatch({
      type: 'ADD_TODO',
      text,
      id,
    });
  };

  toggleTodo = id => {
    const { store } = this.props;
    store.dispatch({
      type: 'TOGGLE_TODO',
      id,
    });
  };

  filterTodos = filter => {
    const { store } = this.props;
    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter,
    });
  };

  getVisibleTodos = (todos, filter) => {
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

  render() {
    const { todos, visibilityFilter } = this.props.store.getState();
    return (
      <div>
        <TodoInput addTodo={this.addTodo} />
        <TodoList
          handleTodoClick={this.toggleTodo}
          todos={this.getVisibleTodos(todos)}
          visibilityFilter={visibilityFilter}
        />
        <FilterLink
          filter="SHOW_ALL"
          currentFilter={visibilityFilter}
          filterTodos={this.filterTodos}
        >
          Show All
        </FilterLink>
        <FilterLink
          filter="SHOW_COMPLETED"
          currentFilter={visibilityFilter}
          filterTodos={this.filterTodos}
        >
          Show Completed
        </FilterLink>
        <FilterLink
          filter="SHOW_ACTIVE"
          currentFilter={visibilityFilter}
          filterTodos={this.filterTodos}
        >
          Show Active
        </FilterLink>
      </div>
    );
  }
}

export default TodoApp;
