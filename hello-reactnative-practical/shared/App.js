import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

import ListItem from './components/ListItem';

export default class App extends Component {
  state = {
    placeName: '',
    places: [],
  };

  handlePlaceNameChange = e => {
    this.setState({
      placeName: e,
    });
  };

  onSubmitPlace = () => {
    if (this.state.placeName.trim() === '') {
      return;
    }
    this.setState(prevState => ({
      places: [...prevState.places, prevState.placeName],
      placeName: '',
    }));
  };

  render() {
    const placesOutput = this.state.places.map((place, i) => (
      <ListItem key={`${i}-${place}`} placeName={place} />
    ));
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.placeInput}
            placeholder="An awesome place"
            value={this.state.placeName}
            onChangeText={this.handlePlaceNameChange}
          />
          <Button
            style={styles.placeButton}
            title="Add"
            onPress={this.onSubmitPlace}
          />
        </View>
        <View style={styles.listContainer}>{placesOutput}</View>
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
  listContainer: {
    width: '100%',
  },
  placeInput: {
    width: '70%',
  },
  placeButton: {
    width: '30%',
  },
});
