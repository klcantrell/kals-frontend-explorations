import { Navigation } from 'react-native-navigation';
import AuthScreen from './screens/Auth/Auth';

Navigation.registerComponent('myapp.AuthScreen', () => AuthScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'myapp.AuthScreen',
            },
          },
        ],
        options: {
          topBar: {
            title: {
              text: 'Login',
            },
          },
        },
      },
    },
  });
});
