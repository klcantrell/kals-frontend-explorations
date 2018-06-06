import React from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

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

  render() {
    return (
      <div>
        <TodoInput addTodo={this.addTodo} />
        <TodoList toggleTodo={this.toggleTodo} todos={this.props.store.getState().todos} />
      </div>
    );
  }
}

export default TodoApp;