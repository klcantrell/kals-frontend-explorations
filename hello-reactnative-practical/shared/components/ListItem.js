import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const listItem = ({ placeName }) => (
  <View style={styles.listItem}>
    <Text>{placeName}</Text>
  </View>
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
