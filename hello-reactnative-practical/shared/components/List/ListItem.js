import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const listItem = ({ placeImage, placeName, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.listItem}>
        <Image source={placeImage} style={styles.placeImage} />
        <Text>{placeName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 10,
    backgroundColor: '#eee',
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeImage: {
    marginRight: 8,
    height: 30,
    width: 30,
  },
});

export default listItem;
