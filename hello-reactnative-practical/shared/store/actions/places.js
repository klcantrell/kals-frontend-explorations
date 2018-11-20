import { DATABASE_URL, SAVEIMAGE_URL } from 'react-native-dotenv';

import {
  SET_PLACES,
  REMOVE_PLACE,
  START_ADD_PLACE,
  END_ADD_PLACE,
} from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import { authGetToken } from './auth';

export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE,
  };
};

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .then(token => {
        authToken = token;
        return fetch(SAVEIMAGE_URL, {
          method: 'POST',
          body: JSON.stringify({
            image: image.base64,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .catch(() => {
        alert('No valid token found');
      })
      .then(res => res.json())
      .then(data => {
        const placeData = {
          name: placeName,
          location,
          image: data.imageUrl,
        };
        return fetch(`${DATABASE_URL}/places.json?auth=${authToken}`, {
          method: 'POST',
          body: JSON.stringify(placeData),
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            dispatch(uiStopLoading());
            dispatch(endAddPlace());
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
    dispatch(authGetToken())
      .then(token => {
        return fetch(`${DATABASE_URL}/places.json?auth=${token}`);
      })
      .catch(() => {
        alert('No valid token found');
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
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
        } else {
          throw Error(data.error);
        }
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

export const deletePlace = placeKey => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        dispatch(removePlace(placeKey));
        return fetch(`${DATABASE_URL}/places/${placeKey}.json?auth=${token}`, {
          method: 'DELETE',
        });
      })
      .catch(() => {
        alert('No valid token found');
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        alert('Something went wrong!');
        console.log(err);
      });
  };
};

export const removePlace = placeKey => {
  return {
    type: REMOVE_PLACE,
    payload: placeKey,
  };
};

export const endAddPlace = () => {
  return {
    type: END_ADD_PLACE,
  };
};
