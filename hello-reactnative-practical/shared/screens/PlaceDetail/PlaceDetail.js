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
import MapView from 'react-native-maps';

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
      <View style={styles.container}>
        <View
          style={
            viewMode === 'portrait'
              ? styles.contentContainerPortrait
              : styles.contentContainerLandscape
          }
        >
          <Image
            source={selectedPlace.image}
            style={
              viewMode === 'portrait'
                ? styles.placeImagePortrait
                : styles.placeImageLandscape
            }
          />
          <MapView
            initialRegion={{
              ...selectedPlace.location,
              latitudeDelta: 0.0122,
              longitudeDelta:
                (Dimensions.get('window').width /
                  Dimensions.get('window').height) *
                0.0122,
            }}
            style={
              viewMode === 'portrait' ? styles.mapPortrait : styles.mapLandscape
            }
          >
            <MapView.Marker coordinate={selectedPlace.location} />
          </MapView>
        </View>
        <View
          style={
            viewMode === 'portrait'
              ? styles.controlsContainerPortrait
              : styles.controlsContainerLandscape
          }
        >
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
  container: {
    margin: 22,
    flexDirection: 'column',
    flex: 1,
  },
  mapPortrait: {
    width: '100%',
    height: 200,
  },
  placeImagePortrait: {
    width: '100%',
    height: 200,
  },
  mapLandscape: {
    width: '50%',
    height: 175,
  },
  placeImageLandscape: {
    width: '50%',
    height: 175,
  },
  contentContainerPortrait: {
    flex: 1,
  },
  contentContainerLandscape: {
    flexDirection: 'row',
    flex: 1,
  },
  controlsContainerPortrait: {
    flexDirection: 'column',
  },
  controlsContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
