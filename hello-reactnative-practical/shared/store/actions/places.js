import { DATABASE_URL, SAVEIMAGE_URL } from 'react-native-dotenv';

import { GET_PLACES, SET_PLACES } from './actionTypes';
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
        alert('Something went wrong, please try again!');
        dispatch(uiStopLoading());
      });
  };
};

export const getPlaces = () => {
  return dispatch => {
    fetch(`${DATABASE_URL}/places.json`)
      .then(res => res.json())
      .then(data => {
        const places = Object.keys(data).map(key => {
          return {
            ...data[key],
            key,
            image: {
              uri: data[key].image,
            },
          };
        });
        dispatch(setPlaces(places));
      })
      .catch(err => {
        alert('Something went wrong, please try again!');
        console.log(err);
      });
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    payload: places,
  };
};
