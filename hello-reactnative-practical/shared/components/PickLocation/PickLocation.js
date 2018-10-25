import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

export default class PickLocation extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }
  state = {
    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get('window').width / Dimensions.get('window').height) *
        0.0122,
    },
    locationChosen: false,
  };

  handlePickLocation = event => {
    const { focusedLocation } = this.state;
    const coords = event.nativeEvent.coordinate;
    this.map.current.animateToRegion({
      ...focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        locationChosen: true,
      };
    });
  };

  handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          },
        };
        this.handlePickLocation(coordsEvent);
      },
      err => {
        alert('Fetching the position failed, please pick one manually.');
      }
    );
  };

  render() {
    let mapMarker = null;
    const { focusedLocation, locationChosen } = this.state;
    if (locationChosen) {
      mapMarker = <MapView.Marker coordinate={focusedLocation} />;
    }
    return (
      <>
        <MapView
          initialRegion={focusedLocation}
          onPress={this.handlePickLocation}
          style={styles.map}
          ref={this.map}
        >
          {mapMarker}
        </MapView>
        <View style={styles.buttonContainer}>
          <Button title="Locate Me!" onPress={this.handleGetLocation} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 250,
  },
  buttonContainer: {
    margin: 8,
  },
});
