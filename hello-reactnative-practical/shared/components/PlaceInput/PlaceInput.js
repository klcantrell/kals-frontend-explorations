import React, { Component } from 'react';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

export default class PlaceInput extends Component {
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
      <DefaultInput
        placeholder="An awesome place"
        value={this.state.inputText}
        onChangeText={this.handleChangeText}
      />
    );
  }
}
