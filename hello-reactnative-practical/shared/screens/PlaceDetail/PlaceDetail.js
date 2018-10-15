import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { deletePlace } from '../../store/actions';
import Icon from 'react-native-vector-icons/Ionicons';

const PlaceDetail = ({
  selectedPlace,
  onItemDeleted,
  onModalClosed,
  navigator,
}) => {
  const handleDeletePlace = () => {
    onItemDeleted(selectedPlace.key);
    navigator.pop();
  };

  return (
    <View styles={styles.container}>
      <View>
        <Image source={selectedPlace.image} style={styles.placeImage} />
        <Text style={styles.placeName}>{selectedPlace.name}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={handleDeletePlace}
          style={styles.controlsItem}
        >
          <Icon size={30} name="ios-trash" color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 22,
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
    marginTop: 40,
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
