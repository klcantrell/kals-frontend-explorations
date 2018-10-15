import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions';
import Input from '../../components/Input/Input';

class SharePlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    switch (event.type) {
      case 'NavBarButtonPress':
        if (event.id === 'sideDrawerToggle') {
          this.props.navigator.toggleDrawer({
            side: 'left',
          });
        }
        break;
      default:
        return null;
    }
  };

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
