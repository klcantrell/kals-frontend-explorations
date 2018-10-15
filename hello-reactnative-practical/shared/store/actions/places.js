import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = placeName => {
  return {
    type: ADD_PLACE,
    payload: placeName,
  };
};

export const deletePlace = placeKey => {
  return {
    type: DELETE_PLACE,
    payload: placeKey,
  };
};
