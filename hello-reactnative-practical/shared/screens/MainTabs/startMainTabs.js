import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

export default async function startTabs() {
  const mapIcon = await Icon.getImageSource('md-map', 30);
  const shareIcon = await Icon.getImageSource('ios-share-alt', 30);
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'myapp.SharePlaceScreen',
        label: 'Share Place',
        title: 'Share Place',
        icon: mapIcon,
      },
      {
        screen: 'myapp.FindPlaceScreen',
        label: 'Find Place',
        title: 'Find Place',
        icon: shareIcon,
      },
    ],
  });
}
