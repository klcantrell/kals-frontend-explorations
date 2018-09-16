import React from 'react';
import { connect } from 'react-redux';
import Todo from './Todo';
import { toggleTodo } from '../actionCreators';

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

const TodoList = ({ todos, handleTodoClick }) => {
  return (
    <ul>
      {todos.map((t, i) => (
        <Todo
          key={t.id}
          handleClick={() => handleTodoClick(t.id)}
          completed={t.completed}
          text={t.text}
        />
      ))}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleTodoClick: id => dispatch(toggleTodo(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);