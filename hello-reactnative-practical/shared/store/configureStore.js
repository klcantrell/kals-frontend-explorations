import { createStore, combineReducers, compose } from 'redux';
import placesReducer from './reducers/places';

const rootReducer = combineReducers({
  places: placesReducer,
});

let composeEnhancers = compose;

if (/* eslint-disable*/ __DEV__ /* eslint-enable */) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers());
};

export default configureStore;