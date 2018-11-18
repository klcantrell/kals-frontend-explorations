import { AUTH_SET_TOKEN } from '../actions/actionTypes';

const initialState = {
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
