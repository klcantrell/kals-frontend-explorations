import React from 'react';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

const PlaceInput = ({ placeName, handleChangeText }) => {
  return (
    <DefaultInput
      placeholder="An awesome place"
      value={placeName}
      onChangeText={handleChangeText}
    />
  );
};

export default PlaceInput;
