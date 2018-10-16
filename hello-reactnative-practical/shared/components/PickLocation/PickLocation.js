import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

export default class PickLocation extends Component {
  render() {
    return (
      <>
        <View style={styles.placeholder}>
          <Text>Map</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Locate Me!" onPress={() => alert('pick a location')} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
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
});
