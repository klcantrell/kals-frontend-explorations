import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import backgroundImage from '../../assets/background.jpg';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import DefaultButton from '../../components/UI/DefaultButton/DefaultButton';
import startMainTabs from '../MainTabs/startMainTabs';

export default class AuthScreen extends Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.handleOrientationChange);
  }

  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true,
        },
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6,
        },
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password',
        },
      },
    },
  };

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleOrientationChange);
  }

  handleOrientationChange = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape',
    });
  };

  handleLogin = () => {
    startMainTabs();
  };

  updateInputState = (key, value) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value,
          },
        },
      };
    });
  };

  render() {
    const { viewMode, controls } = this.state;
    const headingText = (
      <MainText>
        <HeadingText>Please Log In</HeadingText>
      </MainText>
    );
    return (
      <ImageBackground style={styles.backgroundImage} source={backgroundImage}>
        <View style={styles.container}>
          {viewMode === 'portrait' ? headingText : null}
          <DefaultButton color="#29aaf4">Switch to Login</DefaultButton>
          <View style={styles.inputContainer}>
            <DefaultInput
              style={styles.input}
              placeholder="Your E-mail Address"
              value={controls.email.value}
              onChangeText={val => this.updateInputState('email', val)}
            />
            <View
              style={
                viewMode === 'portrait'
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordContainer
              }
            >
              <DefaultInput
                style={[
                  styles.input,
                  viewMode === 'portrait'
                    ? styles.portraitPasswordInput
                    : styles.landscapePasswordInput,
                ]}
                placeholder="Password"
                value={controls.email.password}
                onChangeText={val => this.updateInputState('password', val)}
              />
              <DefaultInput
                style={[
                  styles.input,
                  viewMode === 'portrait'
                    ? styles.portraitPasswordInput
                    : styles.landscapePasswordInput,
                ]}
                placeholder="Confirm Password"
                value={controls.confirmPassword.value}
                onChangeText={val =>
                  this.updateInputState('confirmPassword', val)
                }
              />
            </View>
          </View>
          <DefaultButton color="#29aaf4" onPress={this.handleLogin}>
            Submit
          </DefaultButton>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
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
  portraitPasswordContainer: {
    flexDirection: 'column',
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  portraitPasswordInput: {
    width: '100%',
  },
  landscapePasswordInput: {
    width: '45%',
  },
});
