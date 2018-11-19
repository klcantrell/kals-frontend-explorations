import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class PickImage extends Component {
  state = {
    pickedImage: null,
  };

  handlePickImage = () => {
    const { onImagePicked } = this.props;
    ImagePicker.showImagePicker(
      {
        title: 'Pick an Image',
        maxWidth: 800,
        maxHeight: 600,
      },
      res => {
        switch (true) {
          case res.didCancel:
            console.log('User canceled');
            break;
          case res.error:
            console.log('Error', res.error);
            break;
          default:
            this.setState({
              pickedImage: {
                uri: res.uri,
              },
            });
            onImagePicked({ uri: res.uri, base64: res.data });
        }
      }
    );
  };

  render() {
    const { pickedImage } = this.state;
    return (
      <>
        <View style={styles.placeholder}>
          <Image source={pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Pick Image" onPress={this.handlePickImage} />
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
