import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Animated,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import { addPlace, startAddPlace } from '../../store/actions';

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
    this.scrollView = React.createRef();
    this.imagePicker = React.createRef();
    this.locationPicker = React.createRef();
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
        touchedWithoutValidation: false,
      },
      location: {
        value: null,
        valid: false,
      },
      image: {
        value: null,
        valid: false,
      },
    },
  };

  componentDidUpdate() {
    const { placeAdded, navigator } = this.props;
    if (placeAdded) {
      navigator.switchToTab({ tabIndex: 0 });
    }
  }

  keyboardDidShow = event => {
    const { controls } = this.state;
    Animated.timing(this.keyboardHeight, {
      duration: 300,
      toValue: event.endCoordinates.height,
    }).start(() => {
      controls.placeName.touchedWithoutValidation &&
        this.scrollView.current.scrollToEnd();
    });
  };

  keyboardDidHide = event => {
    Animated.timing(this.keyboardHeight, {
      duration: 300,
      toValue: 0,
    }).start();
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
      case 'ScreenChangedEvent':
        if (event.id === 'willAppear') {
          this.props.handleStartAddPlace();
        }
        break;
      default:
        return null;
    }
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

  handleInputFocus = () => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            touchedWithoutValidation: true,
          },
        },
      };
    });
  };

  handleSubmit = () => {
    const { controls } = this.state;
    this.props.handleAddPlace(
      controls.placeName.value,
      controls.location.value,
      controls.image.value
    );
    this.reset();
  };

  handleLocationPicked = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true,
          },
        },
      };
    });
  };

  handleImagePicked = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true,
          },
        },
      };
    });
  };

  reset = () => {
    this.setState({
      controls: {
        placeName: {
          value: '',
          valid: false,
          validationRules: {
            hasValue: true,
          },
          touched: false,
          touchedWithoutValidation: false,
        },
        location: {
          value: null,
          valid: false,
        },
        image: {
          value: null,
          valid: false,
        },
      },
    });
    this.imagePicker.current.reset();
    this.locationPicker.current.reset();
  };

  render() {
    const { controls } = this.state;
    const { isLoading } = this.props;
    let submitButton;
    if (isLoading) {
      submitButton = <ActivityIndicator />;
    } else {
      submitButton = (
        <Button
          title="Share the Place!"
          onPress={this.handleSubmit}
          disabled={
            !controls.placeName.valid ||
            !controls.location.valid ||
            !controls.image.valid
          }
        />
      );
    }
    return (
      <ScrollView ref={this.scrollView}>
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
          <PickImage
            onImagePicked={this.handleImagePicked}
            ref={this.imagePicker}
          />
          <PickLocation
            onLocationPicked={this.handleLocationPicked}
            ref={this.locationPicker}
          />
          <PlaceInput
            placeData={controls.placeName}
            onFocus={this.handleInputFocus}
            handleChangeText={val => this.updateInputState('placeName', val)}
          />
          <View style={styles.buttonContainer}>{submitButton}</View>
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

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    placeAdded: state.places.placeAdded,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleAddPlace: (placeName, location, image) =>
      dispatch(addPlace(placeName, location, image)),
    handleStartAddPlace: () => {
      dispatch(startAddPlace());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharePlaceScreen);
