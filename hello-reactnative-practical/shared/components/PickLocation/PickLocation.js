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
  };

  render() {
    const { focusedLocation } = this.state;
    return (
      <>
        <MapView initialRegion={focusedLocation} style={styles.map} />
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
