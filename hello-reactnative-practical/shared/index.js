import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import App from './App';

const store = configureStore();

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RNRedux;
