import {
  ADD_PLACE,
  DELETE_PLACE,
  SELECT_PLACE,
  DESELECT_PLACE,
} from '../actions/actionTypes';

const initialState = {
  places: [],
  selectedPlace: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: [
          ...state.places,
          {
            name: action.payload,
            key: String(Math.random()),
            image: {
              uri: 'http://www.finalfantasykingdom.net/7/wonderback.png',
            },
          },
        ],
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== state.selectedPlace.key;
        }),
        selectedPlace: null,
      };
    case SELECT_PLACE:
      return {
        ...state,
        selectedPlace: state.places.find(place => {
          return place.key === action.payload;
        }),
      };
    case DESELECT_PLACE:
      return {
        ...state,
        selectedPlace: null,
      };
    default:
      return state;
  }
};

export default reducer;
