import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const DefaultButton = ({ children, onPress, color }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.button, { backgroundColor: color }]}>
      <Text>{children}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default DefaultButton;
