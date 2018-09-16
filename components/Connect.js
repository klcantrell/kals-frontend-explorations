import React from 'react';
import TodoInput from './TodoInput';
import StateContext from '../stateContext';

function Connect(Component) {
  return function ConnectedComponent(props) {
    return (
      <StateContext.Consumer>
        {context => {
          return <Component {...props} store={context} />;
        }}
      </StateContext.Consumer>
    );
  }
}

export default Connect;