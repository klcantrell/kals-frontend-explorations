import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';

export default class AuthScreen extends Component {
  handleLogin = () => {
    startMainTabs();
  };

  render() {
    return (
      <View>
        <Text>Auth Screen</Text>
        <Button title="Login" onPress={this.handleLogin} />
      </View>
    );
  }
}
