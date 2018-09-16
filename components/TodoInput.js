import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actionCreators';
 
const TodoInput = ({id, addTodo}) => {
  let input;

  const handleSubmit = e => {
    e.preventDefault();
    addTodo(input.value, id);
    input.value = '';
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={node => input = node}/>
      <button type="submit">Test Add Todo</button>
    </form>
  )
};

const mapStateToProps = state => {
  return {
    id: state.id
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (text, id) => dispatch(addTodo(text, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);