import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import TodoApp from './components/TodoApp';

ReactDOM.render(
  <TodoApp store={store} />,
  document.getElementById('root')
);