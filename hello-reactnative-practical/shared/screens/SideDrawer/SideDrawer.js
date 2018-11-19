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
import { connect } from 'react-redux';

import { authLogout } from '../../store/actions';

import Icon from 'react-native-vector-icons/Ionicons';

import MainText from '../../components/UI/MainText/MainText';

class SideDrawer extends Component {
  render() {
    const { handleLogout } = this.props;
    const innerContent = (
      <View style={styles.drawerItem}>
        <Icon
          size={30}
          name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
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
        <TouchableNativeFeedback onPress={handleLogout}>
          {innerContent}
        </TouchableNativeFeedback>
      );
    } else {
      touchableWrapper = (
        <TouchableOpacity onPress={handleLogout}>
          {innerContent}
        </TouchableOpacity>
      );
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

const mapDispatchToProps = dispatch => {
  return {
    handleLogout: () => {
      dispatch(authLogout());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SideDrawer);
