import { Navigation } from 'react-native-navigation';
import AuthScreen from './screens/Auth/Auth';
import SharePlaceScreen from './screens/SharePlace/SharePlace';
import FindPlaceScreen from './screens/FindPlace/FindPlace';

Navigation.registerComponent('myapp.AuthScreen', () => AuthScreen);
Navigation.registerComponent('myapp.SharePlaceScreen', () => SharePlaceScreen);
Navigation.registerComponent('myapp.FindPlaceScreen', () => FindPlaceScreen);
