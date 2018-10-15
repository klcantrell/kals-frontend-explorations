import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';

const initialState = {
  places: [],
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
      };
    default:
      return state;
  }
};

export default reducer;
