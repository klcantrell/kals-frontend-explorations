import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';

const DefaultButton = ({ children, onPress, color }) => {
  const content = (
    <View style={[styles.button, { backgroundColor: color }]}>
      <Text>{children}</Text>
    </View>
  );
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  } else {
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }
};

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
