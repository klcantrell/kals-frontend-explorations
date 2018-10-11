import React, { Fragment } from 'react';
import { Modal, View, Image, Text, Button, StyleSheet } from 'react-native';

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
        <View>
          <Button title="Delete" color="red" onPress={onItemDeleted} />
          <Button title="Close" onPress={onModalClosed} />
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
});

export default PlaceDetail;
