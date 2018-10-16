import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';

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
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>
              <Text>Share a place with us!</Text>
            </HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput />
          <View style={styles.buttonContainer}>
            <Button
              title="Share the Place!"
              onPress={() => alert('you shared a place')}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
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

const mapDispatchToProps = dispatch => {
  return {
    handleAddPlace: placeName => dispatch(addPlace(placeName)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlaceScreen);
