import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const defaultInput = ({ style, ...restProps }) => {
  return <TextInput style={[styles.input, style]} {...restProps} />;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
  },
});

export default defaultInput;
