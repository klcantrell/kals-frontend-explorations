import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp';
import store from './store';
import StateContext from './stateContext';

function Provider({children, store}) {
  return (
    <StateContext.Provider value={store}>
      {children}
    </StateContext.Provider>
  );
}

ReactDOM.render(
    <Provider store={store}>
      <TodoApp />
    </Provider>,
  document.getElementById('root')
);