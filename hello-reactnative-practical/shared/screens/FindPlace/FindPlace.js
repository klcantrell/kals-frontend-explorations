import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import List from '../../components/List/List';

class FindPlaceScreen extends Component {
  handlePlaceSelected = key => {
    const selPlace = this.props.places.find(place => place.key === key);
    this.props.navigator.push({
      screen: 'myapp.PlaceDetail',
      title: selPlace.name,
      passProps: {
        selectedPlace: selPlace,
      },
    });
  };

  render() {
    return (
      <View>
        <List
          places={this.props.places}
          onPlaceSelected={this.handlePlaceSelected}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places,
  };
};

export default connect(mapStateToProps)(FindPlaceScreen);
