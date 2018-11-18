import { API_KEY } from 'react-native-dotenv';
import { AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';

import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
    if (authMode === 'signup') {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        dispatch(uiStopLoading());
        if (!data.idToken) {
          alert('Something went wrong, please try again');
        } else {
          dispatch(authSetToken(data.idToken));
          startMainTabs();
        }
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong, please try again');
        dispatch(uiStopLoading());
      });
  };
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    payload: token,
  };
};
