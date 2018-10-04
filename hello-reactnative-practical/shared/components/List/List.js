import React from 'react';
import { View, StyleSheet } from 'react-native';

import ListItem from './ListItem';

const List = ({ places }) => {
  const placesOutput = places.map((place, i) => (
    <ListItem
      key={`${i}-${place}`}
      placeName={place}
      handlePress={() => alert(`Hi list ${i}`)}
    />
  ));
  return <View style={styles.list}>{placesOutput}</View>;
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
});

export default List;
