import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';

import { deletePlace } from '../../store/actions';
import Icon from 'react-native-vector-icons/Ionicons';

class PlaceDetail extends Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.handleOrientationChange);
  }

  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
  };

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleOrientationChange);
  }

  handleOrientationChange = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape',
    });
  };

  handleDeletePlace = () => {
    const { selectedPlace, onItemDeleted, navigator } = this.props;
    onItemDeleted(selectedPlace.key);
    navigator.pop();
  };

  render() {
    const { viewMode } = this.state;
    const { selectedPlace } = this.props;
    return (
      <View
        style={
          viewMode === 'portrait'
            ? styles.portraitContainer
            : styles.landscapeContainer
        }
      >
        <View style={styles.contentContainer}>
          <Image source={selectedPlace.image} style={styles.placeImage} />
        </View>
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.placeName}>{selectedPlace.name}</Text>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={this.handleDeletePlace}
              style={styles.controlsItem}
            >
              <Icon
                size={30}
                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                color="red"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  portraitContainer: {
    margin: 22,
    flexDirection: 'column',
    flex: 1,
  },
  landscapeContainer: {
    margin: 22,
    flexDirection: 'row',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  placeImage: {
    width: '100%',
    height: 200,
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
  },
  controls: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlsItem: {
    marginHorizontal: 20,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onItemDeleted: placeKey => dispatch(deletePlace(placeKey)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PlaceDetail);
