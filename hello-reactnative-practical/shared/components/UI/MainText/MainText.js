import React from 'react';
import { Text, StyleSheet } from 'react-native';

const MainText = ({ children }) => {
  return <Text style={styles.mainText}>{children}</Text>;
};

const styles = StyleSheet.create({
  mainText: {
    color: 'black',
  },
});

export default MainText;
