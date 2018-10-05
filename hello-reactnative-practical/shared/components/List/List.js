import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import ListItem from './ListItem';

const List = ({ places, onItemDeleted }) => {
  const placesOutput = places.map((place, i) => (
    <ListItem
      key={`${i}-${place}`}
      placeName={place}
      handlePress={() => onItemDeleted(i)}
    />
  ));
  return <ScrollView style={styles.list}>{placesOutput}</ScrollView>;
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
});

export default List;
