import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';

import List from '../../components/List/List';

import { getPlaces } from '../../store/actions';

class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange',
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentDidMount() {
    this.props.handleLoadPlaces();
  }

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    fadeInAnim: new Animated.Value(0),
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

  handlePlaceSelected = key => {
    const selPlace = this.props.places.find(place => place.key === key);
    this.props.navigator.push({
      screen: 'myapp.PlaceDetailScreen',
      title: selPlace.name,
      passProps: {
        selectedPlace: selPlace,
      },
    });
  };

  handlePlacesSearch = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        placesLoaded: true,
      });
      this.handlePlacesLoaded();
    });
  };

  handlePlacesLoaded = () => {
    Animated.timing(this.state.fadeInAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { placesLoaded, removeAnim, fadeInAnim } = this.state;
    const { places } = this.props;
    let content = placesLoaded ? (
      <Animated.View
        style={{
          opacity: fadeInAnim,
        }}
      >
        <List places={places} onPlaceSelected={this.handlePlaceSelected} />
      </Animated.View>
    ) : (
      <Animated.View
        style={{
          opacity: removeAnim,
          transform: [
            {
              scale: removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1],
              }),
            },
          ],
        }}
      >
        <TouchableWithoutFeedback onPress={this.handlePlacesSearch}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
    return (
      <View style={placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20,
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26,
  },
});

const mapStateToProps = state => {
  return {
    places: state.places.places,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLoadPlaces: () => dispatch(getPlaces()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindPlaceScreen);
