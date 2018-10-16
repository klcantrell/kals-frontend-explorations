import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';

class SideDrawer extends Component {
  render() {
    const innerContent = (
      <View style={styles.drawerItem}>
        <Icon
          size={30}
          name={'ios-log-out'}
          color="#aaa"
          style={styles.drawerItemIcon}
        />
        <MainText>
          <Text>Sign out</Text>
        </MainText>
      </View>
    );
    let touchableWrapper;
    if (Platform.OS === 'android') {
      touchableWrapper = (
        <TouchableNativeFeedback>{innerContent}</TouchableNativeFeedback>
      );
    } else {
      touchableWrapper = <TouchableOpacity>{innerContent}</TouchableOpacity>;
    }
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get('window').width * 0.8 },
        ]}
      >
        {touchableWrapper}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    backgroundColor: 'white',
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee',
  },
  drawerItemIcon: {
    marginRight: 10,
  },
});

export default SideDrawer;
