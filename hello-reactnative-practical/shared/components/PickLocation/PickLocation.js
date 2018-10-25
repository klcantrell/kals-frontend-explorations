import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

export default class PickLocation extends Component {
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

  handleMapPress = event => {
    const coords = event.nativeEvent.coordinate;
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
          region={focusedLocation}
          onPress={this.handleMapPress}
          style={styles.map}
        >
          {mapMarker}
        </MapView>
        <View style={styles.buttonContainer}>
          <Button title="Locate Me!" onPress={() => alert('pick a location')} />
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
