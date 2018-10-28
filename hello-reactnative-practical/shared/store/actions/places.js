import { DATABASE_URL, SAVEIMAGE_URL } from 'react-native-dotenv';

import { ADD_PLACE, DELETE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch(SAVEIMAGE_URL, {
      method: 'POST',
      body: JSON.stringify({
        image: image.base64,
      }),
    })
      .then(res => res.json())
      .then(data => {
        const placeData = {
          name: placeName,
          location,
          image: data.imageUrl,
        };
        return fetch(`${DATABASE_URL}/places.json`, {
          method: 'POST',
          body: JSON.stringify(placeData),
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            dispatch(uiStopLoading());
          });
      })
      .catch(err => {
        console.log(err);
        dispatch(uiStopLoading());
      });
    // return {
    //   type: ADD_PLACE,
    //   payload: { placeName, location, image },
    // };
  };
};

export const deletePlace = placeKey => {
  return {
    type: DELETE_PLACE,
    payload: placeKey,
  };
};
