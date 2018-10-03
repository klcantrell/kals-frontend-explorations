import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

export default class App extends Component {
  state = {
    placeName: '',
  };

  handlePlaceNameChange = e => {
    this.setState({
      placeName: e,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.placeInput}
            placeholder="An awesome place"
            value={this.state.placeName}
            onChangeText={this.handlePlaceNameChange}
          />
          <Button style={styles.placeButton} title="Add" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  placeInput: {
    width: '70%',
  },
  placeButton: {
    width: '30%',
  },
});
