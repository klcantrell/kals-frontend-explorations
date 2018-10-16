import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground } from 'react-native';

import backgroundImage from '../../assets/background.jpg';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import startMainTabs from '../MainTabs/startMainTabs';

export default class AuthScreen extends Component {
  handleLogin = () => {
    startMainTabs();
  };

  render() {
    return (
      <ImageBackground style={styles.backgroundImage} source={backgroundImage}>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Please Log In</HeadingText>
          </MainText>
          <Button title="Switch to Login" />
          <View style={styles.inputContainer}>
            <DefaultInput
              style={styles.input}
              placeholder="Your E-mail Address"
            />
            <DefaultInput style={styles.input} placeholder="Password" />
            <DefaultInput style={styles.input} placeholder="Confirm Password" />
          </View>
          <Button title="Login" onPress={this.handleLogin} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -40 }],
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#eee',
  },
  backgroundImage: {
    flex: 1,
  },
});
