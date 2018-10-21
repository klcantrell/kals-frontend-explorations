import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const defaultInput = ({ style, valid, touched, ...restProps }) => {
  return (
    <TextInput
      style={[styles.input, style, !valid && touched ? styles.invalid : null]}
      {...restProps}
    />
  );
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
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: 'red',
  },
});

export default defaultInput;
