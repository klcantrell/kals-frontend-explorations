import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import ListItem from './ListItem';

const List = ({ places, onItemDeleted }) => {
  const renderListItem = ({ item }) => (
    <ListItem
      placeName={item.value}
      handlePress={() => onItemDeleted(item.key)}
      placeImage={item.image}
    />
  );
  return (
    <FlatList data={places} style={styles.list} renderItem={renderListItem} />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
});

export default List;
