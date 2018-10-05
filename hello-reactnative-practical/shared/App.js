import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Input from './components/Input/Input';
import List from './components/List/List';

export default class App extends Component {
  state = {
    places: [],
  };

  handleSubmitPlace = place => {
    this.setState(prevState => ({
      places: [...prevState.places, place],
    }));
  };

  handlePlaceDeleted = index => {
    this.setState(prevState => ({
      places: prevState.places.filter((place, i) => i !== index),
    }));
  };

  render() {
    const { places } = this.state;
    return (
      <View style={styles.container}>
        <Input onSubmit={this.handleSubmitPlace} />
        <List places={places} onItemDeleted={this.handlePlaceDeleted} />
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
});
