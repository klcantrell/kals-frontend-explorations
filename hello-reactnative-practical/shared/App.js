import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import kalalauValleyImage from './assets/kalalau-valley.jpg';

import Input from './components/Input/Input';
import List from './components/List/List';

export default class App extends Component {
  state = {
    places: [],
  };

  handleSubmitPlace = place => {
    this.setState(prevState => ({
      places: [
        ...prevState.places,
        {
          value: place,
          key: String(Math.random()),
          image: { uri: 'http://www.finalfantasykingdom.net/7/wonderback.png' },
        },
      ],
    }));
  };

  handlePlaceDeleted = key => {
    this.setState(prevState => ({
      places: prevState.places.filter(place => place.key !== key),
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
