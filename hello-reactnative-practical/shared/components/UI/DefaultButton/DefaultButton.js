import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';

const DefaultButton = ({ children, onPress, color, disabled }) => {
  const content = (
    <View
      style={[
        styles.button,
        { backgroundColor: color },
        disabled ? styles.disabled : null,
      ]}
    >
      <Text style={disabled ? styles.disabledText : null}>{children}</Text>
    </View>
  );
  if (disabled) {
    return content;
  }
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
  disabled: {
    backgroundColor: '#eee',
    borderColor: '#aaa',
  },
  disabledText: {
    color: '#aaa',
  },
});

export default DefaultButton;
