import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import {
  addPlace,
  deletePlace,
  selectPlace,
  deselectPlace,
} from './store/actions';
import Input from './components/Input/Input';
import List from './components/List/List';
import PlaceDetail from './components/PlaceDetail/PlaceDetail';

class App extends Component {
  handleSubmitPlace = place => {
    this.props.handleAddPlace(place);
    console.log(`Place added: ${place}`);
  };

  handlePlaceSelected = key => {
    this.props.handleSelectPlace(key);
  };

  handleItemDeleted = () => {
    this.props.handleDeletePlace();
  };

  handleModalClosed = () => {
    this.props.handleDeselectPlace();
  };

  render() {
    const { places, selectedPlace } = this.props;
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

const mapStateToProps = ({ places: { places, selectedPlace } }) => {
  return {
    places,
    selectedPlace,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleAddPlace: name => dispatch(addPlace(name)),
    handleDeletePlace: () => dispatch(deletePlace()),
    handleSelectPlace: key => dispatch(selectPlace(key)),
    handleDeselectPlace: () => dispatch(deselectPlace()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
