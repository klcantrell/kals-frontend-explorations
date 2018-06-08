import React, { Component } from 'react';
import TodoList from './TodoList';


class VisibleTodoList extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  toggleTodo = id => {
    this.props.store.dispatch({
      type: 'TOGGLE_TODO',
      id,
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
    const props = this.props;
    const state = props.store.getState();

    return (
      <TodoList
        todos={this.getVisibleTodos(state.todos, state.visibilityFilter)}
        handleTodoClick={this.toggleTodo}
      >
      </TodoList>
    )
  }
}

export default VisibleTodoList;