import {
  SET_PLACES,
  REMOVE_PLACE,
  START_ADD_PLACE,
  END_ADD_PLACE,
} from '../actions/actionTypes';

const initialState = {
  places: [],
  placeAdded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        ...state,
        places: action.payload,
      };
    case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.payload;
        }),
      };
    case START_ADD_PLACE:
      return {
        ...state,
        placeAdded: false,
      };
    case END_ADD_PLACE:
      return {
        ...state,
        placeAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
