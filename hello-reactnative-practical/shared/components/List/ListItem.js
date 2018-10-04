import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const listItem = ({ placeName, handlePress }) => (
  <TouchableOpacity onPress={handlePress}>
    <View style={styles.listItem}>
      <Text>{placeName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 10,
    backgroundColor: '#eee',
    margin: 5,
  },
});

export default listItem;
