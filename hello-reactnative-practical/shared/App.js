import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import AuthScreen from './screens/Auth/Auth';
import SharePlaceScreen from './screens/SharePlace/SharePlace';
import FindPlaceScreen from './screens/FindPlace/FindPlace';

const store = configureStore();

Navigation.registerComponent(
  'myapp.AuthScreen',
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'myapp.SharePlaceScreen',
  () => SharePlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'myapp.FindPlaceScreen',
  () => FindPlaceScreen,
  store,
  Provider
);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'myapp.AuthScreen',
    title: 'Login',
  },
});
