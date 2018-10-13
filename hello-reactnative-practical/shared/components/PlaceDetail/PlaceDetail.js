import React, { Fragment } from 'react';
import {
  Modal,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const PlaceDetail = ({ selectedPlace, onItemDeleted, onModalClosed }) => {
  let modalContent = null;
  if (selectedPlace) {
    modalContent = (
      <Fragment>
        <Image source={selectedPlace.image} style={styles.placeImage} />
        <Text style={styles.placeName}>{selectedPlace.name}</Text>
      </Fragment>
    );
  }
  return (
    <Modal
      visible={selectedPlace !== null}
      animationType="slide"
      onRequestClose={onModalClosed}
    >
      <View styles={styles.modal}>
        {modalContent}
        <View style={styles.controls}>
          <Button
            title="Close"
            onPress={onModalClosed}
            style={styles.controlsItem}
          />
          <TouchableOpacity onPress={onItemDeleted} style={styles.controlsItem}>
            <Icon size={30} name="ios-trash" color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
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

export default PlaceDetail;
