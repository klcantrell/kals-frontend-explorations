import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import { tryAuth, authAutoSignIn } from '../../store/actions';

import validate from '../../utility/validation';

import backgroundImage from '../../assets/background.jpg';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import DefaultButton from '../../components/UI/DefaultButton/DefaultButton';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.handleOrientationChange);
  }

  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    authMode: 'login',
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true,
        },
        touched: false,
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6,
        },
        touched: false,
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password',
        },
        touched: false,
      },
    },
  };

  componentDidMount() {
    this.props.handleTryAutoSignIn();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleOrientationChange);
  }

  handleSwitchAuthMode = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login',
      };
    });
  };

  handleOrientationChange = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape',
    });
  };

  handleAuth = () => {
    const { controls, authMode } = this.state;
    const { handleTryAuth } = this.props;
    const authData = {
      email: controls.email.value,
      password: controls.password.value,
    };
    handleTryAuth(authData, authMode);
  };

  updateInputState = (key, value) => {
    const { controls } = this.state;
    let connectedValue = {};
    if (controls[key].validationRules.equalTo) {
      const equalTo = controls[controls[key].validationRules.equalTo].value;
      connectedValue = {
        ...connectedValue,
        equalTo,
      };
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value,
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          ...Object.assign(
            {},
            {
              confirmPassword: {
                ...prevState.controls.confirmPassword,
                valid:
                  key === 'password'
                    ? validate(
                        prevState.controls.confirmPassword.value,
                        prevState.controls.confirmPassword.validationRules,
                        connectedValue
                      )
                    : prevState.controls.confirmPassword.valid,
              },
            },
            {
              [key]: {
                ...prevState.controls[key],
                value,
                valid: validate(
                  value,
                  prevState.controls[key].validationRules,
                  connectedValue
                ),
                touched: true,
              },
            }
          ),
        },
      };
    });
  };

  render() {
    const { viewMode, controls, authMode } = this.state;
    const { isLoading } = this.props;
    const button = isLoading ? (
      <ActivityIndicator />
    ) : (
      <DefaultButton
        color="#29aaf4"
        onPress={this.handleAuth}
        disabled={
          !controls.email.valid ||
          !controls.password.valid ||
          (!controls.confirmPassword.valid && authMode === 'signup')
        }
      >
        Submit
      </DefaultButton>
    );
    const headingText =
      viewMode === 'portrait' ? (
        <MainText>
          <HeadingText>
            Please {authMode === 'login' ? 'Log In' : 'Sign Up'}
          </HeadingText>
        </MainText>
      ) : null;
    const confirmPasswordContent =
      authMode === 'login' ? null : (
        <DefaultInput
          style={[
            styles.input,
            viewMode === 'portrait'
              ? styles.portraitPasswordInput
              : styles.landscapePasswordInput,
          ]}
          placeholder="Confirm Password"
          secureTextEntry
          value={controls.confirmPassword.value}
          onChangeText={val => this.updateInputState('confirmPassword', val)}
          valid={controls.confirmPassword.valid}
          touched={controls.confirmPassword.touched}
        />
      );
    return (
      <ImageBackground style={styles.backgroundImage} source={backgroundImage}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior="padding"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              {headingText}
              <DefaultButton
                onPress={this.handleSwitchAuthMode}
                color="#29aaf4"
              >
                Switch to {authMode === 'login' ? 'Sign Up' : 'Log In'}
              </DefaultButton>
              <View style={styles.inputContainer}>
                <DefaultInput
                  style={styles.input}
                  placeholder="Your E-mail Address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  value={controls.email.value}
                  onChangeText={val => this.updateInputState('email', val)}
                  valid={controls.email.valid}
                  touched={controls.email.touched}
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
                      viewMode === 'portrait' || authMode === 'login'
                        ? styles.portraitPasswordInput
                        : styles.landscapePasswordInput,
                    ]}
                    placeholder="Password"
                    secureTextEntry
                    value={controls.password.value}
                    onChangeText={val => this.updateInputState('password', val)}
                    valid={controls.password.valid}
                    touched={controls.password.touched}
                  />
                  {confirmPasswordContent}
                </View>
              </View>
              {button}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
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

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleTryAuth: (authData, authMode) =>
      dispatch(tryAuth(authData, authMode)),
    handleTryAutoSignIn: () => dispatch(authAutoSignIn()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
