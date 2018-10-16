import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';

import imagePlaceholder from '../../assets/kalalau-valley.jpg';

export default class PickImage extends Component {
  render() {
    return (
      <>
        <View style={styles.placeholder}>
          <Image source={imagePlaceholder} style={styles.previewImage} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Pick Image" onPress={() => alert('pick an image')} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 200,
  },
  buttonContainer: {
    margin: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});
