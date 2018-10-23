import React from 'react';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

const PlaceInput = ({ placeData, handleChangeText }) => {
  return (
    <DefaultInput
      placeholder="An awesome place"
      value={placeData.value}
      valid={placeData.valid}
      touched={placeData.touched}
      onChangeText={handleChangeText}
    />
  );
};

export default PlaceInput;
