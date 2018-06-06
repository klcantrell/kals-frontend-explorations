import React from 'react';

class TodoInput extends React.Component {
  state = {
    inputText: '',
  };

  handleChange = e => {
    this.setState({
      inputText: e.target.value,
    })
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.inputText);
    this.setState({
      inputText: ''
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} value={this.state.inputText}/>
        <button
          type="submit"
          onClick={() => this.handleSubmit} 
        >
          Test Add Todo
        </button>
      </form>
    )
  }
}

export default TodoInput;