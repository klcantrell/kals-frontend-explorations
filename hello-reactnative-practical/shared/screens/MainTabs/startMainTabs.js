import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

export default async function startTabs() {
  const mapIcon = await Icon.getImageSource('md-map', 30);
  const shareIcon = await Icon.getImageSource('ios-share-alt', 30);
  const menuIcon = await Icon.getImageSource('ios-menu', 30);
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'myapp.FindPlaceScreen',
        label: 'Find Place',
        title: 'Find Place',
        icon: mapIcon,
        navigatorButtons: {
          leftButtons: [
            {
              icon: menuIcon,
              title: 'Menu',
              id: 'sideDrawerToggle',
            },
          ],
        },
      },
      {
        screen: 'myapp.SharePlaceScreen',
        label: 'Share Place',
        title: 'Share Place',
        icon: shareIcon,
        navigatorButtons: {
          leftButtons: [
            {
              icon: menuIcon,
              title: 'Menu',
              id: 'sideDrawerToggle',
            },
          ],
        },
      },
    ],
    drawer: {
      left: {
        screen: 'myapp.SideDrawerScreen',
      },
    },
  });
}
