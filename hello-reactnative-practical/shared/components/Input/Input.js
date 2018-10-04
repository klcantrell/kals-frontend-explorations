import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default class Input extends Component {
  state = {
    inputText: '',
  };

  handleChangeText = val => {
    this.setState({
      inputText: val,
    });
  };

  handleSubmit = () => {
    if (this.state.inputText === '') {
      return;
    }
    this.props.onSubmit(this.state.inputText);
    this.setState({
      inputText: '',
    });
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="An awesome place"
          value={this.state.inputText}
          onChangeText={this.handleChangeText}
        />
        <Button style={styles.button} title="Add" onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '70%',
  },
  button: {
    width: '30%',
  },
});
