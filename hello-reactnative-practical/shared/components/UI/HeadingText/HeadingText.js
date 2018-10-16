import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeadingText = ({ children, style, ...restProps }) => {
  return (
    <Text style={[styles.textHeading, style]} {...restProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 20,
  },
});

export default HeadingText;
