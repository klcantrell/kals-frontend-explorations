import React from 'react';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

const PlaceInput = ({ placeData, ...rest }) => {
  return (
    <DefaultInput
      placeholder="An awesome place"
      value={placeData.value}
      valid={placeData.valid}
      touched={placeData.touched}
      {...rest}
    />
  );
};

export default PlaceInput;
