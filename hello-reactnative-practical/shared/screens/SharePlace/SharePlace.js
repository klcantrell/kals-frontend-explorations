import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Animated,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions';

import validate from '../../utility/validation';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange',
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.keyboardHeight = new Animated.Value(0);
    this.keyboardDidShowSubscription = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    );
    this.keyboardDidHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    );
  }

  state = {
    controls: {
      placeName: {
        value: '',
        valid: false,
        validationRules: {
          hasValue: true,
        },
        touched: false,
      },
    },
  };

  keyboardDidShow = event => {
    Animated.timing(this.keyboardHeight, {
      duration: 300,
      toValue: event.endCoordinates.height,
    }).start();
  };

  keyboardDidHide = event => {
    Animated.timing(this.keyboardHeight, {
      duration: 300,
      toValue: 0,
    }).start();
  };

  updateInputState = (key, val) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: val,
            valid: validate(val, prevState.controls[key].validationRules),
            touched: true,
          },
        },
      };
    });
  };

  handleSubmit = () => {
    const { controls } = this.state;
    if (controls.placeName.value === '') {
      return;
    }
    this.props.handleAddPlace(controls.placeName.value);
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: '',
          },
        },
      };
    });
  };

  onNavigatorEvent = event => {
    switch (event.type) {
      case 'NavBarButtonPress':
        if (event.id === 'sideDrawerToggle') {
          this.props.navigator.toggleDrawer({
            side: 'left',
          });
        }
        break;
      default:
        return null;
    }
  };

  render() {
    const { controls } = this.state;
    return (
      <ScrollView>
        <Animated.View
          style={[
            styles.container,
            {
              paddingBottom: this.keyboardHeight,
            },
          ]}
        >
          <MainText>
            <HeadingText>
              <Text>Share a place with us!</Text>
            </HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput
            placeData={controls.placeName}
            handleChangeText={val => this.updateInputState('placeName', val)}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Share the Place!"
              onPress={this.handleSubmit}
              disabled={!controls.placeName.valid}
            />
          </View>
        </Animated.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 200,
  },
  buttonContainer: {
    margin: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    handleAddPlace: placeName => dispatch(addPlace(placeName)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlaceScreen);
