import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Input from './components/Input/Input';
import List from './components/List/List';
import PlaceDetail from './components/PlaceDetail/PlaceDetail';

export default class App extends Component {
  state = {
    places: [],
    selectedPlace: null,
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

  handlePlaceSelected = key => {
    this.setState(prevState => ({
      selectedPlace: prevState.places.find(place => {
        return place.key === key;
      }),
    }));
  };

  handleItemDeleted = () => {
    this.setState(prevState => ({
      places: prevState.places.filter(place => {
        return place.key !== prevState.selectedPlace.key;
      }),
      selectedPlace: null,
    }));
  };

  handleModalClosed = () => {
    this.setState({
      selectedPlace: null,
    });
  };

  render() {
    const { places, selectedPlace } = this.state;
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={selectedPlace}
          onItemDeleted={this.handleItemDeleted}
          onModalClosed={this.handleModalClosed}
        />
        <Input onSubmit={this.handleSubmitPlace} />
        <List
          places={places}
          onPlaceSelected={this.handlePlaceSelected}
          onModalClosed={this.handleModalClosed}
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
});
