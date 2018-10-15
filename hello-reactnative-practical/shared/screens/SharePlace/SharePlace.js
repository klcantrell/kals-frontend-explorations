import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions';
import Input from '../../components/Input/Input';

class SharePlaceScreen extends Component {
  handleAddPlace = placeName => {
    this.props.handleAddPlace(placeName);
  };

  render() {
    return (
      <View>
        <Input onSubmit={this.handleAddPlace} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddPlace: placeName => dispatch(addPlace(placeName)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlaceScreen);
