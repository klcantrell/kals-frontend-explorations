import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from '../actions/actionTypes';

const initialState = {
  token: null,
  tokenExpiryDate: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        tokenExpiryDate: action.payload.expiryDate,
      };
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        tokenExpiryDate: null,
      };
    default:
      return state;
  }
};

export default reducer;
