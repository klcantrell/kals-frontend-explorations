import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

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
        <TextInput
          style={styles.input}
          placeholder="An awesome place"
          value={this.state.placeName}
          onChangeText={this.handlePlaceNameChange}
        />
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
  input: {
    width: 300,
  },
});
